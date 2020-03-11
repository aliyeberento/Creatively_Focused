import React, { Component } from 'react';
import { connect } from 'react-redux'
import StudentItem from '../StudentItem/StudentItem';

class StudentList extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_STUDENTS'
        })
    }

    render() {
        console.log(this.props.reduxState.students);
        return (
            <div>
                <ul>
                    {this.props.reduxState.students.map(student => {
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