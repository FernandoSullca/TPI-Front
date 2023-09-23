import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/core/services/api/DataLocalService/data-service.service';
import { Tematica } from 'src/app/core/models/questions/questions.models';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit{
	tematica:string='';
	data : Tematica[]=[];
  	constructor(private config: NgbProgressbarConfig,private router : Router,private dataService : DataServiceService)  {
		// customize default values of progress bars used by this component tree
		config.striped = true;
		config.animated = true;
		config.type = 'success';
		config.height = '20px';
	}
	ngOnInit(): void {
		this.tematica="Acciones";
		this.getData();
	}
	getData() {
		this.data = this.dataService.getThemeByname(this.tematica);
	}
	loadTrivia(): void {
		let url:string='/aprender-';
		let fullUrl = url.concat((this.tematica).toLocaleLowerCase());
		this.router.navigate([`${fullUrl}`]);
	}
}
