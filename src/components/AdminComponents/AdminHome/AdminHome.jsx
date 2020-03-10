import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './AdminHome.css';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class AdminHome extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TEACHER' });
    }

    editBtn = () => {
        console.log('view button clicked')
    }

    addBtn = () => {
        console.log('add user button clicked')
    }
    render() {
        return (
            <div>
                <h3>Hi, {this.props.store.teacher.name}</h3>
                <>
                    <ul>
                        {this.props.store.teacher.map((teacher) => {
                            return <ul key={teacher.id}>
                                <li>{teacher.username} {teacher.phone}</li>          
                                <br />                      
                                <button onClick={() => this.detailsBtn(teacher.id)}>View Details</button>
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