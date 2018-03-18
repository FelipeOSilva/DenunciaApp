import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { SqliteHelperService } from '../sqlite-helper/sqlite-helper.service';

@Injectable()
export class InitAppService {

  private db: SQLiteObject;
  private isFirstCall: boolean = true;

  constructor(
    public sqliteHelperService: SqliteHelperService
  ) { }

  public createDatabase(): Promise<SQLiteObject | void> {
    if (this.isFirstCall) {

      this.isFirstCall = false;

      return this.sqliteHelperService.getDb()
        .then((db: SQLiteObject) => {

          this.db = db;
          this.db.executeSql("PRAGMA foreign_keys = ON", {})
            .then((data) => {
              console.log('PRAGMA works +', data.res);
            }).catch(error => {
              console.log(`ERROR -> " + ${(error.err.message)}`);
            });
          this.createTables(this.db);

          console.log(this.db);
          return this.db;
        })

    }
    return this.sqliteHelperService.getDb();
  }

  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      `CREATE TABLE IF NOT EXISTS MOTIVO_OCORRENCIAS (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT)`,
    ])
      .then(success => console.log('Sucesso ao criar tabelas', success))
      .catch((error: Error) => console.log('Erro ao criar tabelas ', error));

    this.sqliteHelperService.onCount('MOTIVO_OCORRENCIAS')
      .then(data => {
        if (data.rows.item(0).qtd == 0) {
          this.sqliteHelperService.onInsert('MOTIVO_OCORRENCIAS', [null, 'FURTO']);
          this.sqliteHelperService.onInsert('MOTIVO_OCORRENCIAS', [null, 'ROUBO']);

          console.log("Dias inseridos com sucesso")
        }
        else {
          console.log("Registrado");
        }
      })
      .catch(e => console.log("Erro ao realizar onCoun ", e))
  }
}
