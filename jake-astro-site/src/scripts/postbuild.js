console.log("> starting postbuild");

import * as path from "path";
import fs from "fs-extra";

const srcDir = 'dist';
const destDir = path.join('..', 'docs');
const assetsDir = path.join(destDir, 'assets');


// delete assets folder to ensure new css
console.log("> deleting old assets");

fs.removeSync(assetsDir);

// copy dist to docs with replacement
console.log("> copying new build");

// Copy back updated build to output folder
fs.copySync(srcDir, destDir, {
    overwrite: true
}, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("success!");
    }
});

console.log("> postbuild complete");