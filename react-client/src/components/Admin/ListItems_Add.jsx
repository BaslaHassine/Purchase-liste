import React from 'react';
import $ from 'jquery';
import axios from 'axios';


class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      item: "",
      price: ""
    }
  }

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

  render () {
     
    return (
    <form>
      <div>
        <imput type="text" placeholder="item"
           onChange={(e)=>{this.setState({item: e.target.value})}}>
        </imput>
        <imput type="text" placeholder="item"
           onChange={(e)=>{this.setState({price: e.target.value})}}>
        </imput>
       <table className="table">
        <thead className="thead-dark">
         <tr>
          <th scope="col">Items</th>
          <th scope="col">Prices</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map(item =>
          <tr key={item.id}>
            <td>{item.item}</td>
            <td>{item.price.toFixed(3)}</td>
          </tr>
          )}
        </tbody>
      </table>
      </div>
    </form>
    )
  }
}

export default Admin;