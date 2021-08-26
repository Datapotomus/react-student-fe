import React, { Component } from 'react';

class CreateStudent extends Component {

  state = {
    formData: {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      major: "",
      ip_address: ""
    }
  }

  handleChange = (event) =>{
    //Creating new object from state form data.
    let formData = Object.assign({}, this.state.formData);
        //Take what is changed in the formdata, and update the matching key value.
        formData[event.target.name] = event.target.value;
        //Setting state on the form data that is there.
        this.setState({formData});
  }

  //Will allow us to post instead of just getting the student.
  handleSubmit = (event) => {
    event.preventDefault();
    
    fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state.formData)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      this.props.history.push("/students")
    })
    .catch(e => console.log(e.message))
  }

  render(){
    return(
      <div className="CreateStudent">
        <h2>Add a New Student</h2>
        
        {JSON.stringify(this.state.formData)}
        <form onSubmit={this.handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input onChange={this.handleChange} value={this.state.formData.id} required type="text" name="id" />
        </div>
        <div>
          <label>First Name:</label>
          <input onChange={this.handleChange} value={this.state.formData.first_name} required type="text" name="first_name" />
        </div>
        <div>
          <label>Last Name:</label>
          <input onChange={this.handleChange} value={this.state.formData.last_name} required type="text" name="last_name" />
        </div>
        <div>
          <label>Email Address:</label>
          <input onChange={this.handleChange}  value={this.state.formData.email}  required type="email" name="email" />
        </div>
        <div>
          <label>Major:</label>
          <input onChange={this.handleChange}  value={this.state.formData.major} required type="text" name="major" />
        </div>
        <div>
          <label>IP Address:</label>
          <input onChange={this.handleChange}  value={this.state.formData.ip_address} required type="text" name="ip_address" />
        </div>
        <div>
          <button type="submit">Add Student</button>
        </div>
        </form>
      </div>
    )
  }
}

export default CreateStudent;