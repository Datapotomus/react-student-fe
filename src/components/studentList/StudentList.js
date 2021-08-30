import React, { Component } from "react";

//Bring in link from react-router-dom so we can link to the specific users
import { Link } from "react-router-dom";


//TODO: Add a delete button for this.
class StudentList extends Component {

    //Setup our initial state
    state = {
        loading: true,
        students: [],
    };

    //When component mounts (displays on the screen) make a fetch request to an API
    componentDidMount() {

        //get all the students when the component mounts on the screen
        this.getStudents()
        
    }

    getStudents = () => {
        //fetch request to the API that returns a promise object
        fetch("http://localhost:5000/api/students")
            //on success of the fetch request, turn the response that came back into JSON
            .then((response) => response.json())
            //on success of turnig the response into JSON (data we can work with), lets add that data to state
            .then((data) => {
                //update state with the data from the API causing the page to re-render
                this.setState({
                    students: data,
                    loading: false
                });
            })
            //handle any errors/failures with getting data from the API
            .catch((error) => {
                console.log(error.message)
            });
    }

    handleDelete = (studentId) => {
      fetch(`http://localhost:5000/api/students/${studentId}`,{
        method: "DELETE"
    })
    //on success of the fetch request, turn the response that came back into JSON
    .then((response) => response.json())
    //on success of turnig the response into JSON (data we can work with), lets add that data to state
    .then((data) => {
        //update state with the data from the API causing the page to re-render
        
        this.setState({
            students: data
        });
    })
    //handle any errors/failures with getting data from the API
    .catch((error) => {
        console.log(error.message)
    });
  }
    

    render() {

        //using map, loop through the students in state that came back from the API and build an array of <li> elements
        //storing them in studentTableRows
        const studentTableRows = this.state.students.map((student, index) => {
            return (
                <tr key={index}>
                    {/* 
                        Link to the student component with the specifc student id so we can get that student from
                        the api and display their data 
                    */}
                    <td>{student.id}</td>
                    <td>{student.first_name}</td>
                    <td>{student.last_name}</td>
                    <td>{student.email}</td>
                    <td>{student.major}</td>
                    <td>{student.ip_address}</td>
                    <td>
                      <Link to={`/student/${student.id}`}>View</Link> &nbsp;&nbsp;
                      <Link to={`/update/student/${student.id}`}>Update</Link> &nbsp;&nbsp;
                      <button onClick={() => this.handleDelete(student.id)}>Delete</button>
                    </td>
                </tr>
            );
        });

        //display data to the user
        //if we are still "loading" (getting the data from the API), display loading. 
        //otherwise, display the studentListItems generated above
        return (
            <section>
                <h2>Welcome to the directory of students:</h2>
                <div>
                  <Link to="/create/student">Add New Student</Link>
                  <br /><br />
                </div>
                

                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>E-mail</th>
                            <th>Major</th>
                            <th>IP Address</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loading ? <tr><td colSpan="6">Loading....</td></tr> : studentTableRows}
                    </tbody>
                </table>
            </section>
        );
    }
}

export default StudentList;