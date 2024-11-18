import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH'
  }

  urlBackend = 'http://18.216.104.12:3000/'


  registerUser(data: any): Promise<any> {
    const url = this.urlBackend + 'users/register';
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }

  loginUser(data: any): Promise<any> {
    const url = this.urlBackend + 'auth/login';
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }


}
