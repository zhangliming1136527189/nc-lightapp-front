import React, { Component } from 'react';
import { Breadcrumb } from 'tinper-bee';
import NCBreadcrumbItem from './nc_BreadcrumbItem';

class NCBreadcrumb extends Component {
	render() {
		return <Breadcrumb {...this.props} />;
	}
}
NCBreadcrumb.NCBreadcrumbItem = NCBreadcrumbItem;
export default NCBreadcrumb;
