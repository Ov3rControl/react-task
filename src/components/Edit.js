import React, { Component } from 'react';
import firebase from '../config/db';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      firstName: '',
      lastName: '',
      job: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('customers').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const customer = doc.data();
        this.setState({
          key: doc.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          job: customer.job
        });
      } else {
        //console.log("erorrrrrrr hnaaa");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({customer:state});
  }

  onSubmit = (e) => {
    e.preventDefault(); // mat3mlsh refresh

    const { firstName, lastName, job } = this.state;

    const updateRef = firebase.firestore().collection('customers').doc(this.state.key);
    updateRef.set({
      firstName,
      lastName,
      job
    }).then((docRef) => {
      this.setState({
        key: '',
        firstName: '',
        lastName: '',
        job: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      //console.error("Error hena ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-firstName">
              Update Data
            </h3>
          </div>
          <div class="panel-body">
        
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" class="form-control" name="firstName" value={this.state.firstName} onChange={this.onChange} placeholder="First Name" />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" class="form-control" name="lastName" value={this.state.lastName} onChange={this.onChange} placeholder="Last Name" />
              </div>
              <div class="form-group">
                <label for="job">Job:</label>
                <input type="text" class="form-control" name="job" value={this.state.job} onChange={this.onChange} placeholder="Job" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
