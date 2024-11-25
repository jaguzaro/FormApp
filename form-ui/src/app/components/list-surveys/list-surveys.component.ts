import { Component } from '@angular/core';
import { ListSurveys, Surveys } from '../../interfaces/form.interface';
import { FormBuilder } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FieldService } from '../../services/field.service';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-list-surveys',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-surveys.component.html',
  styleUrls: ['./list-surveys.component.scss', '../../../styles.scss'],
})
export class ListSurveysComponent {
  surveys: ListSurveys[] = [];

  constructor(
    private surveyService: SurveyService,
    private fieldService: FieldService,
    private answerService: AnswerService,
  ) { }

  ngOnInit(): void {
    this.getSurveys();
  }

  async getSurveys() {
    const res_s = await this.surveyService.getSurveys();
    if (res_s.code === 'SURVEYS_FOUND') {
      const surveysWithFields = [];
      for (const survey of res_s.data) {
        const res_f = await this.fieldService.getFields({ survey_id: survey.id });
        surveysWithFields.push({
          ...survey,
          watch: false,
          fields: res_f.data,
        });
      }
      const res_a = await this.answerService.getAnswers();
      const responsesByFieldId = res_a.data.reduce((acc: Record<number, string[]>, answer: any)=>{
        if(!acc[answer.field_id]){
          acc[answer.field_id] = [];
        }
        acc[answer.field_id].push(answer.response);
        return acc;
      })

      surveysWithFields.forEach((survey)=>{
        survey?.fields?.forEach((field:any)=>{
          if(responsesByFieldId[field.id]){
            field.response = responsesByFieldId[field.id];
          }
        })
      })

      this.surveys = surveysWithFields;
      console.log(this.surveys)
    } else {
    }
  }

  async getFields(survey_id: number) {
    try {
      const res = await this.fieldService.getFields({
        survey_id: survey_id,
      });

      if (res?.code == 'FIELDS_FOUND') {
      }
    } catch (error) { }
  }

  async viewAnswers(survey_id: number) {
    this.surveys[survey_id].watch = !this.surveys[survey_id].watch;
  }
}
