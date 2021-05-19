interface IUser {
  firstName: string,
  lastName: string, 
  email: string
}

export class DataBase {
  private iDB: IDBFactory = window.indexedDB;
  private dataBase: IDBDatabase | null = null;
  private openRequest: IDBOpenDBRequest = this.iDB.open('match-match-game');
  private initUsers: IUser[] = [{
    firstName: 'Nicci',
    lastName: 'Troiani', 
    email: 'nicci@gmail.com'
  }, {
    firstName: 'George',
    lastName: 'Fields', 
    email: 'jack@gmail.com'
  }, {
    firstName: 'Jones',
    lastName: 'Dermot', 
    email: 'dermot@gamil.com'
  }, {
    firstName: 'Jane',
    lastName: 'Doe', 
    email: 'jane.doe@gmail.com'
  }];
  constructor() {
    this.openRequest.onupgradeneeded = () => {
      this.dataBase = this.openRequest.result;
      const store = this.dataBase.createObjectStore('test', {keyPath: 'id', autoIncrement: true});
      store.createIndex('firstName', 'firstName');
      store.createIndex('lastName', 'lastName');
      store.createIndex('email', 'email', {unique: true});
      this.initUsers.forEach((user) => this.addNewUser(user));
    };
    this.openRequest.onsuccess = () => {
      this.dataBase =  this.openRequest.result;
    }
  }

  addNewUser(user: IUser): void {
    if(!this.dataBase) return;
    const transaction =  this.dataBase.transaction('match-match-game', 'readwrite');
    const store = transaction.objectStore('test');
    store.add(user);
    transaction.oncomplete = () => {
      console.log('complete');
    }
    transaction.onerror = () => {
      console.log('error');
    }
  }
  
  getUsers() {
    if(!this.dataBase) return;
    const transaction: IDBTransaction = this.dataBase.transaction('match-match-game', "readonly");
    const store: IDBObjectStore = transaction.objectStore('test');
    const users: IDBRequest<IUser[]> = store.getAll();
    transaction.oncomplete = () => {
      return users.result;
    }
  }
}
