module.exports = function(app){
    let endpoints = {
        'GET|/Hunts/':[
            app.controllers.Hunts.findAll,
            app.middleware.ResponseIdLookup
        ],
        'GET|/Hunts/:id':[
            app.controllers.Hunts.findOne,
            app.middleware.ResponseIdLookup
        ],
        'POST|/Hunts/Address':[
            app.controllers.Hunts.addAddress
        ],
        'POST|/Hunts/Favorite':[
            app.controllers.Hunts.toggleFavorite
        ],
        'POST|/Hunts/':[
            app.controllers.Hunts.addOne
        ],
        'PUT|/Hunts/:id':[
            app.controllers.Hunts.putOne
        ],
        'DELETE|/Hunts/:id':[
            app.controllers.Hunts.delete
        ]
    };
    return endpoints;
};
