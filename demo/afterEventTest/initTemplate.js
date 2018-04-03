import refer from './refer';
export default function (props) {
   setTimeout(()=>{

    let meta = {
        formid:{
            moduletype: 'form',
            items: [
                {
                    attrcode: 'sex11',
                    label: '性别1',
                    itemtype: 'radio',
                    initialvalue: { value: 0, display: '男' },
                    options: [
                        {
                            display: '男',
                            value: 0
                        }, {
                            display: '女',
                            value: 1
                        }
                    ],
                    col: 4,
                    required: true,
                    visible: true
                },
                {
                    attrcode: 'pk_org',
                    label: '主组织',
                    itemtype: 'input',
                    initialvalue: { value: '张三' },
                    col: 4,
                    required: true,
                    visible:true
                }, {
                    attrcode: 'mny1',
                    label: '金额',
                    itemtype: 'number',
                    scale: 2,
                    col: 4,
                    visible: true
                }, 
                {
                    attrcode: 'bill',
                    label: '出生日期',
                    itemtype: 'refer',
                    refcode:'cont',
                    col: 4,
                    required: true,
                    visible: true
                },
                
            ]
        },
        table1:{
            moduletype: 'table',
            items: [
                {
                    attrcode: 'name2',
                    label: '姓名',
                    itemtype: 'input',
                    visible: true
                }, {
                    attrcode: 'mny2',
                    label: '金额',
                    itemtype: 'number',
                    visible: true
                }, {
                    attrcode: 'date2',
                    label: '出生日期',
                    itemtype: 'datepicker'
                }, {
                    attrcode: 'sex2',
                    label: '性别',
                    itemtype: 'select',
                    options: [
                        {
                            display: '男',
                            value: 0
                        }, {
                            display: '女',
                            value: 1
                        }
                    ],
                    visible: true
                }
            ]
        },
        table2: {
            moduletype: 'table',
            items: [
                {
                    attrcode: 'name3',
                    label: '名称',
                    itemtype: 'input',
                    visible: true
                }, {
                    attrcode: 'mny3',
                    label: '年龄',
                    itemtype: 'number',
                    visible: true
                }, {
                    attrcode: 'date3',
                    label: '生产日期',
                    itemtype: 'datepicker',
                    visible: true
                }, {
                    attrcode: 'sex3',
                    label: '类型',
                    itemtype: 'select',
                    options: [
                        {
                            display: '合格',
                            value: 0
                        }, {
                            display: '不合格',
                            value: 1
                        }
                    ]
                }
            ]
        }
    }
    meta.formid.status="edit";
    meta.table1.status = "edit";
    meta.table2.status = "edit";
    
    props.meta.setMeta(meta);
    //props.initMetaByPkorg();

   },100)
}