import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-survey',
  standalone: true,
  imports: [],
  templateUrl: './edit-survey.component.html',
  styleUrl: './edit-survey.component.scss'
})
export class EditSurveyComponent implements OnInit {

  constructor(private route: ActivatedRoute){}

  //surveyId: number

  ngOnInit(): void {
    //this.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    //this.loadSurveyData(this.surveyId);
  }
}
