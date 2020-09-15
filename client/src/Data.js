//This file holds the functions for requesting data from the REST API
import config from './config';

export default class Data {
  //REST API call structure
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }
/**********GET USERS*********/
//credentials are included
  async getUser(emailAddress, password, firstName, id) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password, firstName, id });
    console.log(response);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
 /**********CREATE USER*********/
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        console.log(data);
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }


  /**********GET COURSES*********/
  async getCourses() {
    const response = await this.api('/courses', 'GET')
    if(response.status === 200) {
      console.log(response);
      return response.json().then(data => data)
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error();
    }
  }
/**********GET COURSES BY ID*********/
  async getCourseId(id) {
    const response = await this.api(`/courses/${id}`, 'GET')
    if(response.status === 200) {
      // console.log(response);
      return response.json().then(data => data)
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error();
    }
  }

/**********CREATE A NEW COURSE*********/
//body is the new course payload and the credentials are of the signed in user
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, {emailAddress, password});
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        console.log(data);
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**********UPDATE COURSE*********/
  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
    console.log(response);
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        console.log(data.errors);
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
/**********DELETE COURSE*********/
//user information must be available here with credentials to verify the correct authorization
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
    console.log(response);
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 403) {
      return response.json().then(data => {
        console.log(data);
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
