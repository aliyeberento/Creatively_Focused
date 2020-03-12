import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EditStudentForm extends Component {

    // state = {
    //     studentToEdit: {
    //         firstname: this.props.reduxState.studentDetail.firstname,
    //         lastname: this.props.reduxState.studentDetail.lastname,
    //         grade: this.props.reduxState.studentDetail.grade,
    //         student_id: this.props.reduxState.studentDetail.student_id,
    //         next_iep: this.props.reduxState.studentDetail.next_iep,
    //         next_eval: this.props.reduxState.studentDetail.next_eval,
    //         disability_cat: this.props.reduxState.studentDetail.disability_cat,
    //         fed_setting: this.props.reduxState.studentDetail.fed_setting,
    //         birthdate: this.props.reduxState.studentDetail.birthdate,
    //         notes: this.props.reduxState.studentDetail.notes,
    //         id: this.props.reduxState.studentDetail.id
    //     }
    // }

    // editThisStudent = (event, propertyValue) => {
    //     // build a new object in state
    //     console.log('building a new student', this.state.studentToEdit);
    //     this.setState({
    //         studentToEdit: {
    //             ...this.state.studentToEdit,
    //             [propertyValue]: event.target.value,
    //         }
    //     })
    // }

    submitEdit = () => {
        // dispatches edit request to redux/database
        console.log('clicking to submit edit');
        this.props.dispatch({
            type: 'EDIT_STUDENT',
            payload: this.props.reduxState.studentDetail,
            url: `/api/studentList/${this.props.reduxState.studentDetail.id}`
        })
        this.goDetail();
    }

    goDetail = () => {
        // brings the user to a detail page showing all of
        // the information for the item they clicked on
        // console.log('clicking to go back to detail');
        this.props.history.push(`/studentdetail/${this.props.match.params.id}`)
    }

    updateStudent = (event, propertyValue) => {
        this.props.dispatch({
            type: 'UPDATE_STUDENT',
            payload: {
                key: [propertyValue],
                value: event.target.value
            }
        })
    }

    render() {
        // let student = this.state.studentToEdit;
        return (
            <div>
                <br></br>
                <form>
                    <label>First Name:
                        <input
                            type="text"
                            placeholder="first name"
                            defaultValue={this.props.reduxState.studentDetail.firstname}
                            onChange={(event) => this.updateStudent(event, 'firstname')}
                        />
                    </label>

                    {/* <input type="text" label="name" defaultValue={student.firstname} value={student.firstname} onChange={(event) => this.editThisStudent(event, 'firstname')}></input><br />
                        <input type="text" label="name" defaultValue={student.lastname} value={student.lastname} onChange={(event) => this.editThisStudent(event, 'lastname')}></input><br />
                        <input type="text" label="name" defaultValue={student.grade} value={student.grade} onChange={(event) => this.editThisStudent(event, 'grade')}></input><br />
                        <input type="date" label="name" defaultValue={student.next_iep} value={student.next_iep} onChange={(event) => this.editThisStudent(event, 'next_iep')}></input><br />
                        <input type="date" label="name" defaultValue={student.next_eval} value={student.next_eval} onChange={(event) => this.editThisStudent(event, 'next_eval')}></input><br />
                        <input type="text" label="name" defaultValue={student.disability_cat} value={student.disability_cat} onChange={(event) => this.editThisStudent(event, 'disability_cat')}></input><br />
                        <input type="text" label="name" defaultValue={student.fed_setting} value={student.fed_setting} onChange={(event) => this.editThisStudent(event, 'fed_setting')}></input><br />
                        <input type="text" label="name" defaultValue={student.birthdate} value={student.birthdate} onChange={(event) => this.editThisStudent(event, 'birthdate')}></input><br />
                        <input type="text" label="name" defaultValue={student.notes} value={student.notes} onChange={(event) => this.editThisStudent(event, 'notes')}></input><br /> */}
                </form>
                <button onClick={this.submitEdit}>submit changes</button>
            </div >
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(putReduxStateOnProps)(EditStudentForm));

{/* <label>First Name:
    <input
        type="text"
        placeholder="first name"
        defaultValue={this.props.reduxState.studentDetail.firstname}
        onChange={
            this.props.dispatch({
                type: 'EDIT_STUDENT',
                payload: {
                    key: 'firstname',
                    value: event
                }
            })}>
    </input>
</label> */}