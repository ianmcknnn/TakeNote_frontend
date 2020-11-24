import React, { Component } from 'react';

class PageContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pageNumber: -1,
            pageLabel: null,
            pageContent: null,
            err: null,
            isLoading: false,
        }
    }

    componentDidMount() {
        this.setState({ pageNumber: this.props.pageNumber, pageLabel: this.props.pageLabel })
        let api_url = 'http://localhost:3000/pages'

        fetch(api_url)
            .then(res => {
                if(res.status >= 400) {
                    throw new Error("Server responds with error!");
                }
                return res.json();
            })
            .then(pageData => {
                this.setState({pageNumber: pageData.pageNumber, 
                    pageLabel: pageData.pageLabel,
                    pageContent: pageData.pageContent,
                    isLoading: true})
            },
            err => {
                this.setState(
                    {err,
                    isLoading: false}
                )
            });
    }


    render() {
            let {pageContent, err, isLoading} = this.state;
            if(err){
                return(
                    <div>{ err.message }</div>
                )
            }
            if(isLoading){
                return(
                    <div>"Loading..."</div>
                )
            }
            return(
                <textarea name='JournalPage' rows='30' columns='90'>{ pageContent }</textarea>
            )

    }
}


export default PageContent;