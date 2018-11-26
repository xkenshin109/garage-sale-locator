let _ = require('lodash');
module.exports = function(app){
    let ret = [];
    ret.login = function(req,res,next){
        app.models['Account']
            .where({email:req.body.email,password:req.body.password})
            .fetch()
            .then((account)=>{
                return res.status(200).json({data:account.attributes});
            });

    };
    return ret;
};
