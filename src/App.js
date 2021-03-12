import './App.css';
import React, { Component } from 'react';
import PageContainer from './PageContainer.js';
import LabelBox from './LabelBox.js';
//import UseModal from './UseModal.js';
//import Modal from './Modal.js';

class App extends Component {
  api_url = 'http://localhost:3000/';

  constructor() {
    super();
    this.state = {
      pages: [],
      currentPage: 0,
      loggedIn: false,
    }

  }

  componentDidMount() {
    this.loadPages();

  }

  savePage = (event) => {
    let page = this.state.pages[this.state.currentPage];
    event.preventDefault();
    fetch(this.api_url + 'pages/' + page.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pageText: event.target.journalPage.value, label: page.label, journalId: 5, userId: 5 })


    })
      .then(response => response.json())
  }

  editPage = (event) => {
    event.preventDefault();
    fetch(this.api_url + 'pages/' + this.state.pages[this.state.currentPage].id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pageText: event.target.journalPage.value, journalId: 3, userId: 3 })
    })
      .then(response => response.json())

  }

  loadPages() {
    fetch(this.api_url + 'pages')
      .then(res => res.json())
      .then(pages => this.setState({ pages: pages, currentPage: pages[0].pageNumber }));


  }

  render() {
    return (
      this.state.loggedIn ?
        <div id='outerContainer'>

          <div className="App">
            <header className="App-header" id='appContainer'>
              <div class='ui grid'>
                <div class='one wide column'></div>

                <div class='three wide column' id='labelContainer'>

                  <LabelBox labels={this.state.pages.map(page => page.label)} jumpToLabel={this.jumpToLabel} />
                </div>
                <div class='nine wide column'>

                  <PageContainer savePage={this.editPage} getCurrentPage={this.getCurrentPage()} pageBack={this.pageBack} pageForward={this.pageForward}
                    formChangeHandler={this.formChangeHandler} newPage={this.newPage} addLabel={this.addLabel} />
                </div>
                <div class='one wide column'>
                  <button class='ui grey basic button' onClick={() => {this.setState({loggedIn: false})}}>Logout</button>
                </div>
              </div>

              {/*          <Modal isVisible={isVisible} hideModal={toggleModal}/>*/}
            </header>
          </div>
        </div>
        :
        <div>
          <div class='ui container' id='loginContainer'>
            <h1 class='title'> TakeNote</h1>
            <h2>Login</h2>
            <form class='ui form'>
              <br></br>
              <div class='field'>
                <label>Username</label>
                <input type='text' name='username'></input>
              </div>
              <div class='field'>

                <label>Password</label>
                <input type='text' name='password'></input>
              </div>
              <button class='ui button' onClick={() => { this.setState({ loggedIn: true }) }}>Enter</button>
            </form>

          </div>
        </div>
    );
  }

  pageBack = () => {
    if (this.state.currentPage > 0) {
      this.setState({ currentPage: this.state.currentPage - 1 })
    }
  }

  pageForward = () => {
    console.log(this.state.currentPage)
    if (this.state.currentPage < this.state.pages.length - 1) {
      this.setState({ currentPage: this.state.currentPage + 1 })
    }
  }

  getCurrentPage = () => {
    let page = this.state.pages[this.state.currentPage];
    return page && page.pageContent;
  }

  formChangeHandler = (formValue) => {
    let pages = this.state.pages;
    pages[this.state.currentPage].pageContent = formValue;
    this.setState({ pages: pages });

  }

  newPage = (event) => {
    fetch(this.api_url + 'pages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageText: '', journalId: 5, userId: 5 })
      })
      .then(response => response.json())
      .then(page => {
        this.setState({ pages: [...this.state.pages, page], currentPage: this.state.pages.length })
      })

  }

  addLabel = (event) => {
    event.preventDefault();
    let page = this.state.pages[this.state.currentPage];
    let label = event.target.labelMaker.value;
    let pages = this.state.pages;
    pages[this.state.currentPage].label = label;

    this.setState({ pages: pages });

    fetch(this.api_url + 'pages/' + page.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pageContent: page.pageContent, label: label, journalId: 5, userId: 5 })


    })
      .then(response => response.json())
  }

  jumpToLabel = (label) => {
    let page = this.state.pages.find(page => page.label == label);
    this.setState({ currentPage: page.pageNumber })
  }
}



export default App;
