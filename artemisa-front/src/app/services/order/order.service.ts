import { Injectable } from '@angular/core';
import { doc, setDoc, getDoc, getDocs, collection, query, deleteDoc, getFirestore, where, addDoc, limit, orderBy } from "firebase/firestore";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private db = getFirestore();

  constructor(private router: Router) {}
  
  async set(record) {
    return await setDoc(doc(this.db, "pedidos", record['id']), record, { merge: true });
  }
  async add(record) {
    record.creacion = new Date()
    return await addDoc(collection(this.db, "pedidos"), record);
  }
  async get(uid) {
    return await getDoc(doc(this.db, "pedidos", uid));
  }
  async getAll() {
    return await getDocs(query(collection(this.db, "pedidos")));
  }
  async delete(id){
    return await deleteDoc(doc(this.db, "pedidos", id));
  }
  getQuery(){
    return query(collection(this.db, "pedidos"), orderBy('estado', 'asc'), orderBy('fecha', 'desc'));
  }
}
