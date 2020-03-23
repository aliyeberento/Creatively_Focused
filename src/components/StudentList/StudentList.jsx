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

    render() {
        console.log(this.props.reduxState.students);
        return (
            <div>
                <ul>
                    <h1 className="student-list">STUDENT LIST</h1>
                    <Link style={{ backgroundColor: 'transparent' }} className="connectorLink" to="/addstudent">
                        <div id="Button">
                            <button className="linkBtn student-add">
                                ADD NEW STUDENT
                            </button>
                        </div>
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