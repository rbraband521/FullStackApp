// CreateCourse - This component provides the "Create Course" screen by rendering a form 
// that allows a user to create a new course. The component also renders a "Create Course"
//  button that when clicked sends a POST request to the REST API's /api/courses route. 
//  This component also renders a "Cancel" 
// button that returns the user to the default route (i.e. the list of courses)

import React, { Component, Fragment } from 'react';
import Data from '../Data';
import Form from './Form';

export default class CreateCourse extends Component {
    constructor() {
        super()
        this.data = new Data();
    }
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
        name: '',
        errors: []
    }

    async componentDidMount() {
        const { context } = this.props;
            this.setState(() => {
                return {
                    userId: context.authenticatedUser.id,
                    name: context.authenticatedUser.Name
                }
            })
        }


    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            name,
            errors
        } = this.state;
        return (
            <div className= "bounds course--detail">
                <h1>Create Course</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Create Course"
                        elements={() => (
                            <Fragment>
                                <div className="grid-66">
                                    <div className="course-header">
                                    <h4 className="course--label">Course</h4>
                                    <p>By: {`${name}`}</p>
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
                                                    value={estimatedTime}
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
                                                    value={materialsNeeded}
                                                    onChange={this.change}
                                                    placeholder="Materials Needed..." >
                                                </textarea>
                                                </div>
                                            </li>
                                        </ul>
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
    
    
    
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
            name,
            errors
        } = this.state;
    }
}