import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminDetail.css';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class AdminDetail extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_TEACHER_DETAIL',
            payload: this.props.match.params.id
        })
    }

    editBtn = () => {
        console.log('edit button clicked')
    }

    deleteBtn = () => {
        console.log('delete button clicked')
    }
    render() {
        return (
            <div>
                <button onClick={this.editBtn}>Edit</button>
                <button onClick={this.deleteBtn}>Delete</button>
                <h3>Add/Edit User Page</h3>
                <h5>Name:</h5>
                <h5>School:</h5>
                <h5>Disctrict:</h5>
               
               <table>
                   <thead>
                       <tr>
                           <td>Complete</td>
                           <td>Date</td>
                           <td>User Deadlines</td>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>checkbox</td>
                           <td>03/12/2020</td>
                           <td>Annual IEP</td>
                       </tr>
                   </tbody>
               </table>

            </div>
        )
    }
}

export default connect()(AdminDetail);