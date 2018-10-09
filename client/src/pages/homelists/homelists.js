import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input,  FormBtn } from "../../components/Form";

class Homelists extends Component {
    state = {
        items: []
    };

    componentDidMount() {
        this.loadHomelists();
    }


loadHomelists = () => {
  console.log("Hello")
    API.getAllHomelists()
    .then(res =>{
        this.setState({ homelists: res.data, items: ""})
    }
        )
    .catch(err => console.log(err));
};

deleteHomelists = id => {
    API.deleteHomelists(id)
    .then(res => this.getAllHomelists())
    .catch(err => console.log(err));
};
handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.item) {
      API.saveHomelists({
        items: this.state.items,
        
      })
        .then(res => this.loadHomelists())
        .catch(err => console.log(err));
    }
  };
  render() {
    return (
      <Container fluid>
        {/* <Row>
          <Col size="md-6">
          <Jumbotron style={{display: "block"}}>
              <h1>Home Kit</h1>
          </Jumbotron>
          <form>
              <Input name="item" placeholder="Home Items (required)" />
              
              <FormBtn>Submit Item</FormBtn>
          </form>
          </Col>
          <Col size="md-6">
          
          </Col>
        </Row> */}
          <Col size="md-6">
            <Jumbotron>
              <h1>Home Kit</h1>
            </Jumbotron>
            <form>
              <Input name="item" placeholder="Home Items (required)" />
              
              <FormBtn>Submit Item</FormBtn>
            </form> 
            {this.state.items.length ? (
              <List>
                {this.state.items.map(items => {
                  return (
                    <ListItem key={items._id}>
                      <a href={"/homelists/" + items._id}>
                        
                      </a>
                      <DeleteBtn onClick={() => this.deleteHomelists(items._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
      </Container>
    );
  }
}

export default Homelists;
