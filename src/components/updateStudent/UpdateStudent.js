import React, {Component} from 'react';

class UpdateStudent extends Component{
  //Gonna use state to update students
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

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;

    fetch(`http://localhost:5000/api/students/${id}`, {
      method: "PUT",
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

  componentDidMount(){
    //setting the ID, and getting the student based on that ID.
    const id = this.props.match.params.id;
    this.getStudent(id);
  }

  getStudent = (studentId) => {
    //use fetch to make an API call and get a specific student (returns a promise)
    fetch(`http://localhost:5000/api/students/${studentId}`)
        //on success of the fetch request, turn the response that came back into JSON
        .then((response) => response.json())
        //on success of turnig the response into JSON (data we can work with), lets add that data to state
        .then((data) => {
        
            //update state with the data from the API causing the page to re-render
            this.setState({
                formData: {...data}
            });
        })
        //handle any errors/failures with getting data from the API
        .catch((error) => {
            console.log(error)
        });
}

  render(){
    return(
      <div className="UpdateStudent">
        <h2>Updating a Student</h2>
        
        {JSON.stringify(this.state.formData)}
        <form onSubmit={this.handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input readOnly onChange={this.handleChange} value={this.state.formData.id} required type="text" name="id" />
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
          <button type="submit">Update Student</button>
        </div>
        </form>
      </div>
    )
  }
}
export default UpdateStudent;