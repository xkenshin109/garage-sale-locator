"use strict";
let site = require('./core/Launcher');
return site.run()
    .then(()=>{
        console.log("==============================================================");
        console.log("        .   ,   ,                                /\\          ");
        console.log("          ` .'                                  /  \\  /\\     ");
        console.log("          \\  /      ________[_]________      /\\/    \\/  \\    ");
        console.log("           }{      /\\        ______    \\    /   /\\/\\  /\\/\\   ");
        console.log("          /  \\    //_\\       \\    /\\    \\  /\\/\\/    \\/    \\  ");
        console.log("   /\\    / /\\/\\  //___\\       \\__/  \\    \\/                  ");
        console.log("  /  \\  /\\/    \\//_____\\       \\ |[]|     \\                  ");
        console.log(" /\\/\\/\\/       //_______\\       \\|__|      \\                 ");
        console.log("/      \\      /XXXXXXXXXX\\                  \\                ");
        console.log("        \\    /_I_II  I__I_\\__________________\\               ");
        console.log("               I_I|  I__I_____[]_|_[]_____I                  ");
        console.log("               I_II  I__I_____[]_|_[]_____I                  ");
        console.log("               I II__I  I     XXXXXXX     I                  ");
        console.log("            ~~~~~'   '~~~~~~~~~~~~~~~~~~~~~~~~               ");
        console.log("==============================================================");
        if(site.app.config.port){
            console.log(`|      Application listening on PORT ${site.app.config.port}`);
        }
        console.log("==============================================================");
    });


