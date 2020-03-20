import React, { Component } from 'react';
import { connect } from 'react-redux'
import StudentItem from '../StudentItem/StudentItem';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// styling
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
// calls 'GET_STUDENTS' which then gets a list of students from the database
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
                {/* link to add new students */}
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