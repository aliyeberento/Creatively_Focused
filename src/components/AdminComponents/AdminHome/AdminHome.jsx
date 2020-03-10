import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './AdminHome.css';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class AdminHome extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TEACHERS' });
    }

    editBtn = (event, teacher) => {
        console.log('view button clicked', teacher.id)
        // this.props.dispatch({
        //     type: 'GET_TEACHER_DETAIL'
        // })
        this.props.history.push(`/admindetail/${teacher.id}`)
    }

    addBtn = () => {
        console.log('add user button clicked')
    }
    render() {
        return (
            <div>
                <h3>Hi, {this.props.store.teacher.username}</h3>
                <>
                    <ul>
                        {this.props.store.teacher.map((teacher) => {
                            return <ul key={teacher.id}>
                                <li>{teacher.username} {teacher.phone}</li>          
                                <br />                      
                                <button key = {teacher.id} onClick={(event) => this.editBtn(event, teacher)}>View Details</button>
                            </ul>
                        }
                        )}
                    </ul>
                </>

            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    store
});


export default withRouter(connect(mapStateToProps)(AdminHome));