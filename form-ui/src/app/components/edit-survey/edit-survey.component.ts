import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Field } from '../../interfaces/form.interface';
import { CommonModule } from '@angular/common';
import { FieldService } from '../../services/field.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-edit-survey',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SweetAlert2Module],
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss', '../../../styles.scss'],
})
export class EditSurveyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private fb: FormBuilder,
    private fieldService: FieldService,
    private toastService: ToastService
  ) {
    this.surveyForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.createFieldForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      is_required: [false],
    });

    this.fieldForm = this.fb.group({
      fields: this.fb.array([]),
    });
  }

  surveyForm: FormGroup; //Form for edit survey information
  createFieldForm: FormGroup; //Form for create field
  fieldForm!: FormGroup; // Form group with all fields of survey
  surveyFields: Field[] = []; //Fields list of survey
  viewFormOptions: boolean = false;
  optionsField: string[] = [];
  textOption: FormControl = new FormControl(); //Text of option

  allowUpdate: boolean =  false;
  fieldsLoaded: boolean = false;
  surveyId: number | null = null;

  async ngOnInit() {
    this.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    await this.loadSurveyData();
    await this.loadFieldsData();
  }

  async loadSurveyData() {
    const res = await this.surveyService.findSurvey({ id: this.surveyId });
    if (res?.code == 'SURVEY_FOUND') {
      this.surveyForm.get('name')?.setValue(res.data.name);
      this.surveyForm.get('description')?.setValue(res.data.description);
    } else {
      this.toastService.showError('Error loading survey data');
    }
  }

  async loadFieldsData() {
    try {
      await this.getFields();
      const fieldsArray = this.fields;
      fieldsArray.clear();
      this.surveyFields.forEach((field) => {
        fieldsArray.push(this.createFieldGroup(field));
      });
      this.fieldsLoaded = true;
    } catch (error) {
      this.toastService.showError('Error loading fields data');
    }
  }

  async updateSurvey(){
    const body = {
      name: this.surveyForm.get('name')?.value,
      description: this.surveyForm.get('description')?.value,
      enabled: 1
    }

    try {
      const res = await this.surveyService.updateSurvey(body);
      if(res.code == 'SURVEY_UPDATED'){
        this.toastService.showSuccess('Survey updated successfully');
      }
    } catch (error) {
      this.toastService.showError('Error updating survey');
    }
  }

  async createField() {
    try {
      if(this.createFieldForm.valid){
        const body = {
          name: this.createFieldForm.get('name')?.value,
          type: this.createFieldForm.get('type')?.value,
          is_required: this.createFieldForm.get('is_required')?.value == 1,
          survey_id: this.surveyId,
          options: this.optionsField.join('|'),
        };
        const res = await this.fieldService.createField(body);
        if (res.code == 'FIELD_CREATED') {
          if (this.viewFormOptions) {
            await this.addFieldOption();
          }
          this.createFieldForm.reset();
          await this.loadFieldsData();
          this.toastService.showSuccess('Field created successfully');
        }
      }else{
        this.toastService.showError('You must fill out all the fields')
      }
    } catch (error) {
      this.optionsField = [];
      this.toastService.showError('Error creating field');
    }
  }

  async getFields() {
    const res = await this.fieldService.getFields({
      survey_id: this.surveyId,
    });
    if (res?.code == 'FIELDS_FOUND') {
      this.surveyFields = res.data;
    }else{
      this.toastService.showError('Error getting fields');
    }
  }

  async updateField(fieldIndex: number) {
    const field = this.fields.at(fieldIndex) as FormGroup;
    const body = {
      id: field.get('id')?.value,
      name: field.get('name')?.value,
      type: field.get('type')?.value,
      is_required: field.get('is_required')?.value,
    };

    try {
      const res = await this.fieldService.updateField(body);
      if (res.code == 'FIELD_UPDATED') {
        this.toastService.showSuccess('Field updated successfully');
      }
    } catch (error) {
      this.toastService.showError('Error updating field');
    }
  }

  async deleteField(fieldIndex: number) {
    const field = this.fields.at(fieldIndex) as FormGroup;
    const fieldId = field.get('id')?.value;

    try {
      const res = await this.fieldService.deleteField({ id: fieldId });
      if (res.code == 'FIELD_DELETED') {
        this.fields.removeAt(fieldIndex);
        await this.loadFieldsData();
        this.toastService.showSuccess('Field deleted successfully');
        
      }
    } catch (error) {
      this.toastService.showError('Error deleting field');
    }
  }

  createFieldGroup(field: Field): FormGroup {
    const fieldGroup = this.fb.group({
      id: [field.id],
      survey_id: [field.survey_id],
      name: [{value: field.name, disabled: true}],
      type: [{value: field.type, disabled: true}],
      is_required: [{value: field.is_required === 1, disabled: true}],
      options: this.fb.array([]),
    });

    if (field.option_response) {
      const optionsArray = fieldGroup.get('options') as FormArray;
      const options = field.option_response.split('|');
      options.forEach((option) => {
        optionsArray.push(this.createOptionGroup(option));
      });
    }

    return fieldGroup;
  }

  createOptionGroup(option: string): FormGroup {
    return this.fb.group({
      text: option,
    });
  }

  async addFieldOption() {
    const body = {
      field_id: this.surveyId,
      response: this.optionsField.join('|'),
    };
    const res = await this.fieldService.addFieldOption(body);
    if ((res.code = 'FIELD_OPTION_CREATED')) {
      this.optionsField = [];
    }
  }

  async updateFieldOption(
    fieldIndex: number,
    optionIndex: number,
    operation: number
  ) {
    const field = this.fields.get(fieldIndex.toString()) as FormGroup;
    const options = field.get('options') as FormArray;
    const option = options.at(optionIndex) as FormGroup;
    const optionValue = option.get('text')?.value;
    let data = this.surveyFields[fieldIndex];
    if (data?.option_response) {
      let options = data.option_response?.split('|');
      if (operation == 1) {
        options[optionIndex] = this.fields
          .get(fieldIndex.toString())
          ?.get('options')
          ?.get(optionIndex.toString())
          ?.get('text')?.value;
      } else {
        options.splice(optionIndex, 1);
        this.surveyFields[fieldIndex].option_response = this.surveyFields[fieldIndex].option_response?.split('|').splice(optionIndex,1).join('|') || ''
      }
      const body = {
        id: data.option_id,
        field_id: data.id,
        response: options.join('|'),
      };
      const res = await this.fieldService.updateFieldOption(body);
      if ((res.code = 'FIELD_OPTION_UPDATED')) {
        this.optionsField = [];

      }
    }
  }

  onChange(event: any) {
    console.log(event.target.value);
    this.viewFormOptions = ['MultipleChoice', 'SingleChoice'].includes(
      event.target.value
    );
  }

  deleteOption(idx: number) {
    this.optionsField.splice(idx, 1);
  }

  setOptionValue(text: string) {
    this.textOption.setValue(text);
  }

  enableUpdate(idx: number){
    const field = this.fields.at(idx) as FormGroup;
    if(field.get('name')?.enabled){
      this.updateField(idx)
      this.allowUpdate = false;
      field.get('name')?.disable()
      field.get('is_required')?.disable()
    }else{
      this.allowUpdate = true;
      field.get('name')?.enable()
      field.get('is_required')?.enable()
    }
    
  }

  disableUpdate(idx: number){
    const field = this.fields.at(idx) as FormGroup;
    if(field.get('name')?.disabled){
      this.deleteField(idx);
    }else{
      field.get('name')?.setValue(this.surveyFields[idx].name)
      field.get('is_required')?.setValue(this.surveyFields[idx].is_required == 1)
      field.get('name')?.disable()
      field.get('is_required')?.disable()
    }
  }

  get fields(): FormArray {
    return this.fieldForm.get('fields') as FormArray;
  }
}
