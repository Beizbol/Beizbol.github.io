console.log("Hello postbuild from post.js");

const fse = require('fs-extra');
const path = require('path');

const srcDir = `dist`;
const destDir = path.join('..', 'docs');

// Copy back updated build to output folder
fse.copySync(srcDir, destDir, {
    overwrite: true
}, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("success!");
    }
});