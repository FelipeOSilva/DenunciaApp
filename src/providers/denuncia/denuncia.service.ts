import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DenunciaService {
  private url: string = "http://apitesteionic.godocs.com.br/api";
  private email: string = 'felipe_96sp@msn.com';

  constructor(
    private fileTransfer: FileTransfer,
    private http: HttpClient
  ) {
  }

  //Função para capturar as ocorrencias existentes no webservice;
  getDenuncias() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/ocorrencias/${this.email}`)
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }

  //Função para realizar o upload dos dados da denuncia para o webservice
  addDenuncia(denuncia) {
    let url = `${this.url}/novaocorrencia`
    let options: FileUploadOptions = {
      fileKey: 'imagem',
      httpMethod: 'post',
      mimeType: "multipart/form-data",
      params: {
        email: denuncia.email,
        motivo_ocorrencia: denuncia.motivo_ocorrencia
      }
    }
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    return fileTransfer.upload(denuncia.imagem, url, options)
      
  }
  getEmail() {
    return this.email;
  }
}
