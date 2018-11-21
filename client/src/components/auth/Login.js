import React, { Component } from 'react';
import AuthForm from './Form';
import {login} from 'graphql/mutations';
import {compose, graphql} from 'react-apollo';

const fields = [{
  name: 'email',
  placeholder: 'Email...',
  type: 'email'
}, {
  name: 'password',
  placeholder: 'Password...',
  type: 'password'
}]

class Login extends Component {
  state = {
    errors: [],
    loading: false
  }

  handleSubmit = (variables) => {
    this.setState({loading: true, errors: []}, () => {
      this.props.login({variables})
      .then(res => window.location.replace('/'))
      .catch(err => this.setState({
        errors: err.graphQLErrors,
        loading: false
      }))
    })
  }

  render() {
    return (
      <div className="container ">
        <div className="row full-height">
          <div className="col-sm-6">
            <h3>Login</h3>
            <AuthForm 
            fields={fields}
            loading={this.state.loading}
            errors={this.state.errors}
            onSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(login, {name: 'login'})
)(Login)
