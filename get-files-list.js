var fs = require('fs');
var path = require('path');


const getModuleName = (filename) => {
    // const newFilename = filename.charAt(0).toUpperCase() + filename.slice(1)
    // мне кажется нужно либо отрезать цифры, либо делать умнее и идти в целевой файл и выдирать оттуда export class и брать имя класса
    return (filename.charAt(0).toUpperCase() + filename.slice(1)).replace(/-\w/g, function(m) {
        return m[1].toUpperCase();
    })
}
export const getTestTemplate = (filename, module) => {
    const moduleName = module || getModuleName(filename).replace('.jsx','')
    return `/*
* VTB Group. Do not reproduce without permission in writing.
* Copyright (c) 2019 VTB Group. All rights reserved.
*/
import * as React from 'react';
import { shallow } from 'enzyme';
import '_new/test-utils/main-test-mocks';
import { ${moduleName} } from './${filename}';
    
describe('${moduleName}', () => {
        it('render component correctly', () => {
            expect(shallow(<${moduleName}/>)).toMatchSnapshot();
        });
    });
`
}


