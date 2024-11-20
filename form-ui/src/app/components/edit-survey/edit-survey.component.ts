import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Field } from '../../interfaces/form.interface';
import { CommonModule } from '@angular/common';
import { FieldService } from '../../services/field.service';

@Component({
  selector: 'app-edit-survey',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-survey.component.html',
  styleUrl: './edit-survey.component.scss'
})
export class EditSurveyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private surveyService: SurveyService, private fb: FormBuilder, private fieldService: FieldService){
    this.surveyForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })

    this.createFieldForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      is_required: [false, [Validators.required]]
    })

    this.fieldForm = this.fb.group({
      fields: this.fb.array([])
    })
  }

  surveyForm: FormGroup;
  createFieldForm: FormGroup;
  fieldForm!: FormGroup;
  surveyFields: Field[] = [];
  

  surveyId: number | null = null

  async ngOnInit() {
    this.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    await this.loadSurveyData();
    await this.loadFieldsData();
  }

  async loadSurveyData(){
    const res = await this.surveyService.findSurvey({id: this.surveyId});
    if(res?.code  == 'SURVEY_FOUND'){
      this.surveyForm.get('name')?.setValue(res.data.name);
      this.surveyForm.get('description')?.setValue(res.data.description)
    }else{
    }
  }

  async loadFieldsData(){
    await this.getFields();
    this.fieldForm = this.fb.group({
      fields: this.fb.array(this.surveyFields.map(field => this.createFieldGroup(field)))
    })
  }

  async createField(){
    const body = {
      name: this.createFieldForm.get('name')?.value,
      type: this.createFieldForm.get('type')?.value,
      is_required: this.createFieldForm.get('is_required')?.value == 1,
      survey_id: this.surveyId
    }
    const res = await this.fieldService.createField(body);
    if(res.code == 'FIELD_CREATED'){
      this.createFieldForm.reset();
      await this.loadFieldsData()
    }
  }

  async getFields(){
    const res = await this.fieldService.getFields();
    if(res?.code == 'FIELDS_FOUND'){
      this.surveyFields = res.data
    }
  }

  createFieldGroup(field: Field): FormGroup{
    return this.fb.group({
      id: [field.id],
      survey_id: [field.survey_id],
      name: [field.name],
      type: [field.type],
      is_required: [field.is_required === 1]
    });
  }

  editField(field: Field): void {
    console.log('Editing field:', field);
  }

  deleteField(id: number): void {
    console.log('Deleted field with ID:', id);
  }
}