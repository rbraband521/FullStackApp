/**ourseDetail - This component provides the "Course Detail" screen by retrieving the 
 * detail for a course from the REST API's /api/courses/:id route and rendering the course. 
 * The component also renders a "Delete Course" button that when clicked should send a DELETE 
 * request to the REST API's /api/courses/:id route in order to delete a course. 
 * This component also renders an "Update Course" button for navigating to the "Update Course" screen. */



import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
//Markdown is required for listing the materials needed
const ReactMarkdown = require('react-markdown');

export default class CourseDetail extends Component {
    constructor(props) {
        super(props);    
            this.state = {
                title: '',
                description: '',
                estimatedTime: '',
                materialsNeeed: '',
                courseId: '',
                user: '',
                authenticatedUser: ''
            };
        }
    /*the state is set based on the response from the getCourseId function which is called 
    using context. If no response is returned the user is directed to the Not Found Error page
    There is also a catch for 500 server error codes */
    async componentDidMount() {
        const { context } = this.props;
        let { id }  = this.props.match.params;
        context.data.getCourseId(id)
            .then(response => {
                if (response) {
                    this.setState({
                        title: response.title,
                        description: response.description,
                        estimatedTime: response.estimatedTime,
                        materialsNeeded: response.materialsNeeded,
                        emailAddress: response.user.emailAddress,
                        courseId: id,
                        user: response.user,
                        authenticatedUser: context.authenticatedUser
                    });
                } else {
                    this.props.history.push('/notfound');
                } 
            }).catch ((error => {
                console.log('error');
                this.props.history.push('/error');
            }));
        }   

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            courseId,
            user,
            authenticatedUser
        } = this.state
    return (
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                    <span>
                    {/*If there is an authenticatedUser ,provided through context, AND if the email address matches
                    the current user email address then the update course and delete course buttons are returned*/}
                        {authenticatedUser ? (authenticatedUser.emailAddress === user.emailAddress ? (
                            <Fragment>
                                <Link 
                                    className="button" 
                                    to={`/courses/${courseId}/update`}>
                                    Update Course
                                </Link>
                                <Link
                                    className="button" 
                                    to={`/courses/${courseId}/delete`} 
                                    onClick={this.deleteCourse}>
                                    Delete Course
                                </Link>
                            </Fragment>
                        ) : (
                            <hr />
                        ) 
                        ) : (
                            <hr />
                        )}
                        </span>
                            <a className="button button-secondary" href="/">Return to List</a>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{title}</h3>
                            <p>By: {user.firstName} {user.lastName}</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={description} />
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                        <ReactMarkdown source={materialsNeeded} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
 /************DELETE COURSE FUNCTION*************/
 /*This function is called above in the return statement if the delete button is available to the user
 There is also a failsafe incase a user tries to enter a delete route in the URL for a course they don't
 have access to, it will direct them to the forbidden error page*/
    deleteCourse = () => {
        const { context } = this.props;
        const courseId = this.state.courseId;
        console.log(courseId);

        if (context.authenticatedUser) {
            const { emailAddress, password } = context.authenticatedUser;
            context.data.deleteCourse(courseId, emailAddress, password)
            .then( errors => {
            console.log(errors);
            if (errors.length > 0) {
                this.setState({ errors });
            } else {
                this.props.history.push('/');
            }
            
        
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error');
            })
        } else {
            this.props.history.push('/forbidden');
        }

    }
}

