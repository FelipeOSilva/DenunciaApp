import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Injectable()
export class ShowLoadingService {

  constructor(
    private loadingCtrl: LoadingController
  ) { }

  //Função para exibir mensagem de "carregamento"
  public showLoading(message?) {
    let loading = this.loadingCtrl.create({
      content: message || 'Aguarde...'
    })
    loading.present();
    return loading;
  }
}
