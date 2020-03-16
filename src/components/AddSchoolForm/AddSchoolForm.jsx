import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddSchoolForm extends Component {

    // ONLY VISIBLE TO ISD LEVEL ADMIN

    state = {
        districtToAdd: {
            name: '',
            district: ''
        }
    }

    render () {
        return (
            <div>
                <label>School Name: 
                <input></input></label>
                <label>School District: (dynamic)<select><option></option></select></label>
                <button>Add School</button>
            </div>
        )
    }
}

export default withRouter(connect()(AddSchoolForm));