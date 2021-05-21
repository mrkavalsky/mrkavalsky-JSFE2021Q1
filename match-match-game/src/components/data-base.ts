import { ScoreBlock } from './score-block/score-block';
import { IUser } from '../shared/user-interface';

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

  private currentUsers: IUser[] = this.initUsers;

  constructor(public output: ScoreBlock) {
    this.openRequest.onupgradeneeded = () => {
      this.dataBase = this.openRequest.result;
      const store: IDBObjectStore = this.dataBase.createObjectStore('players', {
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
    const transaction: IDBTransaction = this.dataBase.transaction(
      'players',
      'readwrite',
    );
    const store: IDBObjectStore = transaction.objectStore('players');
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
      'players',
      'readonly',
    );
    const store: IDBObjectStore = transaction.objectStore('players');
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
      this.currentUsers = users;
      this.output.refreshBestScore(users);
    };
  }

  findUser(mail: string): IUser | undefined {
    return this.currentUsers.find(({ email }) => email === mail);
  }
}
