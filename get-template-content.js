var fs = require('fs');
var path = require('path');

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
    const importConnect = connected ? 'import { connect } from \'react-redux\';' : ''
    return `/*
* VTB Group. Do not reproduce without permission in writing.
* Copyright (c) 2019 VTB Group. All rights reserved.
*/
import * as React from 'react';
import { shallow } from 'enzyme';
${importConnect}
import { ${moduleName} } from './${filename}';
    
jest.mock('react-redux', () => ({
    connect: jest.fn(() => (cmp) => cmp),
}));

jest.mock('@vtb/services/i18n', () => {
    const translate = {
        translate: (str) => str,
    };
    translate.translate.ui = () => () => 'nf';
    return translate;
});
describe('${moduleName}', () => {
        it('render component correctly', () => {
            expect(shallow(<${moduleName}/>)).toMatchSnapshot();
        });
    });
`
}

module.exports = {
    getTestTemplate
}
