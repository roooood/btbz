import React from 'react';

import { t } from '../../locales';
import request from '../../helper/Fetch';
import { connect } from 'react-redux';

class Crash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            null
        );
    }
}

export default connect(state => state)(Crash);