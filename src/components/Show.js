import React, { Component } from 'react';
import firebase from '../config/db';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customer: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('customers').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          customer: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        //console.log("fe error ..");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('customers').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          
            <h3 class="panel-firstName">
              {this.state.customer.firstName}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Last Name:</dt>
              <dd>{this.state.customer.lastName}</dd>
              <dt>Job:</dt>
              <dd>{this.state.customer.job}</dd>
            </dl>
            <Link to={`/Edit/${this.state.key}`} class="btn btn-success">Update</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;