/**ourseDetail - This component provides the "Course Detail" screen by retrieving the 
 * detail for a course from the REST API's /api/courses/:id route and rendering the course. 
 * The component also renders a "Delete Course" button that when clicked should send a DELETE 
 * request to the REST API's /api/courses/:id route in order to delete a course. 
 * This component also renders an "Update Course" button for navigating to the "Update Course" screen. */



import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

export default class CourseDetail extends Component {
    constructor(props) {
        super(props);    
            this.state = {
                title: '',
                description: '',
                estimatedTime: '',
                materialsNeeed: '',
                // firstName: '',
                // lastName: '',
                courseId: '',
                user: '',
                authenticatedUser: ''
            };
        }

    //function to retrieve courses and store then in an array
    // getCourseId() {
    //     let { id }  = this.props.match.params;
    //     console.log(id);
    //      axios.get(`http://localhost:5000/api/courses/${id}`)
    //         .then(response => {this.setState({
    //             title: response.data.title,
    //             description: response.data.description,
    //             estimatedTime: response.data.estimatedTime,
    //             materialsNeeded: response.data.materialsNeeded,
    //             firstName: response.data.user.firstName,
    //             lastName: response.data.user.lastName,
    //             emailAddress: response.data.user.emailAddress,
    //             courseId: id
    //         })})
    //         .catch(error => console.log('Error fetching and parsing data', error));
    //         }
            

            
    // componentDidMount() {
    //     this.getCourseId();
    // }
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
                        // firstName: response.user.firstName,
                        // lastName: response.user.lastName,
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
            // firstName,
            // lastName,
            estimatedTime,
            materialsNeeded,
            courseId,
            user,
            authenticatedUser
            // user
        } = this.state
    return (
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                    <span>
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
                            {description}
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
                                    {/* <ul> */}
                                        <ReactMarkdown source={materialsNeeded} />
                                    {/* </ul> */}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

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
// export default CourseDetail;

