/**ourseDetail - This component provides the "Course Detail" screen by retrieving the 
 * detail for a course from the REST API's /api/courses/:id route and rendering the course. 
 * The component also renders a "Delete Course" button that when clicked should send a DELETE 
 * request to the REST API's /api/courses/:id route in order to delete a course. 
 * This component also renders an "Update Course" button for navigating to the "Update Course" screen. */



import React, { Component, Fragment } from 'react';

class CourseDetail extends Component {
    // constructor(props) {
    //     super(props);    
    //         this.
            state = {
                title: '',
                description: '',
                estimatedTime: '',
                materialsNeeed: '',
                firstName: '',
                lastName: '',
                courseId: ''
            };
        // }

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
                this.setState({
                    title: response.title,
                    description: response.description,
                    estimatedTime: response.estimatedTime,
                    materialsNeeded: response.materialsNeeded,
                    firstName: response.user.firstName,
                    lastName: response.user.lastName,
                    emailAddress: response.user.emailAddress,
                    courseId: id
                }
            )})
            .catch(error => console.log('Error fetching and parsing data', error));
            }

    render() {
        console.log(this.state);
        const {
            title,
            description,
            firstName,
            lastName,
            estimatedTime,
            materialsNeeded,
            courseId,
            // user
        } = this.state
    return (
        <Fragment>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100"><span>
                    <a className="button" href={`/courses/${courseId}/update`}>Update Course</a>
                        <a className="button" href="/">Delete Course</a></span>
                        <a className="button button-secondary" href="/">Return to List</a>
                    </div>
                </div>
            </div>
            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{title}</h3>
                        <p>By: {firstName} {lastName}</p>
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
                                <ul>
                                {/**TODO markdown for list */}
                                    <li>{materialsNeeded}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
        )
    }
}
export default CourseDetail;

// export default withRouter(CourseDetail);