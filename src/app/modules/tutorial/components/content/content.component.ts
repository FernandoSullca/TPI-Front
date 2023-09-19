import { Component } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
	tema:string='';
  	constructor(private config: NgbProgressbarConfig,private router : Router) {
		// customize default values of progress bars used by this component tree
		config.striped = true;
		config.animated = true;
		config.type = 'success';
		config.height = '20px';
	}
	loadTrivia(tema:string): void {
		this.tema=tema;
		let url:string='/aprender-';
		let fullUrl = url.concat(tema);
		console.log(fullUrl);
		this.router.navigate([`${fullUrl}`]);
	}
}
