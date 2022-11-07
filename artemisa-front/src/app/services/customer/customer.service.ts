import { Injectable } from '@angular/core';
import { deleteUser, getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, getDocs, collection, query, deleteDoc, getFirestore, where, limit, addDoc } from "firebase/firestore";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private db = getFirestore();

  constructor(private router: Router) {}

  doc(uid){ //Gets the document by id param
    return doc(this.db, "clientes", uid);
  }
  getByPar(par, value) { //Generates the query from customers by param.
    return query(collection(this.db, "clientes"), where(par, "==", value), limit(1));
  }
  async set(record) { //Sets the customers documents by id.
    return await setDoc(doc(this.db, "clientes", record['id']), record, { merge: true });
  }
  async add(record) { //Adds a new record.
    record.creacion = new Date()
    return await addDoc(collection(this.db, "clientes"), record);
  }
  async get(uid) { //Returns the getDoc from the customer by id.
    return await getDoc(doc(this.db, "clientes", uid));
  }
  async getAll() { //Returns the docs from all customers
    return await getDocs(query(collection(this.db, "clientes")));
  }
  async delete(id){ //Deletes a customer by id.
    return await deleteDoc(doc(this.db, "clientes", id));
  }
  getQuery(){ //Returns the query from all customers
    return query(collection(this.db, "clientes"));
  }
}
