import React, { Component } from 'react';
import { connect } from 'react-redux'
import StudentItem from '../StudentItem/StudentItem';

// this renders list items for everything in its reducer
class StudentList extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_STUDENTS'
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.reduxState.studentReducer.map(student => {
                        return <StudentItem id="studentListItem" key={student.id} student={student} />
                    })}
                </ul>
            </div>
        )
    }
}

const putStateOnProps = (reduxState) => {
    return ({
        reduxState
    })
}

export default connect(putStateOnProps)(StudentList)