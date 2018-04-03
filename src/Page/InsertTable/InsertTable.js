/**
 * Created by wangshhj on 2018/1/16.
 */
import React, {Component} from "react";
import {Table, InputRender, Pagination, Col, Checkbox} from "tinper-bee";
import NCTable from "../../base/nc_Table";
import NCSelect from "../../base/nc_Select"
import './insertTable.less'
let NCOption = NCSelect.NCOption;
let firstInit = {};//是否第一次渲染
let bodyKey = null; //当前行的key
let currentRowIndex = null; //当前行的index
const defaultProps = {  //复选框
    prefixCls: "bee-table",
    multiSelect: {
        type: "checkbox",
        param: "key"
    }
};
// const defaultProps_child = {
//     prefixCls: "bee-table",
//     multiSelect: {
//         type: "checkbox",
//         param: "key"
//     }
// };
//创建嵌套类型表格

export function createInsertTable(id, { setTableBodyData, pageIndexChange, pageSizeChange, onAllCheckChangeEve,rowCheckChange, comType, needIndex = true }) {

    if(!this.state.meta){
        return false
    }
    if(!this.state.meta.hasOwnProperty('insertTable') || !this.state.insertTable[id]){
        return false
    }
    this.defPageInfo = {//默认分页信息
        pageSize:10,
        pageIndex:1,
        totalPageIndex:5,
    };
    let columns = this.state.meta.insertTable[id].columns;
    let currentTable = this.state.insertTable[id];
    let data = currentTable.outerData;
    let pageInfo =  Object.assign(this.defPageInfo, currentTable.pageInfo);
    let pageSize = pageInfo.pageSize;
    let pageIndex = pageInfo.pageIndex;
    let totalPage = Math.ceil(pageInfo.total/ pageSize);

    this.setTableBodyData = setTableBodyData;//设置内嵌表格数据
    this.pageIndexChange = pageIndexChange; //切换分页
    this.pageSizeChange = pageSizeChange; //切换每页显示条数

    // let check = (flag, obj) => {
    //     console.log(flag);
    //     console.log(obj);
    // };

    //切换分页
    let pageIndexChanges = (eventKey) => {
        data = this.pageIndexChange(eventKey);
        pageIndex = eventKey;
        this.setState(this.state);
    };

    //每页显示条数
    let pageSizeSelect = (val) => {
        data = this.pageSizeChange(val);
        pageSize = val;
        this.setState(this.state);
    };

    //===========================子表添加复选框===========================================

    //子表复选框全选
    let onAllCheckChangeChild = () => {
        let checkedArray = [];
        let mainCheckObj = currentTable.childCheckObj[bodyKey];
        for (var i = 0; i < mainCheckObj.checkedArrayChild.length; i++) {
            checkedArray[i] = !mainCheckObj.checkedAllChild;
        }
        currentTable.mainCheckObj.checkedArray[currentRowIndex] =  mainCheckObj.checkedAllChild = !mainCheckObj.checkedAllChild;

        mainCheckObj.checkedArrayChild = checkedArray;
        this.setState(this.state);

        // onAllCheckChangeEve(mainCheckObj.checkedAllChild,currentTable.mainCheckObj.data,currentTable.bodyData)
    };

    //子表复选框单个勾选
    let onCheckboxChangeChild = (text, record, index) => {
        let allFlag = false;
        let childCheckObj = currentTable.childCheckObj[bodyKey];
        let checkedArrayChild = childCheckObj.checkedArrayChild.concat();
        checkedArrayChild[index] = !childCheckObj.checkedArrayChild[index];
        for (var i = 0; i < childCheckObj.checkedArrayChild.length; i++) {
            if (!checkedArrayChild[i]) {
                allFlag = false;
                break;
            } else {
                allFlag = true;
            }
        }
        currentTable.mainCheckObj.checkedArray[currentRowIndex] = childCheckObj.checkedAllChild = allFlag;
        childCheckObj.checkedArrayChild = checkedArrayChild;
        this.setState(this.state);
        console.log(currentTable);
        // rowCheckChange(checkedArrayChild[index],currentTable.bodyData.data[bodyKey])
    };

    //子表  表格和复选框列组合到一起
    let renderColumnsMultiSelectChild = (columns) => {
        if(!currentTable.childCheckObj.hasOwnProperty(bodyKey)){
            return false
        }
        let { checkedAllChild, checkedArrayChild } = currentTable.childCheckObj[bodyKey];
        let { multiSelect } = defaultProps;
        let indexCol = [
            {
                label:'序号',
                attrcode: "indexCol",
                dataIndex: "indexCol",
                render:(text, record, index) => {
                    return (
                        <span>
                            {index + 1}
                        </span>
                    )
                }
            }
        ]; // 添加序号列
        let newColumn = columns;
        if(needIndex){
            newColumn = indexCol.concat(newColumn);
        }

        let indeterminate_bool = false;
        if (multiSelect && multiSelect.type === "checkbox") {
            let i = checkedArrayChild.length;
            while(i--){
                if(checkedArrayChild[i]){
                    indeterminate_bool = true;
                    break;
                }
            }
            let defaultColumns = [
                {
                    label: (
                        <Checkbox
                            className="table-checkbox"
                            checked={checkedAllChild}
                            indeterminate={indeterminate_bool&&!checkedAllChild}
                            onChange={ onAllCheckChangeChild.bind(this) }
                        />
                    ),
                    attrcode: "checkbox",
                    dataIndex: "checkbox",
                    width: "5%",
                    render: (text, record, index) => {
                        return (
                            <Checkbox
                                className="table-checkbox"
                                checked={checkedArrayChild[index]}
                                onChange={onCheckboxChangeChild.bind(this, text, record, index)}
                            />
                        );
                    }
                }
            ];
            newColumn = defaultColumns.concat(newColumn);
        }


        return newColumn;
    };

    //表格展开显示的内容
    let expandedRowRender = (record, index, indent) => {
        console.log(record, index)
        if(JSON.stringify(currentTable.bodyData.column) == "{}"){
            return false
        }
        //  根据组件类型，判断是否带复选框
        let newColumn = currentTable.bodyData.column;
        let classByType = null;
        if(comType == 'hasCheckBox_child'){
            newColumn = renderColumnsMultiSelectChild.call(this,newColumn);
        }

        let data1 = {
            rows: [
                {
                    rowId: 0,
                    values:{
                        id: {value: "1"},
                        ordercode: {value: "222222222"},
                        orderdate: { value: '2018-2-10'},
                        store: {value: '北京市海淀区第一仓库'},
                        buyer:{value:'张三'},
                        purchasedepartment:{value:'用友网络'},
                        purchaseorg:{value:'北京市用友产业园中区'},
                        supplier:{value:'北京市蓝蓝科技公司'},
                        orderstatus:{value:'自由'}
                    }
                },
            ]
        };
        let data2 = {
            rows: [
                {
                    rowId: 0,
                    values:{
                        id: {value: "1"},
                        ordercode: {value: "222222222"},
                        orderdate: { value: '2018-2-10'},
                        store: {value: '北京市海淀区第一仓库'},
                        buyer:{value:'张三'},
                        purchasedepartment:{value:'用友网络'},
                        purchaseorg:{value:'北京市用友产业园中区'},
                        supplier:{value:'北京市蓝蓝科技公司'},
                        orderstatus:{value:'自由'}
                    }
                },
                {
                    rowId: 1,
                    values:{
                        id: {value: "2"},
                        ordercode: {value: "6666"},
                        orderdate: { value: '2018-2-10'},
                        store: {value: '北京市海淀区第一仓库'},
                        buyer:{value:'张三'},
                        purchasedepartment:{value:'用友网络'},
                        purchaseorg:{value:'北京市用友产业园中区'},
                        supplier:{value:'北京市蓝蓝科技公司'},
                        orderstatus:{value:'自由'}
                    }
                },
            ]
        };


        if (JSON.stringify(currentTable.bodyData) !== "{}" && currentTable.bodyData.data.hasOwnProperty(bodyKey)) {
            return (
                <Table
                    columns={ createNewCol(newColumn) }
                    // data={ createNewData(currentTable.bodyData.data[bodyKey].rows) }
                    data={ index==0?createNewData(data1.rows):createNewData(data2.rows) }
                    // title={currentData => <div>标题: 这是一个标题</div>}
                    // footer={currentData => <div>表尾: 我是小尾巴</div>}
                />
            );
        }
    };

    //当点击展开的时候才去请求内嵌表格数据
    let getData = (expanded, record,index) => {
        if (expanded) {
            bodyKey = record.key;
            currentRowIndex = record.rowIndex;

            //判断是否已经有该子表数据，如果有，不需要再次请求。
            let hasThisChild = currentTable.childCheckObj.hasOwnProperty(bodyKey);
            this.setTableBodyData(record,hasThisChild);
        }
    };

//============================================添加复选框==================================

    if(data && !firstInit.hasOwnProperty(id)){
        firstInit[id] = true;
        //初始化内嵌表格数据
        currentTable.bodyData = {
            column:{},
            data:{}
        };
        currentTable.childCheckObj = {};

        //初始化复选框
        currentTable.mainCheckObj = {
            checkedAll:false,
            checkedArray: [],
            data: data
        };
        //设置每行是否勾选
        data.map((val,index)=>{
            currentTable.mainCheckObj.checkedArray.push(false)
        });
    }

    //主表复选框全选
    let onAllCheckChange = () => {
        let checkedArray = [];
        let mainCheckObj = currentTable.mainCheckObj;
        for (var i = 0; i < mainCheckObj.checkedArray.length; i++) {
            checkedArray[i] = !mainCheckObj.checkedAll;
        }
        mainCheckObj.checkedAll = !mainCheckObj.checkedAll;
        mainCheckObj.checkedArray = checkedArray;

        //设置子表勾选
        if(JSON.stringify(currentTable.childCheckObj) !== '{}' && currentTable.childCheckObj.hasOwnProperty(bodyKey)){
            currentTable.childCheckObj[bodyKey].checkedAllChild = mainCheckObj.checkedAll;
            currentTable.childCheckObj[bodyKey].checkedArrayChild.map((val,ind) => {
                currentTable.childCheckObj[bodyKey].checkedArrayChild[ind] = mainCheckObj.checkedAll;
            });
        }

        this.setState(this.state);

        if(typeof onAllCheckChangeEve === 'function'){
            onAllCheckChangeEve(currentTable.mainCheckObj.checkedAll,currentTable.mainCheckObj.data,currentTable.bodyData)
        }
    };

    //主表复选框单个勾选
    let onCheckboxChange = (text, record, index) => {
        let allFlag = false;
        let mainCheckObj = currentTable.mainCheckObj;
        let checkedArray = mainCheckObj.checkedArray.concat();
        checkedArray[index] = !mainCheckObj.checkedArray[index];
        for (var i = 0; i < mainCheckObj.checkedArray.length; i++) {
            if (!checkedArray[i]) {
                allFlag = false;
                break;
            } else {
                allFlag = true;
            }
        }
        mainCheckObj.checkedAll = allFlag;
        mainCheckObj.checkedArray = checkedArray;

        //设置子表勾选
        if(JSON.stringify(currentTable.childCheckObj) !== '{}' && currentTable.childCheckObj.hasOwnProperty(bodyKey)){
            currentTable.childCheckObj[bodyKey].checkedAllChild = mainCheckObj.checkedArray[index];
            currentTable.childCheckObj[bodyKey].checkedArrayChild.map((val,ind) => {
                currentTable.childCheckObj[bodyKey].checkedArrayChild[ind] = mainCheckObj.checkedArray[index];
            });
        }

        this.setState(this.state);
        console.log(currentTable);
        if(typeof rowCheckChange === 'function'){
            rowCheckChange(checkedArray[index],currentTable.mainCheckObj.data[index])
        }

    };

    //主表  表格和复选框列组合到一起
    let renderColumnsMultiSelect = (columns) => {
        console.log(currentTable);
        const { data,checkedArray } = currentTable.mainCheckObj;
        const { multiSelect } = defaultProps;
        let indeterminate_bool = false;  //主表半选

        let indexCol = [
            {
                label:'序号',
                attrcode: "indexCol",
                dataIndex: "indexCol",
                render:(text, record, index) => {
                    return (
                        <span>
                            {index + 1}
                        </span>
                    )
                }
            }
        ]; // 添加序号列
        let newColumn = columns;
        if(needIndex){
            newColumn = indexCol.concat(newColumn);
        }

        if (multiSelect && multiSelect.type === "checkbox") {
            let i = checkedArray.length;
            while(i--){
                if(checkedArray[i]){
                    indeterminate_bool = true;
                    break;
                }
            }

            let defaultColumns = [
                {
                    label: (
                        <Checkbox
                            className="table-checkbox"
                            checked={currentTable.mainCheckObj.checkedAll}
                            indeterminate={indeterminate_bool&&!currentTable.mainCheckObj.checkedAll}
                            onChange={onAllCheckChange.bind(this)}
                        />
                    ),
                    attrcode: "checkbox",
                    dataIndex: "checkbox",
                    width: "5%",
                    render: (text, record, index) => {
                        let indeterminate_bool_child = false; //子表半选
                        if(currentTable.childCheckObj && currentTable.childCheckObj.hasOwnProperty(record.key)){
                            let checkedArrayChild = currentTable.childCheckObj[record.key].checkedArrayChild;
                            let i = checkedArrayChild.length;

                            while(i--){
                                if(checkedArrayChild[i]){
                                    indeterminate_bool_child = true;
                                    break;
                                }
                            }
                        }


                        return (
                            <Checkbox
                                className="table-checkbox"
                                checked={currentTable.mainCheckObj.checkedArray[index]}
                                indeterminate={indeterminate_bool_child&&!currentTable.mainCheckObj.checkedArray[index]}
                                onChange={onCheckboxChange.bind(this, text, record, index)}
                            />
                        );
                    }
                }
            ];
            newColumn = defaultColumns.concat(newColumn);
        }

        return newColumn;
    };

    //  根据组件类型，判断是否带复选框
    let column = columns;
    let classByType = null;
    if(comType == 'hasCheckBox' || comType == 'hasCheckBox_child'){
        column = renderColumnsMultiSelect.call(this,columns);
        classByType = 'hasCheckBox'
    }

    // 处理模板
    let createNewCol = (column) => {
        return  column.map((item) => {
            let render = null;
            if(item.label !== '操作' && item.attrcode !== 'checkbox' && item.attrcode !== 'indexCol'){
                render = (text, record, index) => {
                    let display = record[item.attrcode].display;
                    let value = record[item.attrcode].value;
                    let dom = '';
                    if(display || display == 0){
                        dom = display
                    }else{
                        dom = value
                    }
                    return (
                        <span>
                            {dom}
                        </span>
                    )
                };
            }else{
                render = item.render
            }
            return {...item,render, key:item.attrcode, title:item.label}
        });
    };

    //  处理数据
    let createNewData = (data) => {
        let datas = [];
        data.map((val,index) => {
            datas.push(val.values)
        });
        return datas
    };

    return (
        <div className={["insertTable",classByType].join(' ')}>
            <NCTable
                columns={createNewCol(column)}
                data={createNewData(currentTable.mainCheckObj.data)}
                onExpand={getData.bind(this)}
                expandedRowRender={expandedRowRender.bind(this)}
                // title={currentData => <div>标题: 这是一个标题</div>}
                // footer={currentData => <div>表尾: 我是小尾巴</div>}
            />

            <Col md={12} xs={12} sm={12}>
                <NCSelect className="pageSizeDom"
                          size="lg"
                          defaultValue={pageSize}
                          style={{width: 100, marginRight: 6}}
                          onChange={pageSizeSelect.bind(this)}
                >
                    <NCOption value={5}>5条/页</NCOption>
                    <NCOption value={10}>10条/页</NCOption>
                    <NCOption value={20}>20条/页</NCOption>
                    <NCOption value={50}>50条/页</NCOption>
                    <NCOption value={100}>100条/页</NCOption>
                </NCSelect>

                {pageInfo ? <Pagination
                    className="Pagination"
                    first
                    last
                    prev
                    next
                    boundaryLinks
                    items={totalPage}   //总页数
                    maxButtons={5}  //显示最多页数按钮
                    activePage={pageIndex}
                    onSelect={pageIndexChanges.bind(this)}
                /> : ""}
            </Col>
        </div>
    );
}

