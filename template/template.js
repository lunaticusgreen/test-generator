/**
 * Created by danilpankrashin on 2019-03-20.
 */
module.exports = ({moduleName,filename, connected}) => `
import * as React from 'react';
import { shallow } from 'enzyme';
import '_new/test-utils/mock-translate';
import '_new/test-utils/mock-ui-kit-elements-fields'; ${connected ? "import { last } from 'lodash'; import { connect } from 'react-redux'; " : ''} import { ${moduleName} } from './${filename.replace(".jsx", "")}';
    
${connected ? "jest.mock('react-redux', () => ({ connect: jest.fn(() => (cmp) => cmp) })); const propsWithValueSelector = { valueSelector: (_, key) => key };" : ''}

describe('${moduleName}', () => {

    ${connected ? "it('connect return correct props', () => { const mapStateToProps = last(connect.mock.calls)[0]; const props = mapStateToProps({}, propsWithValueSelector); expect(props).toMatchSnapshot(); });" : ""}
    
    it('render component correctly', () => {
        expect(shallow(<${moduleName}/>)).toMatchSnapshot();
    });
});
`