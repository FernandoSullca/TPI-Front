import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsProfileService } from 'src/app/core/services/api/subjective-profile/questions-profile.service';

@Component({
  selector: 'app-stage-result',
  templateUrl: './stage-result.component.html',
  styleUrls: ['./stage-result.component.scss']
})
export class StageResultComponent {
  resultadotest="Moderado"

  constructor(private profileService: QuestionsProfileService, private router: Router) { }

  loadHome(): void {
    // this.entregarResultados() ;
    this.router.navigate(['/dashboard/perfil-inversor']);
    // this.buttonText = 'Continuar';
  }
}
