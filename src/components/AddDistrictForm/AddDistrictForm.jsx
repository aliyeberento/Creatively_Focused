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
                    {/* <input onChange={(event) => this.makeDistrict(event, 'state')}></input> */}
                    <select>
                        <option>Choose one...</option>
                        <option value="AL" onChange={(event) => this.makeDistrict(event, 'state')}>Alabama</option>
                        <option value="AK" onChange={(event) => this.makeDistrict(event, 'state')}>Alaska</option>
                        <option value="AZ" onChange={(event) => this.makeDistrict(event, 'state')}>Arizona</option>
                        <option value="AR" onChange={(event) => this.makeDistrict(event, 'state')}>Arkansas</option>
                        <option value="CA" onChange={(event) => this.makeDistrict(event, 'state')}>California</option>
                        <option value="CO" onChange={(event) => this.makeDistrict(event, 'state')}>Colorado</option>
                        <option value="CT" onChange={(event) => this.makeDistrict(event, 'state')}>Connecticut</option>
                        <option value="DE" onChange={(event) => this.makeDistrict(event, 'state')}>Delaware</option>
                        <option value="FL" onChange={(event) => this.makeDistrict(event, 'state')}>Florida</option>
                        <option value="GA" onChange={(event) => this.makeDistrict(event, 'state')}>Georgia</option>
                        <option value="HI" onChange={(event) => this.makeDistrict(event, 'state')}>Hawaii</option>
                        <option value="ID" onChange={(event) => this.makeDistrict(event, 'state')}>Idaho</option>
                        <option value="IL" onChange={(event) => this.makeDistrict(event, 'state')}>Illinois</option>
                        <option value="IN" onChange={(event) => this.makeDistrict(event, 'state')}>Indiana</option>
                        <option value="IA" onChange={(event) => this.makeDistrict(event, 'state')}>Iowa</option>
                        <option value="KS" onChange={(event) => this.makeDistrict(event, 'state')}>Kansas</option>
                        <option value="KY" onChange={(event) => this.makeDistrict(event, 'state')}>Kentucky</option>
                        <option value="LA" onChange={(event) => this.makeDistrict(event, 'state')}>Louisiana</option>
                        <option value="ME" onChange={(event) => this.makeDistrict(event, 'state')}>Maine</option>
                        <option value="MD" onChange={(event) => this.makeDistrict(event, 'state')}>Maryland</option>
                        <option value="MA" onChange={(event) => this.makeDistrict(event, 'state')}>Massachusetts</option>
                        <option value="MI" onChange={(event) => this.makeDistrict(event, 'state')}>Michigan</option>
                        <option value="MN" onChange={(event) => this.makeDistrict(event, 'state')}>Minnesota</option>
                        <option value="MS" onChange={(event) => this.makeDistrict(event, 'state')}>Mississippi</option>
                        <option value="MO" onChange={(event) => this.makeDistrict(event, 'state')}>Missouri</option>
                        <option value="MT" onChange={(event) => this.makeDistrict(event, 'state')}>Montana</option>
                        <option value="NE" onChange={(event) => this.makeDistrict(event, 'state')}>Nebraska</option>
                        <option value="NV" onChange={(event) => this.makeDistrict(event, 'state')}>Nevada</option>
                        <option value="NH" onChange={(event) => this.makeDistrict(event, 'state')}>New Hampshire</option>
                        <option value="NJ" onChange={(event) => this.makeDistrict(event, 'state')}>New Jersey</option>
                        <option value="NM" onChange={(event) => this.makeDistrict(event, 'state')}>New Mexico</option>
                        <option value="NY" onChange={(event) => this.makeDistrict(event, 'state')}>New York</option>
                        <option value="NC" onChange={(event) => this.makeDistrict(event, 'state')}>North Carolina</option>
                        <option value="ND" onChange={(event) => this.makeDistrict(event, 'state')}>North Dakota</option>
                        <option value="OH" onChange={(event) => this.makeDistrict(event, 'state')}>Ohio</option>
                        <option value="OK" onChange={(event) => this.makeDistrict(event, 'state')}>Oklahoma</option>
                        <option value="OR" onChange={(event) => this.makeDistrict(event, 'state')}>Oregon</option>
                        <option value="PA" onChange={(event) => this.makeDistrict(event, 'state')}>Pennsylvania</option>
                        <option value="RI" onChange={(event) => this.makeDistrict(event, 'state')}>Rhode Island</option>
                        <option value="SC" onChange={(event) => this.makeDistrict(event, 'state')}>South Carolina</option>
                        <option value="SD" onChange={(event) => this.makeDistrict(event, 'state')}>South Dakota</option>
                        <option value="TN" onChange={(event) => this.makeDistrict(event, 'state')}>Tennessee</option>
                        <option value="TX" onChange={(event) => this.makeDistrict(event, 'state')}>Texas</option>
                        <option value="UT" onChange={(event) => this.makeDistrict(event, 'state')}>Utah</option>
                        <option value="VT" onChange={(event) => this.makeDistrict(event, 'state')}>Vermont</option>
                        <option value="VA" onChange={(event) => this.makeDistrict(event, 'state')}>Virginia</option>
                        <option value="WA" onChange={(event) => this.makeDistrict(event, 'state')}>Washington</option>
                        <option value="WV" onChange={(event) => this.makeDistrict(event, 'state')}>West Virginia</option>
                        <option value="WI" onChange={(event) => this.makeDistrict(event, 'state')}>Wisconsin</option>
                        <option value="WY" onChange={(event) => this.makeDistrict(event, 'state')}>Wyoming</option>
                    </select>
                    </label><br />
                    <button type="submit" onClick={this.submitDistrict}>Add District</button>
                </form>
            </div>
        )
    }
}

export default withRouter(connect()(AddDistrictForm));