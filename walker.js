var fs = require('fs');
var path = require('path');

var walk = function (dir, done) {
    var results = [];

    fs.readdir(dir, function (err, list) {
        if (err) return done(err);

        var pending = list.length;
        if (!pending) return done(null, results);

        list.forEach(function (file) {
            file = path.join(dir, file);

            var excluded = false;
            var i = 0;

            if (file.match(/\.jsx$/)) {
                // if (file.match(/\.jsx/)) {
                //     console.log('----',file)
                    results.push(file)
                    excluded = true;
                // }
            }

            // Add if not in regExcludes
            if(excluded === false) {

                // Check if its a folder
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        // if (file.match(/(form-partials|page-partials)/)) {
                        //     console.log(file)
                        // }
                        // If it is, walk again
                        walk(file, function (err, res) {
                            results = results.concat(res);

                            if (!--pending) { done(null, results); }

                        });
                    } else {
                        if (!--pending) { done(null, results); }
                    }
                });
            } else {
                if (!--pending) { done(null, results); }
            }
        });
    });
};

module.exports.walk = walk
