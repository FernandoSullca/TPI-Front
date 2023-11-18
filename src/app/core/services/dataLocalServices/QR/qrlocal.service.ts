import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QRLocalService {

  constructor() { }

  urlcertificadoLocal(perfil: string) {
    switch (perfil) {
      case 'CONSERVADOR':
        return 'assets/perfiles/perfil_inversor_conservador.pdf'; // Ruta al archivo JSON
        break;
      case 'MODERADO':
        return 'assets/perfiles/perfil_inversor_moderado.pdf';
        break;
      case 'AGRESIVO':
        return 'assets/perfiles/perfil_inversor_agresivo.pdf';
        break;
      default:
        return 'assets/perfiles/perfil_inversor_conservador.pdf';
        break;
    }
  }

  //Link para el Qr que le solicita al Api.mercadoJR
  solicitarlinkCertificadoLocal(usuario:string,tipo: string) {
    let urlQR: string = "";
    let urllocal = this.urlcertificadoLocal(tipo);
    urlQR = `https://mercadojunior.com.ar/${urllocal}`;
    return urlQR;    
  }


    //Link para el Qr que le solicita al Api.mercadoJR
  solicitarQRLocal(tipo: string) {
      let urlQR: string = "";
      let urllocal = this.urlqrLocal(tipo);
      urlQR = `${urllocal}`;
      return urlQR;    
    }

    urlqrLocal(perfil: string) {
      switch (perfil) {
        case 'CONSERVADOR':
          return 'assets/mock/perfilQR/qrcode_mercadojunior_Conservador.png'; // Ruta al archivo JSON
          break;
        case 'MODERADO':
          return 'assets/mock/perfilQR/qrcode_mercadojunior_Moderado.png';
          break;
        case 'AGRESIVO':
          return 'assets/mock/perfilQR/qrcode_mercadojunior_Agresivo.png';
          break;
        default:
          return 'assets/mock/perfilQR/qrcode_mercadojunior_Conservador.png';
          break;
      }
    }

}
