import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer solicitudes HTTP
import { BehaviorSubject, Observable } from 'rxjs';
import { Tematica, Opcion, Pregunta, Introduccion, Trivia, Questions } from 'src/app/core/models/questions/questions.models';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
private jsonUrl = 'assets\\mock\\trivia-simple.json'; // Reemplaza con la ruta correcta de tu archivo JSON

private respQuestions: Questions.QuestionsData| null = null; // Almacena las preguntas
private currentQuestionIndex: number = 0;
private questionsLoadedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


constructor(private http: HttpClient) {} // Inyecta HttpClient

// Carga las preguntas desde un archivo JSON utilizando HttpClient
loadQuestionsFromJSON(): void {
  this.http.get<Questions.QuestionsData>(this.jsonUrl).subscribe(
    (data) => {
      this.respQuestions = data;
      // Emitir true para notificar que los datos se han cargado con éxito
      this.questionsLoadedSubject.next(true);
    },
    (error) => {
      console.error('Error cargando las preguntas desde el archivo JSON', error);
      // Emitir false en caso de error
      this.questionsLoadedSubject.next(false);
    }
  );
}

// Observable para que los componentes se suscriban y reciban notificaciones sobre la carga de datos
 get questionsLoaded$(): Observable<boolean> {
  return this.questionsLoadedSubject.asObservable();
}

//No se logro separa en tipo de tematicas desde el servicio.
// getTriviaQuestions(): Trivia[] {
//   const trivias = this.respQuestions?.trivias ?? [];
//   console.log("Por funcion obtener solo las trivias");
//   console.log(this.respQuestions);
//   console.log(trivias);
//   console.log("----");
//   return trivias;
// }

getIntroductionQuestions(): Introduccion[] {
  return this.respQuestions?.introducciones.introducciones || [];
}

moveToNextQuestion(): void {
  this.currentQuestionIndex++;
}

isLastQuestion(): boolean {
  const trivia = this.respQuestions?.trivias.trivias[this.currentQuestionIndex];
  return !!trivia && this.currentQuestionIndex === trivia.preguntas.length - 1;
}

}