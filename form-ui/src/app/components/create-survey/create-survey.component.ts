import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Surveys } from '../../interfaces/form.interface';

@Component({
  selector: 'app-create-survey',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.scss'
})

export class CreateSurveyComponent implements OnInit {
  form: FormGroup
  surveys: Surveys[] = [];

  constructor(private fb: FormBuilder, private surveyService: SurveyService, private router:Router){
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getSurveys();
  }

  async createSurvey(){
    const body = {
      "name": this.form.get('name')?.value,
      "description": this.form.get('description')?.value,
      "enabled": 0
    }
    const res = await this.surveyService.createSurvey(body);
    console.log(res)
    if(res?.code  == 'SURVEY_CREATED'){
      await this.getSurveys()
    }else{
    }
  }

  async getSurveys(){
    const res = await this.surveyService.getSurveys();
    if(res.code == "SURVEYS_FOUND"){
      this.surveys = res.data
    }else{
    }
  }

  navigateToUpdate(idx: number){
    this.router.navigate(['/dashboard/edit-survey', this.surveys[idx]])
  }

}