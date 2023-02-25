const fs = require('fs');
const path = require('path');

function copyFiles(srcDir, destDir, files) {
    for(var i = 0; i < files.length; i++) {
        var f = files[i];
        fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f))
    }
}

var source = require('path').resolve();
var files = fs.readdirSync(source);
files = files.filter(e => path.extname(e).toLowerCase() === '.proto')
var destination = path.join(process.env.INIT_CWD, "proto");
if (!fs.existsSync(destination)){
    fs.mkdirSync(destination);
}
copyFiles(source, destination, files)
