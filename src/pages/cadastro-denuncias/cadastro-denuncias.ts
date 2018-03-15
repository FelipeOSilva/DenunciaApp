import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { DenunciaService } from '../../providers/denuncia/denuncia.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    public alertCtrl: AlertController,
    public camera: Camera,
    public denunciaService: DenunciaService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
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
      .catch(err => console.log('err,', err))
  }

  addDenuncia() {
    //função que irar adicionar uma nova denuncia
    this.showAlert();
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
