import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor() { }

  TOKEN = sessionStorage.getItem('access_token')

  headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: this.TOKEN ? this.TOKEN: ''
  }

  urlBackend = 'http://localhost:3000/'

  createField(data: any): Promise<any> {
    const url = this.urlBackend + 'fields/create-field';
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

  getFields(): Promise<any>{
    const url = this.urlBackend + 'fields/list-fields'
    return fetch(url, {
      method: 'GET',
      headers: this.headers,
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }
}
