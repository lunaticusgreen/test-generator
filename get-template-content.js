var fs = require('fs');
var path = require('path');
var template = require('./template/template');

const getModuleName = (filename) => {
    // const newFilename = filename.charAt(0).toUpperCase() + filename.slice(1)
    // мне кажется нужно либо отрезать цифры, либо делать умнее и идти в целевой файл и выдирать оттуда export class и брать имя класса
    return (filename.charAt(0).toUpperCase() + filename.slice(1)).replace(/-\w/g, function(m) {
        return m[1].toUpperCase();
    })
}

const getTestTemplate = (filename, connected, module) => {
    console.log('module', module)
    const moduleName = module || getModuleName(filename).replace('.jsx','')
    return template({moduleName, filename, connected})
}

module.exports = {
    getTestTemplate
}
