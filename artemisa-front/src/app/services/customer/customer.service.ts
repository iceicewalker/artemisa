import { Injectable } from '@angular/core';
import { deleteUser, getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, getDocs, collection, query, deleteDoc, getFirestore, where } from "firebase/firestore";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private db = getFirestore();

  constructor(private router: Router) {}

  doc(uid){
    return doc(this.db, "clientes", uid);
  }
  async set(record) {
    return await setDoc(doc(this.db, "clientes", record['id']), record, { merge: true });
  }
  async get(uid) {
    return await getDoc(doc(this.db, "clientes", uid));
  }
  async getAll() {
    return await getDocs(query(collection(this.db, "clientes")));
  }
  async delete(id){
    return await deleteDoc(doc(this.db, "clientes", id));
  }
  getQuery(){
    return query(collection(this.db, "clientes"));
  }
}
