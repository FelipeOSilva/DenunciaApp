import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqliteHelperService {

  private db: SQLiteObject;

  constructor(
    public platform: Platform,
    public sqlite: SQLite
  ) { }

  //Função para a criação do Banco de dados
  private createDatabase(dbName?: string): Promise<SQLiteObject | void> {

    return this.sqlite.create({
      name: dbName || 'DenunciaApp.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        return this.db;
      })
      .catch((error: Error) => console.log('Erro ao criar ou abrir DB', error));
  }

  //Função para "pegar" o banco de dados, existente ou criando um novo
  getDb(dbName?: string, newOpen?: boolean): Promise<SQLiteObject | void> {
    if (newOpen) return this.createDatabase(dbName);
    return (this.db) ? Promise.resolve(this.db) : this.createDatabase(dbName);
  }
  //Função para retornar todos os dados de uma tabela, podendo ser definada a ordem
  getAll(table: string, order?: string, orderBy?: string) {

    return this.getDb()
      .then((db: SQLiteObject) => {
        return this.db.executeSql(`SELECT * FROM ${table} ORDER BY ${order || 'id'} ${orderBy || 'DESC'}`, {})
          .then(resultSet => {

            let list = []

            for (let i = 0; i < resultSet.rows.length; i++) {
              list.push(resultSet.rows.item(i));
              console.log('resultSET', resultSet.rows.item(i));
            }
            console.log('resultSET FULL', resultSet.rows);
            return list;
          }).catch((e) => console.error('Erro no GETALL', e));
      }).catch((e) => console.error('', e));
  }
  //Função para verificar se existe algum valor em uma tabela.
  onCount(table) {
    return this.db.executeSql(`SELECT COUNT(*) as qtd FROM ${table}`, {});
  }
  //Função para inserir dados  em uma tabela.
  onInsert(table, arrayValues) {
    let values = '';
    for (let i = 0; i < arrayValues.length; i++) {
      (i === (arrayValues.length - 1)) ? values += '?'
        : values += '?, ';
    }
    console.log(`INSERT INTO ${table} VALUES (${values})`, arrayValues)
    return this.db.executeSql(`INSERT INTO ${table} VALUES (${values})`, arrayValues);
  }

}
