import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';

@Component({
  selector: 'app-stage-result',
  templateUrl: './stage-result.component.html',
  styleUrls: ['./stage-result.component.scss']
})
export class StageResultComponent implements OnInit {

  valorRecibido: any;
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService) {
  
  }

  ngOnInit(): void {

    const storedProfile = this.localStorageService.getItem('perfil');
    if (storedProfile) {
      this.valorRecibido = storedProfile;
    }

  }

  loadHome(): void {
    this.router.navigate(['/dashboard/precios']);
  }
  loadStages() {
    let url: string = './dashboard/perfil-inversor-questions';
    this.router.navigate([url]);
  }

}
