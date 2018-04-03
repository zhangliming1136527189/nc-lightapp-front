/**
 * Created by wangshhj on 2018/1/18.
 */
//获取当前表格所有数据
export function getInsertTableValue(id) {
    return this.state.insertTable[id];
}

//获取当前表格勾选所有数据
export function getInsertTableSelectedValue(id,mainCord,childCord) {
    let table = this.state.insertTable[id];
    let newArr = [];
    let bodyKey = null;
    table.mainCheckObj.checkedArray.map((item,index) => {

        //先判断主表是否勾选，如果勾选，只返回主表主键即可，如果没有勾选，查看子表是否有数据，是否有勾选项，如果有，返回主表主键+子表主键
        let newObj = {};
        if(table.mainCheckObj.checkedArray[index]){
            if(table.outerData[index].values.hasOwnProperty(mainCord)){
                newObj[mainCord] = table.outerData[index].values[mainCord].value;
                newArr.push(newObj)
            }else{
                alert('没有找到主表主键')
            }
        }else{
            bodyKey = table.outerData[index].values.key;
            if(table.childCheckObj.hasOwnProperty(bodyKey)){
                newObj[childCord] = [];
                table.childCheckObj[bodyKey].checkedArrayChild.map((val,index2) => {
                    if(table.childCheckObj[bodyKey].checkedArrayChild[index2]){
                        newObj[mainCord] = table.outerData[index].values[mainCord].value;
                        newObj[childCord].push(table.bodyData.data[bodyKey].rows[index2].values[childCord].value);
                    }
                });
                if(newObj[mainCord]){
                    newArr.push(newObj)
                }
            }
        }
    });
    return newArr
}

//更新外层表格数据
export function setInsertTableValue(id,newData) {
    newData.rows.map((val,index)=>{
        if(!val.rowId && val.rowId !== 0){
            val.rowId = new Date().getTime() + index;
        }
        val.values.key = val.rowId;
        val.values.rowIndex = index;
    });

    this.state.insertTable[id] = {
        outerData:newData.rows,
        pageInfo:newData.pageInfo
    };

    this.setState({
        insertTable:this.state.insertTable
    });
}

//设置展开的子表数据
export function setChildTableData(id,key,rowIndex,column,datas) {
    let table = this.state.insertTable[id];
    let checkedArrayChild = [];//子表每行勾选状态

    datas.rows.map((val,index) => {
        if(!val.rowId && val.rowId !== 0){
            val.rowId = new Date().getTime() + index;
        }
        val.values.key = val.rowId;
        if(table.mainCheckObj.checkedArray[rowIndex]){
            checkedArrayChild.push(true)
        }else{
            checkedArrayChild.push(false)
        }
    });
    table.bodyData.column = column;
    table.bodyData.data[key] = datas;

    // 根据主表当前行是否勾选，设置子表复选框 勾选
    if(!table.childCheckObj.hasOwnProperty(key)){
        table.childCheckObj[key] = {
            checkedAllChild:table.mainCheckObj.checkedArray[rowIndex],
            checkedArrayChild: checkedArrayChild
        };
    }

    this.setState({
        insertTable:this.state.insertTable
    });
}
