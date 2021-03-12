import React, { Component } from 'react';

class LabelBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        }
    }

    render() {
        console.log(this.props.labels)
        return (
            <div id='labelsContainer'>
                <h2 class='ui title'>
                    Jump to a page
                </h2>
                {this.props.labels.map(label => (label === '') ? null : <ul><button class='ui black basic button' id='labelButton' Click={() => this.jumpToLabel(label)}>{label}</button></ul>)}   
            </div>
        )
    }

    jumpToLabel(label) {
        console.log(label);
        this.props.jumpToLabel(label);
    }


//    componentDidMount() {
//        let api_url = 'http://localhost:3000/pages';
//
//        fetch(api_url)
//            .then(res => {
//                if (res.status >= 400) {
//                    throw new Error('Server responds with error');
//                }
//                else {
//                    return res.json();
//                }
//            })
//            .then(
//                pages => {
//                    let labelArray = [];
//                    pages.foreach(page => {
//                        labelArray.push(page.label);
//                    })    
//
//                    this.setState({
//                        labels: labelArray,
//                    });
//                }
//
//            )
//    }

}


export default LabelBox;