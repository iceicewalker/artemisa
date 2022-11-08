import { Injectable } from '@angular/core';
import { doc, setDoc, getDoc, getDocs, collection, query, deleteDoc, getFirestore, addDoc, orderBy } from "firebase/firestore";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private db = getFirestore();

  constructor(private router: Router) {}
  
  async set(record) { //Sets an order doc by id.
    return await setDoc(doc(this.db, "pedidos", record['id']), record, { merge: true });
  }
  async add(record) { //Adds a new order.
    return await addDoc(collection(this.db, "pedidos"), record);
  }
  async get(uid) { //Returns an order by id
    return await getDoc(doc(this.db, "pedidos", uid));
  }
  async getAll() { //Returns all orders (docs).
    return await getDocs(query(collection(this.db, "pedidos")));
  }
  async delete(id){ //Deletes an order by id
    return await deleteDoc(doc(this.db, "pedidos", id));
  }
  getQuery(){ //Returns the query from orders.
    return query(collection(this.db, "pedidos"), orderBy('estado', 'asc'), orderBy('fecha', 'desc'));
  }
}
