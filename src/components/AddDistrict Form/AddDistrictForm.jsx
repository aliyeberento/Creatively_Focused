import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddDistrictForm extends Component {

    // ONLY VISIBLE TO CF LEVEL ADMIN

    state = {
        districtToAdd: {
            name: '',
            number: '',
            state: ''
        }
    }

    render () {
        return (
            <div>
                <label>District Name: 
                <input></input></label>
                <label>District Number: 
                <input></input></label>
                <label>State: 
                <input></input></label>
                <button>Add District</button>
            </div>
        )
    }
}

export default withRouter(connect()(AddDistrictForm));