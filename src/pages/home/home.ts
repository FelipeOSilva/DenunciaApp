import { ShowToastService } from './../../providers/show-toast/show-toast.service';
import { ShowLoadingService } from './../../providers/show-loading/show-loading.service';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { DenunciaService } from '../../providers/denuncia/denuncia.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public denuncias;
  constructor(
    private denunciaService: DenunciaService,
    private navCtrl: NavController,
    private showLoadingService: ShowLoadingService,
    private showToastService: ShowToastService
  ) {
  }

  //Carrega todas as ocorrencias registradas ao entrar na página
  ionViewWillLoad() {
    this.getDenuncias();
  }

  //Função para atribuir as denúncias existentes para a variável denuncias
  getDenuncias() {
    let loading = this.showLoadingService.showLoading('Carregando suas denúncias');
    this.denunciaService.getDenuncias()
      .then(data => this.denuncias = data)
      .then(_ => loading.dismiss())
      .catch(_ => {
        loading.dismiss();
        this.showToastService
          .showToast("Não foi possível obter acesso ao servidor. Verifique sua conexão e tente novamente.", 6000);
      })
      ;
  }

  //Função que irá abrir a página de cadastro de notícias
  openCadastroDenuncias() {
    this.navCtrl.push('CadastroDenunciasPage')
  }
}