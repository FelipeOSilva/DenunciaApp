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

  getDb(dbName?: string, newOpen?: boolean): Promise<SQLiteObject | void> {
    if (newOpen) return this.createDatabase(dbName);
    return (this.db) ? Promise.resolve(this.db) : this.createDatabase(dbName);
  }

}
