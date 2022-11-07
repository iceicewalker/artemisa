import { Injectable } from '@angular/core';
import { deleteUser, getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, getDocs, collection, query, deleteDoc, getFirestore, where, addDoc, limit } from "firebase/firestore";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private db = getFirestore();

  constructor(private router: Router) {}

  getByPar(par, value) { //Get query from the database, limit 1
    return query(collection(this.db, "categorias"), where(par, "==", value), limit(1));
  }

  async set(record) { //Sets the record in the database, based on the record id.
    return await setDoc(doc(this.db, "categorias", record['id']), record, { merge: true });
  }
  async add(record) { //Adds a new record to the database.
    return await addDoc(collection(this.db, "categorias"), record);
  }
  async delete(id){ //Deletes the doc from the database.
    return await deleteDoc(doc(this.db, "categorias", id));
  }
}
