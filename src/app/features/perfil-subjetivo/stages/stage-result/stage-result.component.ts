import { Component } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionsProfileService } from 'src/app/core/services/api/subjective-profile/questions-profile.service';

@Component({
  selector: 'app-stage-result',
  templateUrl: './stage-result.component.html',
  styleUrls: ['./stage-result.component.scss']
})
export class StageResultComponent {
  resultado="Moderado"
  valorRecibido: any;
  perfil: any;
  resultadotest$: Observable<string | undefined>;
  constructor(private profileService: QuestionsProfileService, private router: Router,private route: ActivatedRoute) { 
    this.resultadotest$ = new Observable<string | undefined>();
  }

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   this.resultadotest= params['perfil'];
    //   // Ahora puedes usar this.valorRecibido en tu componente
    // });
    // this.resultadotest=this.valorRecibido;
    //  this.resultadotest = this.profileService.getperfil();
     this.resultadotest$ = this.profileService.getperfil();
    // this.profileService.getperfil().subscribe((resultadotest:string) => {
    //   this.resultadotest = resultadotest;
    //   // Continuar con la lógica del componente
    // });
  }

 
  loadHome(): void {
    // this.entregarResultados() ;
    this.router.navigate(['/dashboard/precios']);
    // this.buttonText = 'Continuar';
  }
  loadStages() { 
    let url: string = './dashboard/perfil-inversor-questions';
    this.router.navigate([url]);
  }

}
