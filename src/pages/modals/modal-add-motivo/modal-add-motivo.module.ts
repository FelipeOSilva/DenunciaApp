import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddMotivoPage } from './modal-add-motivo';

@NgModule({
  declarations: [
    ModalAddMotivoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddMotivoPage),
  ],
})
export class ModalAddMotivoPageModule {}
