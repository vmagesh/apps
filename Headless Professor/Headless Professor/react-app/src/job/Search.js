import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import JobCard from "./JobCard"
import data from "../data/jobs.json";

class Search extends Component {

    state = {
        jobDetails: data,
        searchString: ""
    };

    constructor() {
        super();
        this.getjobDetails();
        //console.log(this.state.jobDetails);
    }

    getjobDetails = () => {
        
		fetch("http://localhost:3001/api/job/view", {
			method: 'GET',
		})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ jobDetails: result.jobs });
		  console.log(result.jobs);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          alert('Error in fetching data');
        }
      )
        //console.log(data);
        return data;
    };

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div className="container">
                {
                    isAuthenticated() && (
                        <Grid>
                            <Row>

                                {this.state.jobDetails !== [] ? (
                                   <div>
                                        {this.state.jobDetails.map((currentJob, key) => (
										 <Col xs={3} md={4}>
                                            <JobCard JobDetails={currentJob} Key={key}/>
											</Col>
                                        ))}
                                    </div>
                                ) : "No Jobs Found"
                                }

                            </Row>
                        </Grid>
                    )
                }
                {
                    !isAuthenticated() && (
                        <h4>
                            You are not logged in! Please{' '}
                            <a
                                style={{ cursor: 'pointer' }}
                                onClick={this.login.bind(this)}
                            >
                                Log In
                </a>
                            {' '}to continue.
              </h4>
                    )
                }
            </div>
        );
    }
}

export default Search;
