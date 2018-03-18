import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite';

import { DenunciaService } from '../providers/denuncia/denuncia.service';
import { InitAppService } from '../providers/init-app-service/init-app-service';
import { ShowLoadingService } from '../providers/show-loading/show-loading.service';
import { ShowToastService } from '../providers/show-toast/show-toast.service';
import { SqliteHelperService } from './../providers/sqlite-helper/sqlite-helper.service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    Camera,
    File,
    FileTransfer,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    InitAppService,
    DenunciaService,
    ShowLoadingService,
    ShowToastService,
    SQLite,
    SqliteHelperService
  ]
})
export class AppModule { }
