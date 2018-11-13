let glob = require('glob');
let path = require('path');

module.exports = function(app){
    let ret = {};
    glob.sync('./services/**/*.js').forEach(function(file){
        let name = path.basename(file,'.js');
        ret[name] = require(path.resolve(file))(app);
    });
    return ret;
};
