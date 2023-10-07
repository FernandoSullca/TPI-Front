import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investor-profile',
  templateUrl: './investor-profile.component.html',
  styleUrls: ['./investor-profile.component.scss']
})
export class InvestorProfileComponent {

  constructor(private router: Router) {
    // customize default values of progress bars used by this component tree
  }

  loadStages() { 
    let url: string = './dashboard/perfil-inversor-questions';
    // let fullUrl = url.concat((this.tematica).toLocaleLowerCase());
    this.router.navigate([url]);
  }
}
