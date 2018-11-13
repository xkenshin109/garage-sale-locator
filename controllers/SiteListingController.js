let _ = require('lodash');
const geodist = require('geodist');
const Promise = require('bluebird');
const MAX_MILES = 10;
let geoTools = require('geo-tools');
module.exports = function(app){
    let ret = [];
    ret.addAddress = function(req,res,next){
        geocode(req.body.address,function(data){
            let location = req.body;
            location.longitude = data.lng;
            location.latitude = data.lat;
            return app.models['SiteListing']
                .forge(location)
                .save()
                .then((site)=>{
                    site.newListing();
                    return res.status(200).json(site);
                });
        },{key:'AIzaSyADNttT4qWxwAnfYF_CdTJ9d66zAb248mY'});

    };
    ret.nearbySites = function(req,res,next){
        let currentLocation ={
            lon: req.body.longitude,
            lat: req.body.latitude
        };
        return app.models['ActiveQueue']
            .fetchAll({withRelated:'siteListing'})
            .then(function(values){
                return Promise.mapSeries(values.models,(site)=>{
                    let targetLocation ={
                        lon: site.related('siteListing').get('longitude'),
                        lat: site.related('siteListing').get('latitude')
                    };
                    let miles = geodist(currentLocation,targetLocation,{unit:'miles'});
                    if(miles < MAX_MILES){ //Filters here
                        return site.related('siteListing');
                    }else{
                        return null;
                    }

                })
                    .then((results)=>{
                        let data = {
                            success:true,
                            data: _.filter(results,r=>{return r!== null;}),
                            message:''
                        };
                        return res.status(200).json(data);
                    });
            })
            .catch((error)=>{
                return res.status(500).json(error.message);
            });
    };
    return ret;
};
