import React, { Component } from 'react';
import { connect } from 'react-redux'
import StudentItem from '../StudentItem/StudentItem';
import { Link } from 'react-router-dom';

// styling
import { withStyles } from '@material-ui/core/styles';
import './StudentList.css';

const styles = {
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};


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
                    
                    <h2 className="student-list">Student List</h2>
                
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

export default withStyles(styles)(connect(putStateOnProps)(StudentList));