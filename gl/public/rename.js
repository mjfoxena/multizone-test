const { readdirSync, rename } = require('fs');
const { resolve } = require('path');

// Get path to image directory
const imageDirPath = resolve(__dirname, './images/config/turntable/1');

// Get an array of the files inside the folder
const files = readdirSync(imageDirPath);

// Loop through each file that was retrieved
files.forEach(file => {
    
    const device = file.split(' ')[0]
    const num = file.split('.')[2]
    rename(
        imageDirPath + `/${file}`,
        imageDirPath + `/${device.toLowerCase()}_a2s_${num}.jpg`,
        err => console.log(err)
      )
});
