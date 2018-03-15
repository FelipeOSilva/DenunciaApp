import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroDenunciasPage } from './cadastro-denuncias';

@NgModule({
  declarations: [
    CadastroDenunciasPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroDenunciasPage),
  ],
})
export class CadastroDenunciasPageModule {}
