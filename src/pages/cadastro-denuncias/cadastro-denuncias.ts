import { ShowToastService } from './../../providers/show-toast/show-toast.service';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { DenunciaService } from '../../providers/denuncia/denuncia.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShowLoadingService } from '../../providers/show-loading/show-loading.service';

@IonicPage()
@Component({
  selector: 'page-cadastro-denuncias',
  templateUrl: 'cadastro-denuncias.html',
})
export class CadastroDenunciasPage {

  public denuncia = {
    email: '',
    motivo_ocorrencia: '',
    imagem: ''
  };
  public motivos = ['ROUBO', 'FURTO'];

  public denunciaForm: FormGroup;

  constructor(
    private alertCtrl: AlertController,
    private camera: Camera,
    private denunciaService: DenunciaService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private showLoadingService: ShowLoadingService,
    private showToastService: ShowToastService
  ) {
    this.denuncia.email = denunciaService.getEmail();
    this.denunciaForm = this.formBuilder.group({
      motivoDenuncia: ['', [Validators.required]],
      emailDenuncia: ['', [Validators.required]],
      imagemDenuncia: ['', [Validators.required]],
    });
  }
  //Função que abre a camera e substitui a imagem padrão, pela foto tirada
  getImagem() {
    let cameraOptions: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    //Abrindo a camera
    this.camera.getPicture(cameraOptions)
      .then(data => {
        //substituindo a imagem padrão pela a tirada
        this.denuncia.imagem = data;
      })
      .catch(_ => this.showToastService.showToast('Imagem não registrada'))
  }

  //Função que irar adicionar uma nova denuncia
  addDenuncia(denuncia) {
    let loading = this.showLoadingService.showLoading("Cadastrando sua denúncia")
    this.denunciaService.addDenuncia(denuncia)
      .then(_ => {
        loading.dismiss();
        this.showAlert();
      })
      .catch(err => {
        loading.dismiss();
        switch (err.code) {
          case 1:
            this.showToastService.showToast("Arquivo não encontrado, por favor tente novamente");
            break;
          case 3:
            this.showToastService.showToast("Favor verifique sua conexão com a internet e tente novamente");
            break;
          case 4:
            this.showToastService.showToast("Envio cancelado");
            break;
          default:
            this.showToastService.showToast("Erro ao cadastrar denúncia, por favor tente mais tarde");
        }
      })
  }

  //Função para exibir mensagem de sucesso e retornar para pagina inicial
  showAlert() {
    console.log(this.denuncia)
    let alert = this.alertCtrl.create({
      title: 'Obrigado',
      subTitle: 'A denuncia foi registrada com sucesso!',
      buttons: [{
        text: 'Ok',
        handler: data => {
          this.navCtrl.setRoot('HomePage')
        }
      }]
    });
    alert.present();
  }
}
