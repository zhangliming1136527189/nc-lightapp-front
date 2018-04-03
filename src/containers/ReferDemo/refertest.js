import Refer from '../Refer';

define(function(require, exports, module){
    module.exports = {
      refercreate : function(refcode, config = {}) {
        switch (refcode) {
            case 'cont':
                return (
                    <Refer
                        refName={'交易类型'}
                        refCode={'cont'}
                        queryGridUrl={'/nccloud/reva/ref/cont.do'}
                        {...config}
                    />
                );
                break;
            case 'dept':
                return (
                    <Refer
                        refName={'部门'}
                        refCode={'dept'}
                        refType={'tree'}
                        queryTreeUrl={'/nccloud/reva/ref/dept.do'}
                        {...config}
                    />
                );
                break;
            case 'finance':
                return (
                    <Refer
                        refName={'财务组织'}
                        refCode={'finance'}
                        refType={'tree'}
                        queryTreeUrl={'/nccloud/reva/ref/finance.do'}
                        {...config}
                    />
                );
                break;
            case 'materialclass':
                return (
                    <Refer
                        refName={'物料分类'}
                        refCode={'materialclass'}
                        // refType={'tree'}
                        queryGridUrl={'/nccloud/reva/ref/materialclass.do'}
                        {...config}
                    />
                );
                break;
            case 'material':
                return (
                    <Refer
                        refName={'物料'}
                        refCode={'material'}
                        refType={'gridTree'}
                        isMultiSelectedEnabled={true}
                        queryGridUrl={'/nccloud/reva/ref/material.do'}
                        queryTreeUrl={'/nccloud/reva/ref/materialclass.do'}
                        {...config}
                    />
                );
                break;
            case 'obligation':
                return (
                    <Refer
                        refName={'履约义务档案'}
                        refCode={'obligation'}
                        refType={'tree'}
                        queryTreeUrl={'/nccloud/reva/ref/obligation.do'}
                        {...config}
                    />
                );
                break;
            default:
                return (<Refer
                    refName={'test'}
                    refCode={'test'}
                    // refType={'tree'}
                    queryGridUrl={'/test/test.do'}
                    {...config}
                />)
                break;
        }
      }
    };
  });