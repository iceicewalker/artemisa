import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { doc, setDoc, getDoc, getDocs, collection, query, deleteDoc, getFirestore, where, addDoc, limit } from "firebase/firestore";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  private db = getFirestore();

  constructor(private router: Router, private http: HttpClient, private userService: UserService) {}

  async sendWhatsapp(template, params){
    let q = this.userService.getAllByPar('rango', 1);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      params[0].text = doc.data()['nombre'];
        let payload = {
          "messaging_product": "whatsapp",
          "to":  doc.data()['telefono'],
          "type": "template",
          "template": {
              "name": template, 
              "language": {"code": 'es'},
              "components": [
                  {
                    "type": "body",
                    "parameters": params
                  }
              ]
            }
        };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${environment.whatsAppKey}` });
        this.http.post(`https://graph.facebook.com/v13.0/${environment.whatsAppId}/messages`, payload, { headers: headers }).subscribe((r) => { console.log(r) });
    });
  }

  getByPar(par, value) {
    return query(collection(this.db, "productos"), where(par, "==", value), limit(1));
  }
  async set(record) {
    return await setDoc(doc(this.db, "productos", record['id']), record, { merge: true });
  }
  async add(record) {
    record.creacion = new Date()
    return await addDoc(collection(this.db, "productos"), record);
  }
  async get(uid) {
    return await getDoc(doc(this.db, "productos", uid));
  }
  async getAll() {
    return await getDocs(query(collection(this.db, "productos")));
  }
  async delete(id){
    return await deleteDoc(doc(this.db, "productos", id));
  }
  getQuery(){
    return query(collection(this.db, "productos"));
  }
  getProductCategoryQuery(){
    return query(collection(this.db, "categorias-productos"));
  }
  getCategoryByPar(par, value) {
    return query(collection(this.db, "categorias-productos"), where(par, "==", value), limit(1));
  }

  async setCategory(record) {
    return await setDoc(doc(this.db, "categorias-productos", record['id']), record, { merge: true });
  }
  async addCategory(record) {
    return await addDoc(collection(this.db, "categorias-productos"), record);
  }
  async deleteCategory(id){
    return await deleteDoc(doc(this.db, "categorias-productos", id));
  }
}
