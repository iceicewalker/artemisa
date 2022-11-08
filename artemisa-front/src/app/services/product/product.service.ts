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

  async sendWhatsapp(template, params){ //Sends an alert using WhatsApp API
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
        this.http.post(`https://graph.facebook.com/v13.0/${environment.whatsAppId}/messages`, payload, { headers: headers }).subscribe((r) => { });
    });
  }

  getByPar(par, value) { //Returns the query of a product by param and value.
    return query(collection(this.db, "productos"), where(par, "==", value), limit(1));
  }
  async set(record) { //Sets a product.
    return await setDoc(doc(this.db, "productos", record['id']), record, { merge: true });
  }
  async add(record) { //Adds a new product.
    record.creacion = new Date()
    return await addDoc(collection(this.db, "productos"), record);
  }
  async get(uid) { //Returns the document of a product by id.
    return await getDoc(doc(this.db, "productos", uid));
  }
  async getAll() { //Returns all the docs of products.
    return await getDocs(query(collection(this.db, "productos")));
  }
  async delete(id){ //Deletes a product by id.
    return await deleteDoc(doc(this.db, "productos", id));
  }
  getQuery(){ //Returns the query of all products
    return query(collection(this.db, "productos"));
  }
  getProductCategoryQuery(){ //Returns the query of all product categories.
    return query(collection(this.db, "categorias-productos"));
  }
  getCategoryByPar(par, value) { //Returns a product category by id.
    return query(collection(this.db, "categorias-productos"), where(par, "==", value), limit(1));
  }

  async setCategory(record) { //Sets a category.
    return await setDoc(doc(this.db, "categorias-productos", record['id']), record, { merge: true });
  }
  async addCategory(record) { //Adds a new product category.
    return await addDoc(collection(this.db, "categorias-productos"), record);
  }
  async deleteCategory(id){ //Deletes a product category by id.
    return await deleteDoc(doc(this.db, "categorias-productos", id));
  }
}
