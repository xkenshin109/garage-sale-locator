module.exports = function(app){
    let endpoints = {
        'GET|/SiteListings/':[
            app.controllers.SiteListing.findAll,
            app.middleware.ResponseIdLookup
        ],
        'POST|/SiteListing/NearbySites':[
            app.controllers.SiteListing.nearbySites
        ],
        'GET|/SiteListing/:id':[
            app.controllers.SiteListing.findOne,
            app.middleware.ResponseIdLookup
        ],
        'POST|/SiteListing/Address':[
            app.controllers.SiteListing.addAddress
        ],

        'POST|/SiteListing/Favorite':[
            app.controllers.SiteListing.toggleFavorite
        ],
        'POST|/SiteListing/':[
            app.controllers.SiteListing.addOne
        ],
        'PUT|/SiteListing/:id':[
            app.controllers.SiteListing.putOne
        ],
        'DELETE|/SiteListing/:id':[
            app.controllers.SiteListing.delete
        ]

    };
    return endpoints;
};
