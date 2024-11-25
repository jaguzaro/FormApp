import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss', '../../../styles.scss']
})
export class MenuComponent {

  constructor(private router: Router){}

  menuItems = [
    { iconClass: 'fa-house', label: 'Manage Surveys', path: 'surveys' },
    { iconClass: 'fa-list', label: 'View Surveys', path: 'list-surveys' },
    { iconClass: 'fa-right-from-bracket', label: 'Log out', path: 'login' },
  ];

  goTo(route: string){
    if(route == 'login'){
      sessionStorage.clear();
      this.router.navigate([''])
    }else{
      this.router.navigate(['dashboard', route]);
    }
    
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }
}
