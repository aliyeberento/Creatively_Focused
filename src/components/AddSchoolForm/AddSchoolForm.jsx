import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddSchoolForm extends Component {

    // ONLY VISIBLE TO ISD LEVEL ADMIN

    state = {
        schoolToAdd: {
            city: '',
            district: ''
        }
    }

    makeSchool = (event, propertyValue) => {
        console.log('making a new school', this.state.schoolToAdd);
        this.setState({
            schoolToAdd: {
                ...this.state.studentToAdd,
                [propertyValue]: event.target.value
            }
        })
    }

    submitSchool = () => {
        console.log('submitting a new school', this.state.schoolToAdd);
        // event.preventDefault()
        console.log('submitting:', this.state.schoolToAdd)
        // this should dispatch an action
        // and then use withRouter to push history to teacher list
        // or this new user's detail
        this.props.dispatch({
            type: 'ADD_SCHOOL',
            payload: this.state.schoolToAdd
        })
    }

    render () {
        return (
            <div>
                <label>School Name: 
                <input onChange={(event) => this.makeDistrict(event, 'city')}></input></label>

                {/* <label>School District: 
                    <select>
                        <option></option>
                    </select></label> */}

                    <select name="district" id="district" defaultValue="district" placeholder="district" onChange={(event) => this.makeNewPet(event, 'district')}>School District: 
                    {this.props.state.districtReducer.map(district => {
                        return (
                            <option value={district.id} key={district.id}>{district.name} - {district.isd}</option>
                        )})}
                </select>

                <button onClick={this.submitSchool}>Add School</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
});

export default withRouter(connect(mapStateToProps)(AddSchoolForm));