import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValuacionTotalCarteraService } from 'src/app/core/services/api/valuacion-total-cartera/valuacion-total-cartera.service';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.scss']
})
export class CarteraComponent {
  constructor(private carteraService : ValuacionTotalCarteraService, private router: Router) { }
  
  
}
