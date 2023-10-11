import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { QuestionsProfileService } from 'src/app/core/services/api/subjective-profile/questions-profile.service';

@Component({
  selector: 'app-stage-result',
  templateUrl: './stage-result.component.html',
  styleUrls: ['./stage-result.component.scss']
})
export class StageResultComponent implements OnInit {
  // public resultado="Moderado"
  valorRecibido: any;
  perfil: any; 
  public resultado$: Observable<string>| undefined;
  constructor(private profileService: QuestionsProfileService,
     private router: Router,private route: ActivatedRoute,
     private cdr: ChangeDetectorRef,
     private localStorageService: LocalStorageService) { 
  this.resultado$ = undefined;
  }

 
  ngOnInit(): void {

    const storedProfile = this.localStorageService.getItem('perfil');
    if (storedProfile) {
      this.valorRecibido = storedProfile;
    }

 
    // this.profileService.disparadordemensageResultado.subscribe(data=>{
    //   console.log("Recibiendo datos de perfil-----");
    //   console.log(data);
    //   this.perfil=data;
    //   console.log(this.perfil.data);
    //   this.resultado=this.perfil.data
    // })
 
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
