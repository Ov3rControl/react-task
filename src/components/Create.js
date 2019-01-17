import React, { Component } from 'react';
import firebase from '../config/db';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('customers');
    this.state = {
      firstName: '',
      lastName: '',
      job: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, job } = this.state;

    this.ref.add({
      firstName,
      lastName,
      job
    }).then((docRef) => {
      this.setState({
        firstName: '',
        lastName: '',
        job: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { firstName, lastName, job } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Create Customer
            </h3>
          </div>
          <div class="panel-body">
         
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" class="form-control" name="firstName" value={firstName} onChange={this.onChange} placeholder="First Name" />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input class="form-control" name="lastName" value={lastName} onChange={this.onChange} placeholder="Last Name" />
              </div>
              <div class="form-group">
                <label for="job">Job:</label>
                <input type="text" class="form-control" name="job" value={job} onChange={this.onChange} placeholder="Job" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;