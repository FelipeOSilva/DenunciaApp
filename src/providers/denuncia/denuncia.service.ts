import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DenunciaService {
  private url: string = "http://apitesteionic.godocs.com.br/api";
  private email: string = 'dariobennaia@gmail.com';

  constructor(public http: HttpClient) {
  }

  //Função para capturar as ocorrencias existentes no webservice;
  getDenuncias() {
    return new Promise(resolve => {
      this.http.get(`${this.url}/ocorrencias/${this.email}`)
        .subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
    });
  }
  getEmail() {
    return this.email;
  }
}
