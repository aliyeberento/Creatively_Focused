import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddDistrictForm extends Component {

    // ONLY VISIBLE TO CF LEVEL ADMIN

    state = {
        districtToAdd: {
            city: '',
            isd: '',
            state: ''
        }
    }

    makeDistrict = (event, propertyValue) => {
        console.log('making a new district', this.state.districtToAdd);
        this.setState({
            districtToAdd: {
                ...this.state.districtToAdd,
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
        });
        this.props.history.push('/home')
    }

    render() {
        return (
            <div>
                <form>
                    <label>District City:
                    <input onChange={(event) => this.makeDistrict(event, 'city')}></input></label><br />
                    <label>District Number:
                    <input onChange={(event) => this.makeDistrict(event, 'isd')}></input></label><br />

                    {/* THIS WILL BE A SELECT WITH 50 HARDCODED STATE OPTIONS */}

                    <label>District State:
                    <input onChange={(event) => this.makeDistrict(event, 'state')}></input></label><br />
                    <button type="submit" onClick={this.submitDistrict}>Add District</button>
                </form>
            </div>
        )
    }
}

export default withRouter(connect()(AddDistrictForm));