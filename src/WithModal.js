import React from 'react';
import {UseModal} from './UseModal.js';

export const WithModalHOC = (Component) => {
    return (props) => {
        const modal = UseModal();
        return <Component modal={modal} {...props}/>
    }
}