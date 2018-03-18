import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular/navigation/view-controller';

import { ShowLoadingService } from '../../../providers/show-loading/show-loading.service';
import { SqliteHelperService } from './../../../providers/sqlite-helper/sqlite-helper.service';

@IonicPage()
@Component({
  selector: 'page-modal-add-motivo',
  templateUrl: 'modal-add-motivo.html',
})
export class ModalAddMotivoPage {

  public motivo = {
    id: null,
    nome: ''
  };
  motivoForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public showLoadingService: ShowLoadingService,
    public sqliteHelperService: SqliteHelperService,
    private viewCtrl: ViewController
  ) {
    this.motivoForm = this.formBuilder.group({
      motivoName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });

    console.log(this.motivo);
  }

  onAddMotivo() {
    let loading = this.showLoadingService.showLoading('Salvando novo motivo...');

    this.sqliteHelperService.onInsert('MOTIVO_OCORRENCIAS', [this.motivo.id, this.motivo.nome])
      .then(_ => {
        console.log('Motivo Inserido com sucesso ', this.motivo);
        this.onDismiss();
        loading.dismiss();
      })
  }

  onDismiss() {
    this.viewCtrl.dismiss()
  }
}
