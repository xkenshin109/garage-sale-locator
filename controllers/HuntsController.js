let _ = require('lodash');
const geodist = require('geodist');
const decode = require('node-geocoder');
const Promise = require('bluebird');
const MAX_MILES = 10;
let geoTools = require('geo-tools');
module.exports = function(app){
    let ret = [];
    ret.getFavorites = function(req,res,next){
        return app.models['FavoriteMapping']
            .where({Account_id: req.params.id})
            .fetchAll({withRelated:'hunt'})
            .then((favs)=>{
               return Promise.mapSeries(favs.models,fav=>{
                    let f = fav.related('hunt').attributes;
                    f.favorite = true;
                    return f;
               })
                   .then((f)=>{
                       return res.status(200).json({
                           success:true,
                           data: f,
                           message:''
                       })
                   });
            });

    };
    ret.getSiteListings = function(req,res,next){

        return app.models['Hunts']
            .where({active:1})
            .fetchAll({withRelated:['favorites']})
            .then((sites)=>{

               return Promise.mapSeries(sites.models, site=>{
                  return site.favorite(req.params.id)
                      .then((favorite)=>{
                          let s = site.attributes;
                          s.favorite = favorite;
                          return s;
                      })
                  })
                   .then((sites)=>{
                       return res.status(200).json({
                           success:true,
                           message:'',
                           data: sites
                       });
                   });;
            });
    };
    ret.myListings = function(req,res,next){
        return app.models["Hunts"]
            .where({Account_id:req.params.id})
            .fetchAll()
            .then((sites)=>{
                return Promise.mapSeries(sites.models,site=>{
                    let s = site.attributes;
                    return site.favorite(req.params.id)
                        .then((fav)=>{
                            s.favorite = fav;
                            return s;
                        })
                })
                    .then((sites)=>{
                        return res.status(200).json({
                            success:true,
                            data:sites,
                            message:''
                        });
                    });
            });
    };
    ret.toggleFavorite = function(req,res,next){
        return app.models['FavoriteMapping']
            .where({SiteListing_id: req.body.SiteListing_id,Account_id: req.body.Account_id})
            .fetchAll()
            .then(function(value){
                if(value.models.length > 0){
                    //We delete :)
                    return app.models['FavoriteMapping']
                        .where({SiteListing_id: req.body.SiteListing_id,Account_id: req.body.Account_id})
                        .destroy()
                        .then((value)=>{
                            return res.status(200).json({
                                success:true,
                                message:'',
                                data:{
                                    deleted:true
                                }
                            });
                        });
                }else{
                    //We add :)
                    return app.models['FavoriteMapping']
                        .forge({SiteListing_id: req.body.SiteListing_id,Account_id: req.body.Account_id})
                        .save()
                        .then(()=>{
                            return res.status(200).json({
                                success:true,
                                data: {
                                    deleted:false
                                },
                                message:''
                            });
                        });
                }
            })
    };
    ret.addAddress = function(req,res,next){
        geocode(req.body.address,function(data){
            let location = req.body;
            if(location.id === 0) delete location.id;
            location.longitude = data.lng;
            location.latitude = data.lat;
            return app.models['Hunts']
                .forge(location)
                .save()
                .then((site)=>{
                    return res.status(200).json(site.attributes);
                })
                .catch((err)=>{
                    console.log(err);
                    return res.status(400).json({success:false,message:err,data:{}});
                });
        },{key:'AIzaSyCmZRYHuT-013ghocxRfYZsSbVEfzxr3dg'});

    };
    ret.nearbySites = function(req,res,next){
        let currentLocation ={
            lon: req.body.longitude,
            lat: req.body.latitude
        };
        return res.status(200);
        // return app.models['ActiveQueue']
        //     .fetchAll({withRelated:'siteListing'})
        //     .then(function(values){
        //         return Promise.mapSeries(values.models,(site)=>{
        //             let targetLocation ={
        //                 lon: site.related('siteListing').get('longitude'),
        //                 lat: site.related('siteListing').get('latitude')
        //             };
        //             let miles = geodist(currentLocation,targetLocation,{unit:'miles'});
        //             if(miles < MAX_MILES){ //Filters here
        //                 return site.related('siteListing');
        //             }else{
        //                 return null;
        //             }
        //
        //         })
        //             .then((results)=>{
        //                 let data = {
        //                     success:true,
        //                     data: _.filter(results,r=>{return r!== null;}),
        //                     message:''
        //                 };
        //                 return res.status(200).json(data);
        //             });
        //     })
        //     .catch((error)=>{
        //         return res.status(500).json(error.message);
        //     });
    };
    return ret;
};
