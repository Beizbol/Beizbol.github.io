console.log("Hello postbuild from post.js");

const fse = require('fs-extra');
const path = require('path');

const srcDir = `dist`;
const destDir = path.join('..', 'docs');

// To copy a folder or file  
fse.copySync(srcDir, destDir, {
    overwrite: true
}, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("success!");
    }
});