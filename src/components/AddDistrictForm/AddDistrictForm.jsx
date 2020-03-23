import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

class AddDistrictForm extends Component {

    // ONLY VISIBLE TO CF LEVEL ADMIN

    state = {
        districtToAdd: {
            city: '',
            isd: '',
            state: ''
        }
    }

    //takes the input value and makes it the new districtToAdd value
    makeDistrict = (event, propertyValue) => {
        console.log('making a new district', this.state.districtToAdd);
        this.setState({
            districtToAdd: {
                //spreading state and having the propertyName be what the user inputs
                ...this.state.districtToAdd,
                [propertyValue]: event.target.value
            }
        })
    }
    
    //takes the input value and makes it the new isd number
    makeDistrictInt = (event, propertyValue) => {
        console.log('making a new district', this.state.districtToAdd);
        this.setState({
            //spreading state and having the propertyName be what the user inputs
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
            // dispatch calls 'ADD_DISTRICT' which'll take 
            //local state and send it to redux/database
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
                <div id="TextField">
                        <TextField 
                            type="text" 
                            label="DISTRICT CITY" 
                            onChange={(event) => this.makeDistrict(event, 'city')} />
                    </div>
                    <br />
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="DISTRICT NUMBER" 
                            onChange={(event) => this.makeDistrictInt(event, 'isd')} />
                    </div>
                    <br />
                    <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>DISTRICT STATE</InputLabel>
                        <Select 
                            label="DISTRICT STATE" 
                            name="state"
                            id="state" 
                            placeholder="state" 
                            value={this.state.districtToAdd.state}
                            onChange={(event) => this.makeDistrict(event, 'state')}>
                            <MenuItem value="AL">Alabama</MenuItem>
                            <MenuItem value="AK">Alaska</MenuItem>
                            <MenuItem value="AZ">Arizona</MenuItem>
                            <MenuItem value="AR">Arkansas</MenuItem>
                            <MenuItem value="CA">California</MenuItem>
                            <MenuItem value="CO">Colorado</MenuItem>
                            <MenuItem value="CT">Connecticut</MenuItem>
                            <MenuItem value="DE">Delaware</MenuItem>
                            <MenuItem value="FL">Florida</MenuItem>
                            <MenuItem value="GA">Georgia</MenuItem>
                            <MenuItem value="HI">Hawaii</MenuItem>
                            <MenuItem value="ID">Idaho</MenuItem>
                            <MenuItem value="IL">Illinois</MenuItem>
                            <MenuItem value="IN">Indiana</MenuItem>
                            <MenuItem value="IA">Iowa</MenuItem>
                            <MenuItem value="KS">Kansas</MenuItem>
                            <MenuItem value="KY">Kentucky</MenuItem>
                            <MenuItem value="LA">Louisiana</MenuItem>
                            <MenuItem value="ME">Maine</MenuItem>
                            <MenuItem value="MD">Maryland</MenuItem>
                            <MenuItem value="MA">Massachusetts</MenuItem>
                            <MenuItem value="MI">Michigan</MenuItem>
                            <MenuItem value="MN">Minnesota</MenuItem>
                            <MenuItem value="MS">Mississippi</MenuItem>
                            <MenuItem value="MO">Missouri</MenuItem>
                            <MenuItem value="MT">Montana</MenuItem>
                            <MenuItem value="NE">Nebraska</MenuItem>
                            <MenuItem value="NV">Nevada</MenuItem>
                            <MenuItem value="NH">New Hampshire</MenuItem>
                            <MenuItem value="NJ">New Jersey</MenuItem>
                            <MenuItem value="NM">New Mexico</MenuItem>
                            <MenuItem value="NY">New York</MenuItem>
                            <MenuItem value="NC">North Carolina</MenuItem>
                            <MenuItem value="ND">North Dakota</MenuItem>
                            <MenuItem value="OH">Ohio</MenuItem>
                            <MenuItem value="OK">Oklahoma</MenuItem>
                            <MenuItem value="OR">Oregon</MenuItem>
                            <MenuItem value="PA">Pennsylvania</MenuItem>
                            <MenuItem value="RI">Rhode Island</MenuItem>
                            <MenuItem value="SC">South Carolina</MenuItem>
                            <MenuItem value="SD">South Dakota</MenuItem>
                            <MenuItem value="TN">Tennessee</MenuItem>
                            <MenuItem value="TX">Texas</MenuItem>
                            <MenuItem value="UT">Utah</MenuItem>
                            <MenuItem value="VT">Vermont</MenuItem>
                            <MenuItem value="VA">Virginia</MenuItem>
                            <MenuItem value="WA">Washington</MenuItem>
                            <MenuItem value="WV">West Virginia</MenuItem>
                            <MenuItem value="WI">Wisconsin</MenuItem>
                            <MenuItem value="WY">Wyoming</MenuItem>
                        </Select>
                        </FormControl>
                    </div><br />
                    <div id="Button">
                        <Button 
                            variant="contained" 
                            onClick={this.submitDistrict}
                            >ADD DISTRICT
                        </Button>
                    </div>
                    {/* <label>District City:
                    <input onChange={(event) => this.makeDistrict(event, 'city')}></input></label><br />
                    <label>District Number:
                    <input onChange={(event) => this.makeDistrictInt(event, 'isd')}></input></label><br />
                    <label>District State:
                    <select name="state" onChange={(event) => this.makeDistrict(event, 'state')}>
                            <MenuItem>Choose one...</MenuItem>
                            <MenuItem value="AL">Alabama</MenuItem>
                            <MenuItem value="AK">Alaska</MenuItem>
                            <MenuItem value="AZ">Arizona</MenuItem>
                            <MenuItem value="AR">Arkansas</MenuItem>
                            <MenuItem value="CA">California</MenuItem>
                            <MenuItem value="CO">Colorado</MenuItem>
                            <MenuItem value="CT">Connecticut</MenuItem>
                            <MenuItem value="DE">Delaware</MenuItem>
                            <MenuItem value="FL">Florida</MenuItem>
                            <MenuItem value="GA">Georgia</MenuItem>
                            <MenuItem value="HI">Hawaii</MenuItem>
                            <MenuItem value="ID">Idaho</MenuItem>
                            <MenuItem value="IL">Illinois</MenuItem>
                            <MenuItem value="IN">Indiana</MenuItem>
                            <MenuItem value="IA">Iowa</MenuItem>
                            <MenuItem value="KS">Kansas</MenuItem>
                            <MenuItem value="KY">Kentucky</MenuItem>
                            <MenuItem value="LA">Louisiana</MenuItem>
                            <MenuItem value="ME">Maine</MenuItem>
                            <MenuItem value="MD">Maryland</MenuItem>
                            <MenuItem value="MA">Massachusetts</MenuItem>
                            <MenuItem value="MI">Michigan</MenuItem>
                            <MenuItem value="MN">Minnesota</MenuItem>
                            <MenuItem value="MS">Mississippi</MenuItem>
                            <MenuItem value="MO">Missouri</MenuItem>
                            <MenuItem value="MT">Montana</MenuItem>
                            <MenuItem value="NE">Nebraska</MenuItem>
                            <MenuItem value="NV">Nevada</MenuItem>
                            <MenuItem value="NH">New Hampshire</MenuItem>
                            <MenuItem value="NJ">New Jersey</MenuItem>
                            <MenuItem value="NM">New Mexico</MenuItem>
                            <MenuItem value="NY">New York</MenuItem>
                            <MenuItem value="NC">North Carolina</MenuItem>
                            <MenuItem value="ND">North Dakota</MenuItem>
                            <MenuItem value="OH">Ohio</MenuItem>
                            <MenuItem value="OK">Oklahoma</MenuItem>
                            <MenuItem value="OR">Oregon</MenuItem>
                            <MenuItem value="PA">Pennsylvania</MenuItem>
                            <MenuItem value="RI">Rhode Island</MenuItem>
                            <MenuItem value="SC">South Carolina</MenuItem>
                            <MenuItem value="SD">South Dakota</MenuItem>
                            <MenuItem value="TN">Tennessee</MenuItem>
                            <MenuItem value="TX">Texas</MenuItem>
                            <MenuItem value="UT">Utah</MenuItem>
                            <MenuItem value="VT">Vermont</MenuItem>
                            <MenuItem value="VA">Virginia</MenuItem>
                            <MenuItem value="WA">Washington</MenuItem>
                            <MenuItem value="WV">West Virginia</MenuItem>
                            <MenuItem value="WI">Wisconsin</MenuItem>
                            <MenuItem value="WY">Wyoming</MenuItem>
                        </select>
                    </label><br />
                    <button type="submit" onClick={this.submitDistrict}>Add District</button> */}
                </form>
            </div>
        )
    }
}

export default withRouter(connect()(AddDistrictForm));