import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './config/db';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('customers');
    this.unsubscribe = null;
    this.state = {
      customers: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const customers = [];
    querySnapshot.forEach((doc) => {
      const { firstName, lastName, job } = doc.data();
      customers.push({
        key: doc.id,
        doc, 
        firstName,
        lastName,
        job,
      });
    });
    this.setState({
      customers
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-firstName">
              CRUD Operations using React JS But This Time i Added Routes
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">Create Customer</Link></h4>
            <div class="card-body">
              <tbody>
                {this.state.customers.map(customer =>
                  <tr>
                    <h6 className="card-firstName"><Link to={`/show/${customer.key}`}>{customer.firstName}</Link></h6>
                    <h6>{customer.lastName}</h6>
                    <h6>{customer.job}</h6>
                  </tr>
                )}
              </tbody>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;