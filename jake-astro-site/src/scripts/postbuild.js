console.log("> starting postbuild");

const fse = require('fs-extra');
const path = require('path');

const srcDir = 'dist';
const assetsDir = path.join(srcDir, 'assets');
const destDir = path.join('..', 'docs');


// delete assets folder to ensure new css
console.log("> deleting old assets");

fse.removeSync(assetsDir);

// copy dist to docs with replacement
console.log("> copying new build");

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

console.log("> postbuild complete");