import React, { Component } from 'react';
import Table from '../../base/nc_Table';
import FormControl from '../../base/nc_FormControl';
import Number from '../../base/nc_Number';
import Checkbox from '../../base/nc_Checkbox';
import DatePicker from '../../base/nc_DatePicker';
import zhCN from "rc-calendar/lib/locale/zh_CN";
import Select from '../../base/nc_Select';
import Switch from '../../base/nc_Switch';
import Radio from '../../base/nc_Radio';
import Modal from '../../base/nc_Modal';
import Button from '../../base/nc_Button';
import refer from '../../containers/ReferDemo';
import Form from 'bee-form';

import { isObj, isWrong, isDisplay, undefinedOrTrue, undefinedOrfalse } from '../../public';
import { checkHasIndex, scaleFormat } from './util';
import CONFIG from '../../public/config';
import deepClone from '../../public/deepClone';

const Option = Select.NCOption;
const RadioGroup = Radio.NCRadioGroup;
const FormItem = Form.FormItem;

import './editTable.less';

function onCheckboxChange(moduleId, text, record, index) {
	// console.log(moduleId, text, record, index)
	this.state.table[moduleId].rows[index].selected = !this.state.table[moduleId].rows[index].selected;
	let len = this.state.table[moduleId].rows.length;
	// 如果有一个备选 哪个开关为开，同时看是否全选，
	while (len--) {
		if (!!this.state.table[moduleId].rows[len].selected) {
			this.state.table[moduleId].indeterminate = true;
			break;
		} else {
			this.state.table[moduleId].indeterminate = false;
		}
	}
	this.state.table[moduleId].checkedAll = this.state.table[moduleId].rows.every(item => !!item.selected)

	this.setState({
		table: this.state.table
	})
}

function onAllCheckChange(moduleId, checked) {
	this.state.table[moduleId].checkedAll = !this.state.table[moduleId].checkedAll
	if (!this.state.table[moduleId].checkedAll) {
		this.state.table[moduleId].indeterminate = false
	}
	let len = this.state.table[moduleId].rows.length;
	for (let i = 0; i < len; i++) {
		this.state.table[moduleId].rows[i].selected = checked
	}
	this.setState({
		table: this.state.table
	})
}

