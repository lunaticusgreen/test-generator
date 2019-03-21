const fs = require('fs');
const path = require('path');
const {walk} = require('./walker')
const {checkFile} = require('./check-and-create-file')


process.argv.slice(2).forEach(function (val, index, array) {
    walk(val, function(err, results) {
        if (err) {
            throw err;
        }

        results.forEach( file => {
            let fullPath = file.split('/')
            let fileName = fullPath.splice(fullPath.length - 1)[0]
            let dir = fullPath.join('/')
            if (!/(\.test\.jsx|index)/.test(file)) {
                checkFile(dir, fileName)
            }
            // fs.readdir(dir, (err, files) => {
            //     console.log(dir,files);
            //     var jsxShit = files.filter( file => /jsx$/.test(file)).filter( file => !/(\.test\.jsx|index)/.test(file))
            //     jsxShit.forEach(file => checkFile(dir,file))
            //
            // });
        })

    });
})
