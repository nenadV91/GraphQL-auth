import React, { Component } from 'react';
import {Form, Input, FormGroup, FormFeedback, Button} from 'reactstrap';

class AuthForm extends Component {
  state = {}

  componentWillMount = () => {
    this.setState(this.props.fields.reduce((r, {name}) => {
      return Object.assign(r, {[name]: ""})
    }, {}))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state)
  }

  handleChange = ({target: {name, value}}) => {
    this.setState({[name]: value})
  }

  fields = () => {
    return this.props.fields.map(field => 
      <FormGroup key={field.name}>
      <Input
      name={field.name}
      type={field.type}
      onChange={this.handleChange}
      placeholder={field.placeholder}/>
    </FormGroup>)
  }

  errors = () => {
    return this.props.errors.map((error, i) => {
      return <FormFeedback 
      className="show-feedback" 
      key={i}>{error.message}</FormFeedback>
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
         {this.fields()}
         {this.errors()}

          <div className="d-flex align-items-center"> 
            <Button
            disabled={this.props.loading}>
            Submit</Button>
            
            <i className={`
            fa fa-spinner fa-spin form-spinner
            ${this.props.loading ? "show" : "hide"}`}></i>
          </div>
      </Form>
    );
  }
}

export default AuthForm
