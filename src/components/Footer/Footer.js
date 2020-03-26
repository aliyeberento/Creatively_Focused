import React from 'react';
import './Footer.css'
import sparkle from './shapes-07.png';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <footer id="container"> 
    <div id="box1">
      <img src={sparkle} alt="sparkle" />
    </div>
    <div id="box2">
      <div><strong>JOIN OUR <a href="https://creativelyfocused.us17.list-manage.com/subscribe?u=c25de0603d9b92d4309d5b8a4&id=93bd1cfd94" id="social"><strong>NEWSLETTER</strong></a></strong></div>
      <div><strong>FOLLOW US <a href="https://www.instagram.com/creatively.focused/" id="social"><strong>@CREATIVELY.FOCUSED</strong></a></strong></div>
     &copy; Creatively Focused
    </div>
    <div id="box3">
      <img src={sparkle} alt="sparkle" />
    </div>
    <div>
      </div>
  </footer>
);

export default Footer;
