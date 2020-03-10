import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class StudentItem extends Component {

    // directs the user to a detailed view of the item they just clicked on
    goDetail = (event, student) => {
        //THIS IS GOING TO NEED TO BE CHANGED
        this.props.history.push(`/studentdetail/${student.id}`)
    }

    render() {
        // if the user is logged in
        // if (this.props.reduxState.user.username) {
            return (
                <div className="studentCard">
                {/* <Card>
                    <CardContent> */}
                        <div>
                            <li>
                                <p>{this.props.student.lastname}, {this.props.student.firstname}</p>
                            </li>
                        </div>
                    {/* </CardContent>
                </Card> */}
                </div>
            )
        // if the user is not logged in
        // } else {
        //     return (
        //         <div className="studentCard">
        //         <Card>
        //             <CardContent>
        //                 <div>
        //                     <li>
        //                         <h3>{this.props.opp.name}</h3>
        //                         <img src={this.props.opp.image_url} alt={this.props.opp.name} height="65"></img>
        //                         <p>{this.props.opp.description}</p>
        //                         <Button variant="contained" key={this.props.opp.id} onClick={(event) => this.goDetail(event, this.props.opp)}>see more</Button>
        //                     </li>
        //                 </div>
        //             </CardContent>
        //         </Card>
        //         </div>
        //     )
        // }
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(putReduxStateOnProps)(StudentItem));