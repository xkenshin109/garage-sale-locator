let _ = require('lodash');
let Promise = require('bluebird');

let LookupTablesService = function(app){
    let self = this;
    self.tables = ['Quality'];
    self.app = app;
};

LookupTablesService.prototype.namesToId = function(object, removeNames){
    let self = this;
    if(!object){
        return Promise.resolve();
    }
    let keys = _.keys(object).filter((o)=>{
       return self.tables.includes(o);
    });
    return Promise.mapSeries(keys,key=>{
       let modelName = key.charAt(0).toUpperCase() + key.slice(1);
       if(!self.app.models[modelName]){
           //This is if we can not find the Model we can modify the key
       }
       if(!self.app.models[modelName]){
           throw new Error(`${modelName}: fool me once shame on me. fool me twice and here you go`);
       }
       return self.app.models[modelName].where({'name':(object[key])}).fetch()
           .then(function(model){
               if(!model){
                   throw new Error(`'${object[key]} is not a valid type of ${modelName}`);
               }
               return object[key+'_id'] = model.get('id');
           });
    })
        .then(function(){
            return Promise.resolve(object);
        });
};

LookupTablesService.prototype.idToNames = function(object, removeIds){
    let self = this;
    if(!object){
        return Promise.resolve();
    }
    let workingObject = object.attributes || object;

    if(workingObject){
        let keys = _.keys(workingObject).filter((o,i)=>{
           if(o.slice(-3) === '_id'){
               let name = o.slice(0,-3);
               return self.tables.includes(name) && !_.has(workingObject, name);
           }
           return false;
        });
        return Promise.mapSeries(keys,key=>{
            let name = key.slice(0,-3);
            let modelName = name.charAt(0).toUpperCase() + name.slice(1);
            return self.app.models[modelName].where({'id': workingObject[key]})
                .fetch()
                .then(model=>{
                    if(!model){
                        throw new Error(`${workingObject[key]} is not a valid type of ${modelName}`);
                    }
                    if(model.get('name')){
                        workingObject[name] = model.get('name');
                    }
                    if(model.get('Name')){
                        workingObject[name] = model.get('Name');
                    }
                    return workingObject[name];
                })
        })
            .then(()=>{
            if(object.attributes){
                object.attributes = workingObject;
            }else{
                object = workingObject;
            }
            return Promise.resolve({
                success:true,
                data:object,
                message:''
            });
        })
            .catch((err)=>{
                throw new Error(err);
            });
    }
};

module.exports = function(app){return new LookupTablesService(app);};
