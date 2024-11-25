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

  getFields(data: any): Promise<any>{
    const url = this.urlBackend + 'fields/find-fields'
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }

  updateField(data: any): Promise<any>{
    const url = this.urlBackend + 'fields/update-field'
    return fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }

  deleteField(data: any): Promise<any>{
    const url = this.urlBackend + 'fields/delete-field'
    return fetch(url, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }

  addFieldOption(data: any): Promise<any>{
    const url = this.urlBackend + 'field-options/create-field-option'
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }

  getFieldOptions(): Promise<any>{
    const url = this.urlBackend + 'field-options/list-field-options'
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

  deleteFieldOption(data: any): Promise<any>{
  
    const url = this.urlBackend + 'field-options/delete-field-option'
    return fetch(url, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }

  findFieldOption(data: any): Promise<any>{
    const url = this.urlBackend + 'field-options/find-field-option'
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }

  updateFieldOption(data: any): Promise<any>{
    const url = this.urlBackend + 'field-options/update-field-option'
    return fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }
}
