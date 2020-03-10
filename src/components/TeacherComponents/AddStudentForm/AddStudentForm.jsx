import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddStudentForm.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';



const styles = {
    root: {
        maxWidth: 600,
        maxHeight: 700,
        paddingTop: '10%',
        paddingLeft: '26%',
    },

};

class AddStudentForm extends Component {

    state = {
        studentToAdd: {
            firstName: '',
            lastName: '',
            grade: '',
            idNumber: '',
            previousIep: '',
            previousEval: '',
            disabilityCategory: '',
            federalSetting: '',
            birthdate: '',
            notes: '',
            teacher: this.props.state.user.id,
            // schoolId: this.props.user.school,
            // isdId: this.props.user.isd,
        }
    }

    handleAddStudent = (propertyName, event) => {
        this.setState({
            studentToAdd: {
                ...this.state.studentToAdd,
                [propertyName]: event.target.value
            }
        }, () => {
            console.log(this.state.studentToAdd)
        })
        // this function should spread local state,
        // and build a new teacher object
    }

    submitStudent = (event) => {
        event.preventDefault()
        console.log('submitting:', this.state.studentToAdd)
        // this should dispatch an action
        // and then use withRouter to push history to teacher list
        // or this new user's detail
        this.props.dispatch({
            type: 'SUBMIT_STUDENT',
            payload: this.state.studentToAdd
        })

        this.props.history.push(`/studentlist`);
    }

    // makeNewStudent = (event) => {

    //     event.preventDefault();
    //     // this function should spread state
    //     // build a new student object
    //     this.setState({
    //         ...this.state,
    //         firstName: event.target.value,
    //         lastName: event.target.value,
    //         grade: event.target.value,
    //         idNumber: event.target.value,
    //         previousIep: event.target.value,
    //         previousEval: event.target.value,
    //         disabilityCategory: event.target.value,
    //         federalSetting: event.target.value,
    //         birthdate: event.target.value,
    //         notes: event.target.value,
    //     });
    // }

    // submitNewStudent = () => {

    //     console.log('submitting a new student', this.state);

    //     // this should dispatch an action
    //     // and then use withRouter to push history to student list
    //     // or this new student's detail
    //     this.props.dispatch({
    //         type: 'SUBMIT_STUDENT',
    //         payload: this.state
    //     });

    //     this.props.history.push(`/studentlist`);
    // }

    render() {
        return (
            <div>
                <h1>ADD NEW STUDENT</h1>

                <div className="form">
                    <div className="set1">
                        <label>First Name<input type="text" placeholder="first name" onChange={(event) => this.handleAddStudent('firstName', event)}></input></label>
                        <label>Last Name<input type="text" placeholder="last name" onChange={(event) => this.handleAddStudent('lastName', event)}></input></label>
                        <label>Birthdate<input type="date" placeholder="birthdate" onChange={(event) => this.handleAddStudent('birthdate', event)}></input></label>
                        <label>Grade<input type="number" placeholder="grade" onChange={(event) => this.handleAddStudent('grade', event)}></input></label>
                        <label>Disability Category<input type="number" placeholder="disability category" onChange={(event) => this.handleAddStudent('disabilityCategory', event)}></input></label>
                        <label>Student ID<input type="number" placeholder="id number" onChange={(event) => this.handleAddStudent('idNumber', event)}></input></label>
                        <label>Federal Setting<input type="number" placeholder="federal setting" onChange={(event) => this.handleAddStudent('federalSetting', event)}></input></label>

                    </div>

                    <div className="set2">
                        <label>Previous IEP<input type="date" placeholder="previous iep date" onChange={(event) => this.handleAddStudent('previousIep', event)}></input></label>
                        <label>Previous Eval<input type="date" placeholder="previous eval date" onChange={(event) => this.handleAddStudent('previousEval', event)}></input></label>
                        <label>Notes<input type="text" placeholder="notes" onChange={(event) => this.handleAddStudent('notes', event)}></input></label>
                        <button type="button" className="submitBtn" onClick={this.submitStudent}>Submit</button>
                    </div>

                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
});

export default withStyles(styles)(withRouter(connect(mapStateToProps)(AddStudentForm)));