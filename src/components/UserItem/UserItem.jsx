import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//styling
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = {

    card: {
        minWidth: 400,
        padding: '0 30px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    paper: {
        height: 50,
        width: 140,
    },
};

class UserItem extends Component {

    goDetail = (event, user) => {
        console.log('clicking to see detail on user:', user);
        this.props.history.push(`/admindetail/${user.id}`)
    }

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper>
                            <CardContent id="userCard">
                                <li>
                                    {this.props.teacher.lastname}, {this.props.teacher.firstname}
                                    <div id="rightButton">
                                        <Button size="small" variant="outlined" key={this.props.teacher.id} onClick={(event) => this.goDetail(event, this.props.teacher)}>view user details</Button>
                                    </div>
                                </li>
                            </CardContent>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withStyles(styles)(withRouter(connect(putReduxStateOnProps)(UserItem)));