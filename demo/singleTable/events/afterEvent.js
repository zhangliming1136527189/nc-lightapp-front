export default function (props, moduleId, key, changedrows, value, data, index) {
    if (key === 'isdefault') {
        props.editTable.setColValueByData(id, key, { value: false }, index)
    }
    let cons = props.createBodyAfterEventData('20521030', 'head', 'body', moduleId, key, changedrows);
    console.log(cons)
}