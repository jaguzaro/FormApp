import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor() { }

  TOKEN = sessionStorage.getItem('access_token')

  headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: this.TOKEN ? this.TOKEN: ''
  }

  urlBackend = 'http://localhost:3000/'


  createSurvey(data: any): Promise<any> {
    const url = this.urlBackend + 'surveys/create-survey';
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

  getSurveys(): Promise<any>{
    const url = this.urlBackend + 'surveys/list-surveys'
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

  findSurvey(data: any): Promise<any>{
    const url = this.urlBackend + 'surveys/find-survey'
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
}
