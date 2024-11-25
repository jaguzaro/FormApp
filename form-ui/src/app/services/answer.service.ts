import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor() { }


  headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  urlBackend = 'http://localhost:3000/'

  saveAnswers(data: any){
    const url = this.urlBackend + 'answers/create-answer';
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

  getAnswers(){
    const url = this.urlBackend + 'answers/list-answers';
    return fetch(url, {
      method: 'GET',
      headers: {
        ...this.headers,
        'Authorization': sessionStorage.getItem('access_token') || ''
      },
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  }
}