export function createEditTable(moduleId, events) {
	// 获取table的meta信息 注意异步时候 meta中没有此id 为undefined
	var meta = this.state.meta[moduleId],
		columns,
		{ renderItem } = this.state,
		that = this;

	if (!meta || meta.moduletype !== 'table') return;

	if (!this.state.table.hasOwnProperty(moduleId)) {
		// 做一步缓冲 保证moduleId写入table，并保证格式一致性
		this.state.table[moduleId] = {
			pageinfo: {},
			rows: [],
			checkedAll: false,
		};
	}

	let { rows = [], checkedAll = false, indeterminate = false } = this.state.table[moduleId];

	let defaultWidth = 100 / meta.items.length + '%',
		defaultHeight = '40px';

	// 过滤去删除的数据序号
	this.state.table[moduleId].rows.filter((item) => item.status != '3').map((item, index) => {
		let values = item.values;
		values.numberindex = { value: `${index + 1}` };
	});

	// 序号开关 默认始终显示序号
	if (meta.showindex && !checkHasIndex(meta.items)) {
		meta.items.unshift({
			label: '序号',
			title: '序号',
			attrcode: 'numberindex',
			dataIndex: 'numberindex',
			className: 'table-index',
			visible: true,
			itemtype: 'label',
			width: '50px'
		});
	}

	columns = meta.items.filter((item) => item.visible == true).map((item) => {
		// item.width = item.width || defaultWidth;
		item.title = item.title || item.label;
		item.key = item.attrcode;

		// 每个column单项的render函数
		var render = (text, record, index) => {
			// lebel为汉字的操作列 不去渲染
			if (item.label == '操作') {
				return false;
			}
			let editItem, value, display;
			let required = null; //必输项添加红星标识
			let requiredClassName = null; //必输项样式需要调整
			if (item.required) {
				required = (
					<span className="NC_required" style={{ zIndex: '999' }}>
						*
					</span>
				);
				requiredClassName = 'requiredClassName';
			}
			value = isObj(record.values[item.attrcode]) ? record.values[item.attrcode].value : null;
			if (renderItem.table && renderItem.table[moduleId] && renderItem.table[moduleId][item.attrcode]) {
				value = {
					refname: record.values[item.attrcode].display || '',
					refpk: record.values[item.attrcode].value || ''
				};
				editItem = renderItem.table[moduleId][item.attrcode];
			} else {
				switch (item.itemtype) {
					case 'input':
						editItem = <FormControl />;
						break;
					case 'number':
						editItem = (
							<Number
								scale={(isObj(record.values[item.attrcode]) && record.values[item.attrcode].scale) || item.scale || 0}
							/>
						);
						break;
					case 'checkbox':
						editItem = <Checkbox checked={!!value} />;
						break;
					case 'select':
						display = isObj(record.values[item.attrcode]) ? record.values[item.attrcode].display : '';

						editItem = (
							<Select defaultValue={value} value={value}>
								{item.options.map((e, i) => {
									return (
										<Option key={i} value={String(e.value)}>
											{` ${e.display} `}
										</Option>
									);
								})}
							</Select>
						);
						break;
					case 'radio':
						editItem = <RadioGroup
							name={item.attrcode}
							selectedValue={String(value)}>
							{item.options.map((e, i) => {
								return (
									<Radio key={i} value={String(e.value)}>{e.display}</Radio>
								);
							})}
						</RadioGroup>;
						break;
					case 'switch':
						editItem = <Switch checked={!!value} />;
						break;
					case 'datepicker':
						editItem = <DatePicker />;
						break;
					case 'refer':
						editItem = refer(item.refcode, {
							disabled: !!item.disabled,
							placeholder: item.placeholder,
							queryCondition: item.queryCondition
						});
						if (editItem.props.isMultiSelectedEnabled) {
							let tempArr = (record.values[item.attrcode] && record.values[item.attrcode].display) ? record.values[item.attrcode].display.split(',') : [];
							let tempArr1 = (record.values[item.attrcode] && record.values[item.attrcode].value) ? record.values[item.attrcode].value.split(',') : [];
							value = tempArr.map((item, index) => {
								return {
									refname: item,
									refpk: tempArr1[index]
								}
							})
						} else {
							value = {
								refname: isObj(record.values[item.attrcode]) ? record.values[item.attrcode].display : '',
								refpk: isObj(record.values[item.attrcode]) ? record.values[item.attrcode].value : ''
							}
						}
					default:
						break;
				}
			}
			function createTableItem({
				initialvalue = '',
				valuePropName = 'value',
				changeTrigger = 'onChange',
				focusTrigger = 'onFocus',
				disabled = false,
				onBlur = 'onBlur'
			} = {}) {
				if (!editItem) return null;

				// console.log(initvalue)
				return {
					...editItem,
					props: {
						...editItem.props,
						disabled: !undefinedOrfalse(item.disabled), // 如果没有disabled或者false 看成false
						[valuePropName]:
							value || (isObj(record.values[item.attrcode]) ? (record.values[item.attrcode].display || record.values[item.attrcode].value) : null),
						[changeTrigger]: (valueChange) => {
							let i = this.state.table[moduleId].rows.findIndex((e) => e.rowId === record.rowId);
							if (item.itemtype == 'refer') {
								let mulValue = {}
								if (editItem.props.isMultiSelectedEnabled) {
									// 用Object.assign()改造
									mulValue = {
										display: valueChange.map((e) => e.refname).join(','),
										value: valueChange.map((e) => e.refpk).join(',')
									};
								}
								this.state.table[moduleId].rows[i].values[item.attrcode] = {
									display: editItem.props.isMultiSelectedEnabled ? mulValue.display : valueChange.refname,
									value: editItem.props.isMultiSelectedEnabled ? mulValue.value : valueChange.refpk
								}
							} else {
								this.state.table[moduleId].rows[i].values[item.attrcode] = {}
								this.state.table[moduleId].rows[i].values[item.attrcode].value = valueChange.value || valueChange;
							}
							// 把status置为1，标识修改

							if (this.state.table[moduleId].rows[i].status == '0') {
								this.state.table[moduleId].rows[i].status = '1';
							}
							this.setState({
								table: this.state.table
							});
							if (CONFIG.changeTypes.includes(item.itemtype)) {
								//console.log(this.state.table[moduleId].rows, '当前：', valueChange, '上一次：', initvalue[`${i}**${item.attrcode}`])
								let changedrows = [];
								changedrows.push({
									rowid: record.rowId,
									newvalue: {
										value: valueChange
									},
									oldvalue: {
										value: this.editTableInitValue[`${i}**${item.attrcode}`]
									}
								})
								events && (typeof events.onAfterEvent == 'function') && events.onAfterEvent(
									{ ...this.props, ...this.output },
									moduleId,
									item.attrcode,
									valueChange,
									changedrows,
									i
								);
								this.editTableInitValue[`${i}**${item.attrcode}`] = valueChange
							}
						},
						onBlur: (val) => {
							if (CONFIG.blurTypes.includes(item.itemtype)) {
								let i = this.state.table[moduleId].rows.findIndex((e) => e.rowId === record.rowId);
								let changedrows = [];
								changedrows.push({
									rowid: record.rowId,
									newvalue: {
										value: val
									},
									oldvalue: {
										value: this.editTableInitValue[`${i}**${item.attrcode}`]
									}
								})
								events && (typeof events.onAfterEvent == 'function') && events.onAfterEvent(
									{ ...this.props, ...this.output },
									moduleId,
									item.attrcode,
									val,
									changedrows,
									i
								);
								this.editTableInitValue[`${i}**${item.attrcode}`] = val;
							}
						}
					}
				};
			}

			// 编辑态meta.status === 'edit'  且该列 可编辑isEdit(data中无edit属性或者属性为true)  且  不是label类型
			return item.itemtype !== 'label' && meta.status === 'edit' ? (
				<div className={requiredClassName}>
					{required}
					{createTableItem.call(that)}
				</div>
			) : (
					// TODO 浏览态展示，先display后value 应该是按类型处理
					<div className="eidt-table-browse">
						{
							isObj(record.values[item.attrcode])
								? (display || record.values[item.attrcode].display || (item.itemtype == 'number' ? scaleFormat(record.values[item.attrcode]).value : record.values[item.attrcode].value))
								: (null)
						}
					</div>
				);
		};
		return { render, ...item };
	});

	let defaultColumns = [
		{
			title: (
				<Checkbox
					className="table-checkbox"
					checked={checkedAll}
					indeterminate={indeterminate && !checkedAll}
					onChange={onAllCheckChange.bind(this, moduleId)}
				/>
			),
			key: "checkbox",
			dataIndex: "checkbox",
			className: 'table-checkbox-class',
			visible: true,
			itemtype: 'customer',
			width: "50px",
			render: (text, record, index) => {
				return (
					<Checkbox
						className="table-checkbox"
						checked={!!rows[index].selected}
						onChange={() => {
							onCheckboxChange.call(this, moduleId, text, record, index)
						}}
					/>
				);
			}
		}
	];

	columns = defaultColumns.concat(columns);

	return (
		<div className="editTableCom">
			<Table
				data={this.state.table[moduleId].rows.filter((e) => e.status != '3')}
				columns={columns}
				rowKey={'rowId'}
				bordered
			/>
		</div>
	);
}
