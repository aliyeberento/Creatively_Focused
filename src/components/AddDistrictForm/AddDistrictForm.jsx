import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddDistrictForm extends Component {

    // ONLY VISIBLE TO CF LEVEL ADMIN

    state = {
        districtToAdd: {
            city: '',
            number: '',
            state: ''
        }
    }

    makeDistrict = (event, propertyValue) => {
        console.log('making a new district', this.state.districtToAdd);
        this.setState({
            districtToAdd: {
                ...this.state.studentToAdd,
                [propertyValue]: event.target.value
            }
        })
    }

    submitDistrict = () => {
        console.log('submitting a new district', this.state.districtToAdd);
        // event.preventDefault()
        console.log('submitting:', this.state.districtToAdd)
        // this should dispatch an action
        // and then use withRouter to push history to teacher list
        // or this new user's detail
        this.props.dispatch({
            type: 'ADD_DISTRICT',
            payload: this.state.districtToAdd
        })
    }

    render () {
        return (
            <div>
                <label>District Name: 
                <input onChange={(event) => this.makeDistrict(event, 'city')}></input></label>
                <label>District Number: 
                <input onChange={(event) => this.makeDistrict(event, 'number')}></input></label>
                <label>State: 
                <input onChange={(event) => this.makeDistrict(event, 'state')}></input></label>
                <button onClick={this.submitDistrict}>Add District</button>
            </div>
        )
    }
}

export default withRouter(connect()(AddDistrictForm));