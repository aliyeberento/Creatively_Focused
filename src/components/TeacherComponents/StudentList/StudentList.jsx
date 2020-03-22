import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import './studentList.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';


const styles = {
    root: {
        maxWidth: 600,
        maxHeight: 700,
        paddingTop: '10%',
        paddingLeft: '26%',
    },

};

class StudentList extends Component {

    detailsBtn = (event, student) => {
        console.log('details button clicked', student)
        this.props.history.push(`/studentdetail/${student.id}`)
    }

    addStudent = () => {
        this.props.history.push(`/addstudent`);
    }

    deleteBtn = (student) => {
        this.props.dispatch({
            type: 'DELETE_STUDENT',
            payload: student
        });
        console.log(student)
    }

    render() {
        console.log('student reducer contents:', this.props.student);
        return (
            <div className={this.props.classes.root}>
                <br />

                <h4 className="greeting">Hello {this.props.user.username}!</h4>
                <button onClick={this.addStudent}>Add Student</button>
                <Card>
                    <CardContent>


                        <ul>
                            {this.props.student.map((student) => {

                                return <li key={student.id}>{student.firstname} {student.lastname}
                                    <button onClick={(event) => this.detailsBtn(event, student)}>View Details</button>
                                    <button onClick={() => this.deleteBtn(student.id)}>Remove</button>

                                </li>
                            }
                            )}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    student: state.student,
    user: state.user
});

export default withStyles(styles)(withRouter(connect(mapStateToProps)(StudentList)));