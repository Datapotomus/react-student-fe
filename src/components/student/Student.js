import React, { Component } from "react";

class Student extends Component {

    //setup initial state to hold the data we want to display for a student
    state = {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        major: "",
        ip_address: ""
    };

    //when the component mounts (displays on screen) get the student from the API
    componentDidMount() {

        //get the student's id from the URL to make the API call
        const id = this.props.match.params.id;

        this.getStudent(id)

        
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
                    ...data
                });
            })
            //handle any errors/failures with getting data from the API
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        //display the student data that is in state
        return (
            <section>
                <h1>{this.state.first_name} {this.state.last_name}'s Details</h1>
                <h2>This is student #{this.state.id}</h2>
                <div>Email: {this.state.email}</div>
                <div>Major: {this.state.major}</div>
                <div>IP Address: {this.state.ip_address}</div>
            </section>
        );
    }
}

export default Student;