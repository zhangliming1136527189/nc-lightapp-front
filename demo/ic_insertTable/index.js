/**
 * Created by wangshhj on 2018/1/16.
 */
import React, {Component} from 'react';
import './ic_insertTable.less'
// import { createPage } from 'build';
import Ajax from '../../src/api/ajax';
import {createPage} from '../../src';
import NCButton  from '../../src/base/nc_Button';
import {setTableBodyData, pageIndexChange, pageSizeChange, clickSearchBtn, addOperationColumn} from './events';

class IcInsertTable extends Component {
    constructor(props) {
        super(props);
        let {form, button, table, insertTable, search} = this.props;
        let {getInsertTableValue, setInsertTableValue, getInsertTableSelectedValue} = insertTable;
        let {setSearchValue, setSearchValByField, getAllSearchData} = search;
        this.getInsertTableValue = getInsertTableValue;
        this.setInsertTableValue = setInsertTableValue;
        this.getInsertTableSelectedValue = getInsertTableSelectedValue;
        this.setSearchValue = setSearchValue;
        this.setSearchValByField = setSearchValByField;
        this.getAllSearchData = getAllSearchData;
    }

    componentWillMount() {
        //查询外层表格数据
        // Ajax({
        //     url:'',
        //     data:'',
        //     success:function (res) {
        //
        //     }
        // });
        let that = this;

        let listTable = {
            pageInfo: {
                pageIndex: 1,
                pageSize: 5,
                total: 9
            },
            rows: [
                {
                    rowId: 0,
                    values: {
                        id: {value: "1"},
                        ordercode: {value: "0222333"},
                        orderdate: {value: '2018-2-10'},
                        store: {value: '北京市海淀区第一仓库'},
                        buyer: {value: '张三'},
                        purchasedepartment: {value: '用友网络'},
                        purchaseorg: {value: '北京市用友产业园中区'},
                        supplier: {value: '北京市蓝蓝科技公司'},
                        orderstatus: {value: '自由'}
                    }
                }, {
                    rowId: 1,
                    values: {
                        id: {value: "2"},
                        ordercode: {value: "0222324323"},
                        orderdate: {value: '2018-2-26'},
                        store: {value: '北京市海淀区第二仓库'},
                        buyer: {value: '张四'},
                        purchasedepartment: {value: '用友能源'},
                        purchaseorg: {value: '北京市用友产业园西区'},
                        supplier: {value: '北京市蓝蓝科技公司'},
                        orderstatus: {value: '已签字'}
                    }
                }, {
                    rowId: 2,
                    values: {
                        id: {value: "3"},
                        ordercode: {value: "02243432323"},
                        orderdate: {value: '2018-2-27'},
                        store: {value: '北京市海淀区第三仓库'},
                        buyer: {value: '王五'},
                        purchasedepartment: {value: '用友医疗'},
                        purchaseorg: {value: '北京市用友产业园东区'},
                        supplier: {value: '北京市蓝蓝科技公司'},
                        orderstatus: {value: '未签字'}
                    }
                },
            ]
        };

        let data = {
            data: [
                {a: "令狐冲", b: "男", c: 41},
                {a: "杨过", b: "男", c: 67},
                {a: "郭靖", b: "男", c: 25},
                {a: "令狐冲", b: "男", c: 41}
            ],
            pageInfo: {
                pageIndex: 1,
                pageSize: 5,
                total: 9
            }
        };
        setTimeout(function () {
            that.setInsertTableValue('insertTable1', listTable);
        }, 500)



    }

    //保存，获取表格当前数据
    saveData = () => {
        let val = this.getInsertTableValue('insertTable1');
        let val2 = this.getInsertTableSelectedValue('insertTable1', 'ordercode', 'buyer');
        console.log(val)
        console.log(val2)
    };

    //复选框全选事件
    onAllCheckChange = (status, data) => {
        console.log(status, data)
    };

    //单行复选框change事件
    rowCheckChange = (status, data) => {
        console.log(status, data)
    };

    // react：界面渲染函数
    render() {
        let {form, button, table, insertTable, search} = this.props;
        let {createButton} = button;
        let {createInsertTable, getInsertTableValue} = insertTable;
        let {NCCreateSearch} = search;
        return (
            <div className="insertTablePage" style={{"margin": "30px"}}>
                <div>嵌套类型表格</div>
                { NCCreateSearch(
                    'searchArea',
                    {
                        clickSearchBtn: clickSearchBtn.bind(this),
                        // maxNum: 3
                    }
                )}

                <div className="btnArea">
                    <NCButton className="saveBtn" colors="primary" onClick={ this.saveData.bind(this) }>保存</NCButton>
                </div>

                { createInsertTable(
                    'insertTable1',//表格组件id
                    {
                        // id: 'insertTable1', //表格id
                        setTableBodyData: setTableBodyData.bind(this),  //点击加号展开，设置表格数据
                        pageIndexChange: pageIndexChange.bind(this),   //点击分页时，设置表格数据（不用分页，可不传）
                        pageSizeChange: pageSizeChange.bind(this),     //切换显示条数，重新请求数据(不用切换pageSize，可不传)
                        // onAllCheckChangeEve:this.onAllCheckChange.bind(this),     //复选框全选(可不传)
                        // rowCheckChange:this.rowCheckChange.bind(this),     //单行复选框change(可不传)
                        comType: 'hasCheckBox_child', //嵌套表格类型。'normal':普通，不带复选框。hasCheckBox:只有外层表格带复选框。hasCheckBox_child:内外表格都带复选框
                        // comType:'normal',
                        // comType:'hasCheckBox',
                        // needIndex:false  // 默认显示序号，如不需要，传false
                    }
                )}
            </div>
        );
    }
}

export default createPage({
    initTemplate: addOperationColumn
})(IcInsertTable);
