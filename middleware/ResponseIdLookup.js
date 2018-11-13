module.exports = function(app){
    return function(req,res){
        return app.services.LookupTables.idToNames(res.body,false)
            .then(function(newBody){
                if(!newBody){
                    res.body = null;
                }else{
                    res.body = newBody;
                }
                return res.json(res.body);
            })
            .catch(function(err){
                return res.status(500).json({error:err.message});
            });
    }
};
