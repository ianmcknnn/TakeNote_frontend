import React, { Component } from 'react';
import PageContent from './PageContent.js';
import PageThroughButton from './PageThroughButton.js';
import NewPageButton from './NewPageButton.js';
import LabelForm from './LabelForm.js';

class PageContainer extends Component {


    render() {
        return (
            <div>

                <PageContent savePage={this.props.savePage} currentPage={this.props.getCurrentPage} formChangeHandler={this.props.formChangeHandler} />
                <br></br>
                <div class='ui grid'>

                    <div class='two wide column'>

                        <PageThroughButton class='ui button' direction='Back <<' pageThrough={this.props.pageBack} disabled={this.props.pageBackDisabled} />
                    </div>
                    <div class='two wide column'>

                        <NewPageButton class='ui button' newPage={this.props.newPage} />
                    </div>
                    <div class='two wide column'>

                        <PageThroughButton class='ui button' direction='Forward >>' pageThrough={this.props.pageForward} disabled={this.props.pageForwardDisabled} />
                    </div>

                </div>
                <LabelForm addLabel={this.props.addLabel} />

            </div>
        )
    }



}


export default PageContainer;