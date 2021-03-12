import React, {Component} from 'react';

function PageThroughButton(props) {
   return (
       <button class='ui button' onClick={props.pageThrough}>Page {props.direction}</button>
   ) 
}

export default PageThroughButton;