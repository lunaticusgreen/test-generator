const fs = require('fs');
const path = require('path');
const {walk} = require('./walker')
const {checkFile} = require('./check-and-create-file')



var regExcludes = [/(form-partials|page-partials)/];

process.argv.slice(2).forEach(function (val, index, array) {
    walk(val, regExcludes, function(err, results) {
        if (err) {
            throw err;
        }

        results.forEach( dir => {
            fs.readdir(dir, (err, files) => {
                var jsxShit = files.filter( file => /jsx$/.test(file)).filter( file => !/(\.test\.jsx|index)/.test(file))
                jsxShit.forEach(file => checkFile(dir,file))

            });
        })

    });
})
