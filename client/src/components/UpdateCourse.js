/**UpdateCourse - This component provides the "Update Course" screen by 
 * rendering a form that allows a user to update one of their existing courses. 
 * The component also renders an "Update Course" button that when clicked sends a PUT 
 * request to the REST API's /api/courses/:id route. 
 * This component also renders a "Cancel" button that returns the user to the "Course Detail" screen. */


import React, { Component, Fragment } from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            userId: '',
            user: '',
            // firstName: '',
            // lastName: '',
            courseId: '',
            errors: []
        }
    }

    async componentDidMount() {
        const { context } = this.props;
        const authUser =  this.props.context.authenticatedUser;
        console.log();
        let { id }  = this.props.match.params;
        await context.data.getCourseId(id)
            .then(response => {
                if (response) {
                    this.setState({
                        title: response.title,
                        description: response.description,
                        estimatedTime: response.estimatedTime,
                        materialsNeeded: response.materialsNeeded,
                        user: response.user,
                        userId: response.user.userId,
                        courseId: id
                    });
                }
            console.log(response);
            if(!authUser || authUser.Id !== this.state.user.id){
                this.props.history.push('/forbidden');
            }
            if (!response) {
                this.props.history.push('/notfound');
            }
        })
            .catch((error => {
                this.props.history.push('/error');
            }));
            }

    render() {
        const { context } = this.props;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;
        console.log(title);
        return (
            <div className= "bounds course--detail">
                <h1>Update Course</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Update Course"
                        elements={() => (
                            <Fragment>
                                <div>
                                    <div className="grid-66">
                                        <div className="course-header">
                                        <h4 className="course--label">Course</h4>
                                        <p>By: {context.authenticatedUser.Name}</p>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={title}
                                            onChange={this.change}
                                            className="input-title course--title--input"
                                            placeholder="Course title..." />
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={description}
                                            onChange={this.change}
                                            className="course--description"
                                            placeholder="Course description..." >
                                        </textarea>
                                    </div>  
                                </div>
                                <div>  
                                    <div className="grid-25 grid-right">
                                        <div className="course--stats">
                                            <ul className="course--stats--list">
                                                <li className="course--stats--list--item">
                                                    <h4>Estimated Time</h4>
                                                    <div>
                                                        <input
                                                            id="estimatedTime"
                                                            name="estimatedTime"
                                                            type="text"
                                                            value={estimatedTime || ''}
                                                            onChange={this.change}
                                                            className="course--time--input"
                                                            placeholder="Hours" />
                                                    </div>
                                                </li>
                                                <li className="course--stats--list--item">
                                                    <h4>Materials Needed</h4>
                                                    <div>   
                                                    <textarea
                                                        id="materialsNeeded"
                                                        name="materialsNeeded"
                                                        type="text"
                                                        value={materialsNeeded || ''}
                                                        onChange={this.change}
                                                        placeholder="Materials Needed..." >
                                                    </textarea>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )} />
            </div>
        )
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }
    
      submit = () => {
        const { context } = this.props;
        const { emailAddress, password } = context.authenticatedUser;
    
    
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            user,
            courseId
        } = this.state;
        //New course payload
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            user
        };

        context.data.updateCourse(courseId, course, emailAddress, password)
        .then( errors => {
          if (errors.length > 0) {
            this.setState({ errors });
          //scrolls to top of screen so users can see validation errors after submitting
            window.scrollTo(0,0);
          } else if (errors.length === 0) {
            this.props.history.push(`/courses/${courseId}`);
          } else {
              this.props.history.push('/notfound');
          }
          
    
        })
        .catch(err=> {
            console.log(err);
            this.props.history.push('/error');
        })
    }


    cancel = () => {
        const currCourseId = this.state.courseId;
        this.props.history.push(currCourseId);
    
      }
    
}