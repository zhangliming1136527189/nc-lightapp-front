import React, { Component } from 'react';
import { Affix } from 'tinper-bee';
import './index.less';
export default class NCAffix extends Component {
	render() {
		return (
			<div className="affix">
				<div {...this.props} />
			</div>
		);
	}
}
