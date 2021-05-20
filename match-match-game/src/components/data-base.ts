import { ScoreBlock } from './score-block/score-block';
import { IUser } from './user-interface';

export class DataBase {
  private iDB: IDBFactory = window.indexedDB;

  private dataBase: IDBDatabase | null = null;

  private openRequest: IDBOpenDBRequest = this.iDB.open('match-match-game');

  public transactionResult = '';

  private initUsers: IUser[] = [
    {
      firstName: 'Nicci',
      lastName: 'Troiani',
      email: 'nicci@gmail.com',
      score: 456,
    },
    {
      firstName: 'George',
      lastName: 'Fields',
      email: 'jack@gmail.com',
      score: 358,
    },
    {
      firstName: 'Jones',
      lastName: 'Dermot',
      email: 'dermot@gamil.com',
      score: 211,
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@gmail.com',
      score: 169,
    },
  ];

  constructor(public output: ScoreBlock) {
    this.openRequest.onupgradeneeded = () => {
      this.dataBase = this.openRequest.result;
      const store = this.dataBase.createObjectStore('testCollection', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('firstName', 'firstName');
      store.createIndex('lastName', 'lastName');
      store.createIndex('email', 'email', { unique: true });
      store.createIndex('score', 'score');
    };
    this.openRequest.onsuccess = () => {
      this.dataBase = this.openRequest.result;
      this.initUsers.forEach((user) => this.addNewUser(user));
      this.addBestScoreArray();
    };
  }

  addNewUser(user: IUser): void {
    if (!this.dataBase) return;
    const transaction = this.dataBase.transaction(
      'testCollection',
      'readwrite',
    );
    const store = transaction.objectStore('testCollection');
    store.add(user);
    transaction.oncomplete = () => {
      this.transactionResult = 'complete';
    };
    transaction.onerror = () => {
      this.transactionResult = 'error';
    };
  }

  addBestScoreArray(): IUser[] | void {
    if (!this.dataBase) return;
    const users: IUser[] = [];
    const transaction: IDBTransaction = this.dataBase.transaction(
      'testCollection',
      'readonly',
    );
    const store: IDBObjectStore = transaction.objectStore('testCollection');
    const request: IDBRequest<IDBCursorWithValue | null> = store
      .index('score')
      .openCursor(null, 'prev');
    request.onsuccess = () => {
      const cursor: IDBCursorWithValue | null = request.result;
      if (cursor) {
        users.push(cursor.value);
        cursor.continue();
      }
    };
    transaction.oncomplete = () => {
      this.output.refreshBestScore(users);
    };
  }
}
