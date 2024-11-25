import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { EditSurveyComponent } from './components/edit-survey/edit-survey.component';
import { AnswerSurveyComponent } from './components/answer-survey/answer-survey.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { AuthGuard } from './guards/auth.guard';
import { authenticatedGuard } from './guards/authenticated.guard';
import { ListSurveysComponent } from './components/list-surveys/list-surveys.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [authenticatedGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'surveys', pathMatch: 'full' },
      { path: 'surveys', component: CreateSurveyComponent, canActivate: [AuthGuard] },
      { path: 'edit-survey', component: EditSurveyComponent, canActivate: [AuthGuard] },
      { path: 'list-surveys', component: ListSurveysComponent, canActivate: [AuthGuard] }
    ],
  },
  { path: 'answer-survey/:id', component: AnswerSurveyComponent},
];
