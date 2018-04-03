import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

// import IcApply from './ic_apply';
import IcTable from './ic_table';
import Liyxt from './liyxt';
import wangshhj from './wangshhj';
import IcInsertTable from './ic_insertTable';
import IcSimpleSearch from './ic_simpleSearch';
import FinanceMessageMain from './finance/finance_message/main';
import FinanceMessageCard from './finance/finance_message/card';
import FinanceMessageList from './finance/finance_message/list';
import BankFilesList from './baseDoc/bank/list';
import IctreeTable from './ic_treeTable';
import ApproveProcess from '../src/ApproveCenter/pages/ApproveProcess';
import ApproveList from '../src/ApproveCenter/pages/ApproveList';
import ApproveDetail from '../src/ApproveCenter/containers/ApproveDetail/demo.js';
import approveListDemo from './approveListDemo';
import ApproveProcessDemo from './ApproveProcessDemo';
import OrderCard from './purchaseOrder/card';
import OrderList from './purchaseOrder/list';
import ApproveDetailCom from '../src/ApproveCenter/containers/ApproveDetailCom';
import EditableTable from './faith_table/card';
import ic_createSearch2 from './ic_createSearch2';
import ReferDemo from '../src/containers/Refer/demo';
import treeCard from './tree_card';
import SyncTree from './SyncTree';
import PerformanceTest from './liyxt/PerformanceTest';
import SingleTable from './singleTable';
import singleTablePobdoc from './singleTable-pobdoc/list';
import cardDemo from './cardDemo/card';
import tmcuploader from './tmcuploader';
import test_anchor from './test_anchor';
import AfterEventTest from './afterEventTest';
import TreeTableManyCol from './treeTableManyCol';
export default (
	<Router history={hashHistory}>
		{/* <Route path="/" component={IcApply} /> */}
		<Route path="/afterEventTest" component={AfterEventTest} />
		<Route path="/table" component={IcTable} />
		<Route path="/liyxt" component={Liyxt} />
		<Route path="/wangshhj" component={wangshhj} />
		<Route path="/IcInsertTable" component={IcInsertTable} />
		<Route path="/simpleSearch" component={IcSimpleSearch} />
		<Route path="/finance/finance_message/main" component={FinanceMessageMain} />
		<Route path="/finance/finance_message/card" component={FinanceMessageCard} />
		<Route path="/finance/finance_message/list" component={FinanceMessageList} />
		<Route path="/baseDoc/bank/list" component={BankFilesList} />
		<Route path="/IctreeTable" component={IctreeTable} />
		<Route path="/pbm/approveProcess" component={ApproveProcess} />
		<Route path="/pbm/approveList" component={ApproveList} />
		<Route path="/pbm/approveDetail" component={ApproveDetail} />
		<Route path="/approveListDemo" component={approveListDemo} />
		<Route path="/ApproveProcessDemo" component={ApproveProcessDemo} />
		<Route path="/ApproveDetailCom" component={ApproveDetailCom} />
		<Route path="/purchaseOrder/list" component={OrderList} />
		<Route path="/purchaseOrder/card" component={OrderCard} />
		<Route path="ApproveDetailCom" component={ApproveDetailCom} />
		<Route path="/editableTable" component={EditableTable} />
		<Route path="ic_createSearch2" component={ic_createSearch2} />
		<Route path="referDemo" component={ReferDemo} />
		<Route path="tree_card" component={treeCard} />
		<Route path="SyncTree" component={SyncTree} />
		<Route path="PerformanceTest" component={PerformanceTest} />
		<Route path="singleTable" component={SingleTable} />
		<Route path="singleTable-pobdoc/list" component={singleTablePobdoc} />
		<Route path="cardDemo/card" component={cardDemo} />
		<Route path="tmcuploader" component={tmcuploader} />
		<Route path="test_anchor" component={test_anchor} />
		<Route path="TreeTableManyCol" component={TreeTableManyCol} />
	</Router>
);
