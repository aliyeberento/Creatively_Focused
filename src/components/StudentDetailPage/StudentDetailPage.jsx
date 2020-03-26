import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import TaskList from '../TaskList/TaskList';
import Popup from 'reactjs-popup';
import logo from '../UserDetailPage/logo square color.jpg';
import './StudentDetailPage.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class StudentDetailPage extends Component {

    // GET request for details of the item clicked on
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_STUDENT_DETAIL',
            payload: this.props.match.params.id
        })
    }

    // directs the user to an edit page pre-populated with the item's info
    editStudent = () => {
        console.log('clicking to go edit', this.props.match.params.id);
        this.props.history.push(`/editstudent/${this.props.match.params.id}`)
    }

    // dispatches a DELETE to the database via redux saga for the item clicked on
    deleteStudent = () => {
        console.log('clicking to delete');
        this.props.dispatch({
            type: 'DELETE_STUDENT',
            payload: this.props.match.params.id
        })
        this.props.history.push(`/studentlist`)
    }

    goToStudentList = () => {
        console.log('going back to student list');
        this.props.history.push(`/studentlist`)
    }

    render() {
        let student = this.props.reduxState.studentDetail;
        return (
            <div>
                <Typography className="student-name" gutterBottom variant="h5" component="h2">
                    {student.firstname} {student.lastname}
                </Typography>
                <Typography component="p">
                    <ul id="cardContent">
                        <li>Grade: {student.grade}</li>
                        <li>Date of Birth: {moment(student.birthdate).format('MM-DD-YYYY')}</li>
                        <li>Previous IEP: {moment(student.prev_iep).format('MM-DD-YYYY')}</li>
                        <li>Next IEP: {moment(student.next_iep).format('MM-DD-YYYY')}</li>
                        <li>Previous EVAL: {moment(student.prev_eval).format('MM-DD-YYYY')}</li>
                        <li>Next EVAL: {moment(student.next_eval).format('MM-DD-YYYY')}</li>
                        <li>Disability Category: {student.disability_cat}</li>
                        <li>Federal Setting: {student.fed_setting}</li>
                        <li>Teacher: {student.teacherfirstname} {student.teacherlastname}</li>
                        <li>School: {student.school}</li>
                        <li>ISD: {student.isd}</li>
                        <li>Notes: {student.notes}</li><br />
                    </ul>
                </Typography>
                    <div id="Button">
                        <Button size="small" variant="outlined" onClick={this.editStudent}>Edit</Button>
                            <Popup trigger={<Button size="small" variant="outlined" > DELETE </Button>} modal>
                                {close => (
                                    <div className="popup-contents">
                                        <img src={logo} alt="sparkle" />
                                        <div className="content">Are you sure you want to delete this student?</div>
                                        <div className="actions">
                                            <button className="button-popup" onClick={(event) => this.deleteStudent(event)}>YES</button>
                                            <button className="button-popup" onClick={() => close()}>NO</button>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        <Button size="small" variant="outlined" onClick={this.goToStudentList}>BACK TO STUDENT LIST</Button>
                    </div>
                <TaskList />
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(putReduxStateOnProps)(StudentDetailPage));