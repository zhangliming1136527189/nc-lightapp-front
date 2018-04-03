//  插入子节点数据
function setChildNodeEve(tableData, child, parent) {
    let parentKey = parent.key;
    let len = tableData.length;
    for (let i = 0; i < len; i++) {
        let item = tableData[i];
        if (item.rowId === parentKey) {
            tableData[i].values.children = child;
            break
        } else if (item.values.hasOwnProperty('children')) {
            setChildNodeEve(item.values.children, child, parent)
        }
    }
    return tableData
}

//  添加rowId;
function addRowId(data, field) {
    data.map((item) => {
        item.rowId = item.values[field].value;
        if (item.values.hasOwnProperty('children')) {
            addRowId(item.values.children, field)
        }
    })
}

//  设置树状表数据
export function initTreeTableData(moduleId, data, rowId) {
    let thisTable = this.state.treeTableCol[moduleId];
    addRowId(data, rowId);
    thisTable.data = data;
    thisTable.rowId = rowId;    //  rowId字段
    thisTable.firstTime = true; //第一次渲染
    this.setState({
        treeTableCol: this.state.treeTableCol
    })
}

/*
* 展开时，设置子节点数据
* @ moduleId: 组件id
* @ child: 子表数据
* @ parent: 当前行信息
* */
export function setChildNode(moduleId, child, parent) {
    let  thisTable =  this.state.treeTableCol[moduleId];
    addRowId(child, thisTable.rowId );
    thisTable.data = setChildNodeEve(thisTable.data, child, parent );
    this.setState({
        treeTableCol: this.state.treeTableCol
    })
}


//  编辑成功
export function editSuccess(moduleId, newData) {

}
