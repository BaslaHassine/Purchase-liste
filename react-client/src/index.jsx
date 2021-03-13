import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Admin from './components/Admin/ListItems_Add.jsx';
import SignIn from './components/SignIn.jsx'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      view : "signIn",
      items: []
    };
  };

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (items) => {
        this.setState({
          items: items
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  changeView(option) {
    this.setState({view: option})}

  renderView() {
    const {view} = this.state;
    
    if (view === 'signIn') {
      return <SignIn handleClick={this.changeView}/>
    } else if(view === "Admin") {
      return <Admin blogs={this.state.blogs}/>}
    // }  else if(view === "create") {
    //   return <Create/>
    // } else {
    //   return <Post blog={this.state.currentBlog}/>
    // }
  }; 

  render () {
     
    return (
      <div>
      <div className="nav">
        <span className="logo"
          onClick={() => this.changeView('purchase')}>
          PuRcHaSe-LiSt
        </span>
        <span className={this.state.view === 'signIn' 
          ? 'nav-unselected'
          : 'nav-selected'}
          onClick={() => this.changeView('feed')}>
        </span>
        <span className="nav-unselected" onClick={() => this.changeView("create")}>
          Purchase History
        </span>
        <span className="nav-unselected" onClick={() => this.changeView("Admin")}> 
          Admin
        </span>
      </div>

      <div className="main">
        {this.renderView()}
      </div>
    </div>
    )
  };
};

ReactDOM.render(<App />, document.getElementById('app'));