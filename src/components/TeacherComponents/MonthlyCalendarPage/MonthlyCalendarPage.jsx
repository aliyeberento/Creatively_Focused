import React, { Component } from 'react';
import { connect } from 'react-redux';

class MonthlyCalendarPage extends Component {

    render() {
        return (
            <div>
                <h1>Monthly Calendar Detail</h1>
            </div>
        )
    }
}

export default connect()(MonthlyCalendarPage);