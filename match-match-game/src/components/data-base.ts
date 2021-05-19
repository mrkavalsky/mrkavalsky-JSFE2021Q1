interface IUser {
  firstName: string,
  lastName: string, 
  email: string
}

export class DataBase {
  private iDB: IDBFactory = window.indexedDB;
  private dataBase: IDBDatabase | null = null;
  private openRequest: IDBOpenDBRequest = this.iDB.open('match-match-game');
  private initUsers: IUser[] = [];
  constructor() {
    this.openRequest.onupgradeneeded = () => {
      this.dataBase = this.openRequest.result;
      const store = this.dataBase.createObjectStore('test', {keyPath: 'id', autoIncrement: true});
      store.createIndex('firstName', 'firstName');
      store.createIndex('lastName', 'lastName');
      store.createIndex('email', 'email', {unique: true});
    };
    this.openRequest.onsuccess = () => {
      this.dataBase =  this.openRequest.result;
    }
  }

  addNewUser([fName, lName, mail]: string[]): void {
    if(!this.dataBase) return;
    const transaction =  this.dataBase.transaction('match-match-game', 'readwrite');
    const store = transaction.objectStore('test');
    const user: IUser = {firstName: fName, lastName: lName, email: mail};
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
