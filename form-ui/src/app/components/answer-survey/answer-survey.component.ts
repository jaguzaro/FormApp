import { Component, OnInit } from '@angular/core';
import { Field, Surveys } from '../../interfaces/form.interface';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldService } from '../../services/field.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { AnswerService } from '../../services/answer.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-answer-survey',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './answer-survey.component.html',
  styleUrls: ['./answer-survey.component.scss', '../../../styles.scss']
})
export class AnswerSurveyComponent implements OnInit {
  constructor(private fb: FormBuilder, private fieldService: FieldService, private route: ActivatedRoute, private surveySerice: SurveyService, private answerService: AnswerService, private toastService: ToastService) {
    this.fieldsForm = this.fb.group({
      fields: this.fb.array([])
    })
  }

  fields: Field[] = [];
  fieldsForm: FormGroup;
  surveyId: number | null = null;
  viewFields: boolean = false;
  survey: Surveys | null = null;
  viewSurvey: boolean = false;

  async ngOnInit(){
    this.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    await this.getSurvey();
    await this.getFields();
  }

  async getSurvey(){
    const res = await this.surveySerice.findSurvey({id: this.surveyId});
    if(res?.code == 'SURVEY_FOUND'){
      this.survey = res.data;
      this.viewSurvey = true;
    }
  }

  async getFields(){
    const res = await this.fieldService.getFields({survey_id: this.surveyId});
    if(res?.code == 'FIELDS_FOUND'){
      this.fields = res.data;
      this.populateFieldsForm();
      console.log(this.fieldsForm)
    }
  }

  populateFieldsForm(){
    const fieldsArray = this.fieldsForm.get('fields') as FormArray;
    this.fields.forEach(field => {
      fieldsArray.push(this.createFieldGroup(field));
    })
    this.viewFields = true;
  }

  createFieldGroup(field: Field): FormGroup{
    const group = this.fb.group({
      id: [field.id],
      name: [field.name],
      type: [field.type],
      is_required: [field.is_required == 1],
      response: ['', field.is_required == 1? [Validators.required] : null]
    })

    if (field.type === 'MultipleChoice' || field.type === 'SingleChoice') {
      (group as FormGroup).addControl('options', this.fb.array(field.option_response?.split('|').map(option => this.fb.group({text: option, checked: false})) || []));
    }

    return group;
  }

  asFormArray(field_idx: number): FormArray{
    return this.fieldsForm.get('fields')?.get(field_idx.toString())?.get('options') as FormArray;
  }

  async submitForm(){
    console.log(this.fieldsForm)
    if(this.fieldsForm.get('fields')?.valid){
      const formValues = this.fieldsForm.value;
      console.log('Form Values:', formValues);
  
      const mappedValues = formValues.fields.map((field: any, fieldIndex: number) => {
        if (field.type === 'MultipleChoice') {
          const selectedOptions = this.asFormArray(fieldIndex).controls
            .filter(control => control.get('checked')?.value)
            .map(control => control.get('text')?.value)
            .join('|');
          field.response = selectedOptions;
        }
    
        return {
          field_id: field.id,
          response: field.response.toString()
        };
      });
  
      const res = await this.answerService.saveAnswers(mappedValues);
      if(res?.code == 'ANSWER_CREATED'){
        this.toastService.showSuccess('Form answered correctly')
      }
    }else{
      this.toastService.showError('You must answer the mandatory questions')
    }
  }

  onCheckboxChange(event: Event, idx: number, value: string){
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    const formValues = this.fieldsArray.at(idx);
    if(isChecked){
      formValues.get('response')?.setValue(formValues.get('response')?.value.concat(value + '|'))
    }else{
      formValues.get('response')?.setValue(formValues.get('response')?.value.replace(value + '|', ''))
    }
  }

  get fieldsArray(): FormArray{
    return this.fieldsForm.get('fields') as FormArray;
  }

}
