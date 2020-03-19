import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddDistrictForm extends Component {

    // ONLY VISIBLE TO CF LEVEL ADMIN

    state = {
        districtToAdd: {
            city: '',
            isd: 0,
            state: ''
        }
    }
//takes the input value and makes it the new districtToAdd value
    makeDistrict = (event, propertyValue) => {
        console.log('making a new district', this.state.districtToAdd);
        this.setState({
            districtToAdd: {
                ...this.state.districtToAdd,
                [propertyValue]: event.target.value
            }
        })
    }
//takes the input value and makes it the new isd number
    makeDistrictInt = (event, propertyValue) => {
        console.log('making a new district', this.state.districtToAdd);
        this.setState({
            districtToAdd: {
                ...this.state.districtToAdd,
                [propertyValue]: Number(event.target.value)
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
                <h1>ADD NEW DISTRICT</h1>
                <form>
                    <label>District City:
                    <input onChange={(event) => this.makeDistrict(event, 'city')}></input></label><br />
                    <label>District Number:
                    <input onChange={(event) => this.makeDistrictInt(event, 'isd')}></input></label><br />
                    <label>District State: 
                    <select name="state" onChange={(event) => this.makeDistrict(event, 'state')}>
                        <option>Choose one...</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    </label><br />
                    <button type="submit" onClick={this.submitDistrict}>Add District</button>
                </form>
            </div>
        )
    }
}

export default withRouter(connect()(AddDistrictForm));