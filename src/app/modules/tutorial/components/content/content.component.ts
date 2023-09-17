import { Component } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  constructor(config: NgbProgressbarConfig) {
		// customize default values of progress bars used by this component tree
		config.striped = true;
		config.animated = true;
		config.type = 'success';
		config.height = '20px';
	}
}
