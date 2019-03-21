const fs = require('fs');
const path = require('path');
const {getTestTemplate} = require('./get-template-content')

const createFileFromTemplate = (filepath, fileContent) => {
    fs.writeFile(filepath, fileContent, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file  was created:  ", filepath);
    });
}
const checkFile = (filePath, fileName) => {
    const fullPath = `${filePath}/${fileName}`
    const testPath = fullPath.replace('.jsx','.test.jsx')
    fs.readFile(fullPath, function (err, data) {
        if (err) throw err;
        const withConnect = /import {\s?connect\s?} from 'react-redux'/.test(data.toString('utf8'))
        const moduleName =
          (data.toString('utf8').match(/export\s+(const)?\s?(class|function)\s+(\w+)/)
            || data.toString('utf8').match(/export\s+const\s+(\w+)/) )
        fs.access(testPath, fs.F_OK, (err) => {
            if (err) {
                let fileContent = getTestTemplate(fileName, withConnect, moduleName && moduleName[moduleName.length - 1 ])
                createFileFromTemplate(testPath,fileContent)
            }
            // if file is exist - do nothing
            return
        })
    })
}


module.exports = {
    checkFile
}
