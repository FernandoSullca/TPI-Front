import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { Cartera } from 'src/app/core/models/cartera/cartera';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.scss']
})
export class CarteraComponent implements OnInit{
  
  constructor(private carteraService : CarteraService, private router: Router) { }

  cartera:any;
  ngOnInit(): void {
    this.getCartera();
  }
  getCartera(){
    return this.carteraService.getCartera().subscribe((response) => {
      this.cartera=response
      console.log(this.cartera);
    });
  }
  mostrarValuacionTotalCartera():number{
    return this.cartera.totalCartera;
  }
}
