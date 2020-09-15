//stateful
/**This component provides the "Courses" screen by retrieving the list of 
 * courses from the REST API's /api/courses route and rendering a list of courses.
 *  Each course needs to link to its respective "Course Detail" screen.
 *  This component also renders a link to the "Create Course" screen. */

import React, { Component } from 'react';
import NotFound from './NotFound';


class Courses extends Component {
    state = {
        courses: []
    };

    async componentDidMount() {
        const { context } = this.props;
        console.log(context);
        context.data.getCourses().then(response => {
            this.setState({courses: response})
            console.log(response);
        }) 
        .catch((error => { 
            console.log('Error fetching and parsing data', error);
            this.props.history.push('/error');
        }));
    }

    render() {
    let courses;
    console.log(this.state.courses);
    if(this.state.courses.length > 0) {
        courses = this.state.courses.map((course) => 
            <div className="grid-33" key={course.id}>
                <a className="course--module course--link" href={'/courses/' + course.id}>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                </a>
            </div>
        );
    } else {
        courses = <NotFound />
    }
        return (
            <div className="bounds">
                {courses}
                <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </a></div>
      </div>
        );
    }
}
export default Courses;