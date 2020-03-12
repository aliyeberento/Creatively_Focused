import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class StudentItem extends Component {

    goDetail = (event, student) => {
        this.props.history.push(`/studentdetail/${student.id}`)
    }

    render() {
        return (
            <div>
                <li>
                    {this.props.student.lastname}, {this.props.student.firstname}
                    <button key={this.props.student.id} onClick={(event) => this.goDetail(event, this.props.student)}>view student details</button>
                </li>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(putReduxStateOnProps)(StudentItem));