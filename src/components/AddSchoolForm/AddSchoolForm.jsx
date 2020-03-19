import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddSchoolForm extends Component {

    // ONLY VISIBLE TO ISD LEVEL ADMIN AND ABOVE

    state = {
        schoolToAdd: {
            name: '',
            isd_id: 0
        }
    }
//takes the input value and makes it the new schoolToAdd value
    makeSchool = (event, propertyValue) => {
        console.log('making a new school', this.state.schoolToAdd);
        this.setState({
            schoolToAdd: {
                ...this.state.schoolToAdd,
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
        this.props.history.push('/home')
    }

    render () {
        return (
            <div>
                <h1>ADD NEW SCHOOL</h1>
                <form>
                <label>School Name: 
                    <input onChange={(event) => this.makeSchool(event, 'name')}></input></label><br />
                        <select name="isd_id" id="isd_id" defaultValue="isd_id" placeholder="isd_id" onChange={(event) => this.makeSchool(event, 'isd_id')}>School District: 
                            <option>Choose one...</option>
                            {this.props.state.districtReducer.map(isd => {
                            return (
                                <option value={isd.id} key={isd.id}>{isd.city}, {isd.state} - {isd.isd}</option>
                            )})}
                        </select><br />
                <button type="button" onClick={this.submitSchool}>Add School</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
});

export default withRouter(connect(mapStateToProps)(AddSchoolForm));