var fs = require('fs');
var setup = require('./config');
const dir = __dirname;
const fileName = dir + "/../../public/app/microlite/config.php";
var datatowrite = "<?php\r\n" +
    "$email = '" + setup.setup().email + "';\r\n" +
    "$website = '" + setup.setup().website +"';\r\n";

fs.writeFile(fileName, datatowrite, (err) => {
    if (err){
        console.log("Cannot write config file", err);
        process.exit(1)
    } else {
        console.log("Updated Config!!");
        process.exit(0)
    }
});
