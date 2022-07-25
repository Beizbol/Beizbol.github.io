console.log("Hello prebuild from pre.js");

const fse = require('fs-extra');
const path = require('path');

const srcDir = `dist`;
const destDir = path.join('..', 'docs');

// Copy current full build before astro build 
fse.copySync(destDir, srcDir, {
    overwrite: true
}, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("success!");
    }
});