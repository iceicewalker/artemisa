import { Injectable } from '@angular/core';
import { deleteUser, getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, getDocs, collection, query, deleteDoc, getFirestore, where } from "firebase/firestore";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private db = getFirestore();

  constructor(private router: Router) {}

  doc(uid){
    return doc(this.db, "usuarios", uid);
  }
  async set(record) {
    return await setDoc(doc(this.db, "usuarios", record['id']), record, { merge: true });
  }
  async get(uid) {
    return await getDoc(doc(this.db, "usuarios", uid));
  }
  async getAll() {
    return await getDocs(query(collection(this.db, "usuarios")));
  }
  async delete(id){
    return await deleteDoc(doc(this.db, "usuarios", id));
  }
  getQuery(){
    return query(collection(this.db, "usuarios"));
  }
  getCategoryQuery(){
    return query(collection(this.db, "categorias"));
  }
}
