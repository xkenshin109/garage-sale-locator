module.exports = function(app){
    let endpoints = {
        'GET|/Accounts/':[
            app.controllers.Account.findAll,
            app.middleware.ResponseIdLookup
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
        ]
    };
    return endpoints;
};
