module.exports = function(app){
    let endpoints = {
        'GET|/Accounts/':[
            app.controllers.Account.findAll,
            app.middleware.ResponseIdLookup
        ],
        'POST|/Account/Login':[
            app.controllers.Account.login
        ],
        'GET|/Account/:id/Favorites':[
           app.controllers.SiteListing.getFavorites
        ],
        'GET|/Account/:id/SiteListings':[
            app.controllers.SiteListing.getSiteListings
        ],
        'GET|/Account/:id':[
            app.controllers.Account.findOne,
            app.middleware.ResponseIdLookup
        ],
        'POST|/Account/':[
            app.controllers.Account.addOne
        ],
        'PUT|/Account/:id':[
            app.controllers.Account.putOne
        ],
        'DELETE|/Account/:id':[
            app.controllers.Account.delete
        ],
        'POST|/RegisterAccount':[
            app.controllers.Account.register
        ]
    };
    return endpoints;
};
