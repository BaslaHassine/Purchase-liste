import React from 'react';
import $ from 'jquery';
import axios from 'axios';



class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      users: [],
      first: "",
      last: ""
    }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    $.ajax({
      url: '/users', 
      success: (users) => {
        this.setState({
          users: users
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

 async submit() {
    const {users, first, last} = this.state;
    for(var i = 0; i < users; i++){
      if(first == users[i].firstname){
        alert("This name is alerady exist\Try another name")
      } else { try {
      const resp = axios.post('/users', first, last)
      console.log(resp)
    }
    catch(err) {console.log(err)}
      }
    }
}

  render () {
    
    return (
      <div className="create">
        <div className="create-editor">
          <h3>Welcome</h3>
          <p>Purchase List is an application that allows you to check prices in supermarkets without even leaving your home and prepare your shopping list, also it allows you to save your purchases so you can check your expenses.</p>
          <h3>LoGiN</h3>
          <form>
          <input className="create-input" type="text" placeholder="First-Name"
                    onChange={(e)=>{this.setState({first: e.target.value})}}> 
          </input>
          <input className="create-input" type="text" placeholder="Last-Name" 
                   onChange={(e)=>{this.setState({last: e.target.value})}}>
          </input>
          <button className="create-submit-button" type="submit" onClick={this.submit}>SuBmIt</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignIn;