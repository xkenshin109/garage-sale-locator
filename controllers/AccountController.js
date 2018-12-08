let _ = require('lodash');
module.exports = function(app){
    let ret = [];
    ret.login = function(req,res,next){
        app.models['Account']
            .where({email:req.body.email,password:req.body.password})
            .fetch()
            .then((account)=>{
                return res.status(200).json({result:true,message:"",data:
                    {
                        loggedIn: true,
                        account_id: account.get("id")
                    }
                });
            });

    };
    ret.register = function(req,res,next){
        app.models['Account']
            .where({email:req.body.email})
            .fetch()
            .then((account)=>{
                if(!account){
                    return app.models['Account']
                        .forge(req.body)
                        .save()
                        .then((acct)=>{
                            return res.status(200).json({
                                data:acct.attributes,
                                message:'Account has been created',
                                success:true
                            });
                        });
                }
                throw new Error('An account already exists.')
                })

            .catch((err)=>{
                return res.status(400).json({
                    data:{},
                    message:err.message,
                    success:false
                })
            });
    };
    return ret;
};
