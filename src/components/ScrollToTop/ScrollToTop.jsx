import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// This component serves as a wrapper for the Router links on in App.js
// It promts a new component to start at the top of the page

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }
  
    render() {
      return this.props.children
    }
  }
  
  export default withRouter(ScrollToTop)