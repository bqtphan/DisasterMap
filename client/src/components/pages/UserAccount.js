import React, { Component } from "react";


class UserAccount extends Component {
  // Setting the component's initial state
  state = {
    Name: "",
    Password: "",
    Zipcode: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    // alert(`Hello ${this.state.firstName} ${this.state.lastName}`);
    // this.setState({
    //   firstName: "",
    //   lastName: ""
    // });
  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div className="container">
        <p>
          Welcome {this.state.Name} 
        </p>
        <form className="form">
          <input
            value={this.state.Name}
            name="Name"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Name"
          />
          <input
            value={this.state.Password}
            name="Password"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Password"
          />         
          <input
            value={this.state.Zipcode}
            name="Zipcode"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Zipcode"
          />
          <button className="btn waves-effect waves-light" onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserAccount;
