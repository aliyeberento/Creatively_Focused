import React, { Component } from 'react';
import { connect } from 'react-redux'
import StudentItem from '../StudentItem/StudentItem';
import { Link } from 'react-router-dom';


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
                <h1>STUDENT LIST</h1>
                <Link className="connectorLink" to="/addstudent">
                    <button className="linkBtn">
                        ADD NEW STUDENT
                    </button>
                </Link>
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