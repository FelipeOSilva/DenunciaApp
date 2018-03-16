import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Injectable()
export class ShowToastService {

  constructor(
    private toastCtrl: ToastController
  ) {

  }

  //Função para exibir mensagem de "carregamento"
  public showToast(message?, duration?) {
    let toast = this.toastCtrl.create({
      message: message || 'Nao foi possível completar a operação',
      duration: duration || 4000
    })
    toast.present();
    return toast;
  }
}
