import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import TaskList from '../TaskList/TaskList';
import StudentList from '../StudentList/StudentList';
import TeacherTaskList from '../TeacherTaskList/TeacherTaskList';
import Popup from 'reactjs-popup';
import Button from '@material-ui/core/Button';

//styling
import logo from './logo square color.jpg';
import './UserDetailPage.css';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';


// const styles = {
//     card: {
//         maxWidth: 345,

//     },
//     media: {
//         height: 140,
//     },

// };


class UserDetailPage extends Component {

    // GET request for details of the item clicked on
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_TEACHER_DETAIL',
            payload: this.props.match.params.id
        })
    }

    // directs the user to an edit page pre-populated with the item's info
    editUser = () => {
        console.log('clicking to go edit', this.props.match.params.id);
        this.props.history.push(`/edituser/${this.props.match.params.id}`)
    }

    // dispatches a DELETE to the database via redux saga for the item clicked on
    deleteUser = () => {
        console.log('clicking to delete', this.props.reduxState.teacherDetail.id);
        this.props.dispatch({
            type: 'DELETE_USER',
            payload: this.props.match.params.id
        })
        this.props.history.push(`/adminhome`)
    }
// on call, it will take you back to the student list
    goToUserList = () => {
        console.log('going back to student list');
        this.props.history.push(`/adminhome`)
    }


    render() {
        let user = this.props.reduxState.teacherDetail;
        return (
            <div>
                {/* <Grid> */}
                    {/* <Card className="user-content">
                        <CardContent id="cardcontent"> */}
                            <Typography className="user-name" gutterBottom variant="h5" component="h2">
                                USER: {user.firstname} {user.lastname}
                            </Typography>

                            <Typography>
                                <ul id="cardContent">
                                    <li>E-Mail/Username: {user.username}</li>
                                    <li>School: {user.school}</li>
                                    <li>City: {user.city}</li>
                                    <li>State: {user.state}</li>
                                    <li>ISD: {user.isd}</li>
                                    <li>Phone Number: {user.phone}</li>
                                </ul>
                            </Typography>
                        {/* </CardContent> */}

                        {/* <CardActions className="student-buttons"> */}
                        <div id="Button">
                            <Button size="small" variant="outlined" onClick={this.editUser}>Edit</Button>
                            <Button>
                                <Popup trigger={<Button size="small" variant="outlined" > DELETE </Button>} modal>
                                    {close => (
                                        <div className="popup-contents">
                                            <img src={logo} alt="sparkle" />
                                            <div className="content">Are you sure you want to delete this user?</div>
                                            <div className="actions">
                                                <button className="button-popup" onClick={(event) => this.deleteUser(event)}>YES</button>
                                                <button className="button-popup" onClick={() => close()}>NO</button>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                            </Button>
                            <Button size="small" variant="outlined" onClick={this.goToUserList}>BACK TO USER LIST</Button>
                        </div>
                        {/* </CardActions>
                    </Card> */}
                {/* </Grid> */}
                <TeacherTaskList id="Button"/>
                <StudentList id="Button"/>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(putReduxStateOnProps)(UserDetailPage));