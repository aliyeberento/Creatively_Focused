import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

class AddSchoolForm extends Component {

    // ONLY VISIBLE TO ISD LEVEL ADMIN AND ABOVE

    state = {
        schoolToAdd: {
            name: '',
            isd_id: ''
        }
    }
    //takes the input value and makes it the new schoolToAdd value
    makeSchool = (event, propertyValue) => {
        console.log('making a new school', this.state.schoolToAdd);
        this.setState({
            //spreading state and having the propertyName be what the user inputs
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
        //brings you back to the home page
        this.props.history.push('/home')
    }

    render() {
        return (
            <div>
                <h1>ADD NEW SCHOOL</h1>
                <form>
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="SCHOOL NAME" 
                            onChange={(event) => this.makeSchool(event, 'name')}
                        />
                    </div>
                    <br />
                    <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>DISTRICT</InputLabel>
                        <Select 
                            label="DISTRICT NUMBER" 
                            name="isd_id" 
                            id="isd_id" 
                            defaultValue="isd_id" 
                            placeholder="isd_id" 
                            value={this.state.schoolToAdd.isd_id}
                            onChange={(event) => this.makeSchool(event, 'isd_id')}>
                                {this.props.state.districtReducer.map(isd => {
                                    return (
                                        <MenuItem 
                                            id="MenuItem" 
                                            value={isd.id} 
                                            key={isd.id}>
                                            {isd.state} - {isd.city} - {isd.isd}
                                        </MenuItem>
                                    )})}
                        </Select>
                        </FormControl>
                    </div><br />
                    <div id="Button"><Button variant="contained" onClick={this.submitSchool}>ADD SCHOOL</Button></div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
});

export default withRouter(connect(mapStateToProps)(AddSchoolForm));