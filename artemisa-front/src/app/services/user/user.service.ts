import { Injectable } from '@angular/core';
import { deleteUser, getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, getDocs, collection, query, deleteDoc, getFirestore, where } from "firebase/firestore";
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

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
  
  idValidator(control: FormControl): { [key: string]: boolean } | null { //Check if id is valid
    var docType = Number(control.parent?.value?.documentoTipo);
    let valid = false;
    if (docType === 0) {
      let CI = control.value;
      if (CI == '9999999999') return null;
      if (CI != '0000000000' && CI) {
        if (CI.length == 10) {
          let specialDigit = parseInt(CI.substring(2, 3));
          if (specialDigit < 6) {
            let coefValCI = [2, 1, 2, 1, 2, 1, 2, 1, 2];
            let validator = parseInt(CI.substring(9, 10));
            let add: number = 0;
            let digit: number = 0;
            for (let i = 0; i < CI.length - 1; i++) {
              digit = parseInt(CI.substring(i, i + 1)) * coefValCI[i];
              add += parseInt((digit % 10) + '') + parseInt(digit / 10 + '');
            }
            add = Math.round(add);
            if (
              Math.round(add % 10) == 0 &&
              Math.round(add % 10) == validator
            ) {
              valid = true;
            } else if (10 - Math.round(add % 10) == validator) {
              valid = true;
            } else {
              valid = false;
            }
          } else {
            valid = false;
          }
        } else {
          valid = false;
        }
      } else {
        valid = false;
      }
    } else if (docType === 1) {
      let RUC = control.value;
      let specialDigit = parseInt(RUC.substring(2, 3));
      if (specialDigit == 6) {
        var cod = RUC.substring(10, 13);
        let valid = false;
        if (RUC != '0000000000000') {
          if (RUC.length == 13) {
            if (specialDigit == 6) {
              let coefValRUC = [3, 2, 7, 6, 5, 4, 3, 2];
              let validator = parseInt(RUC.substring(8, 9));
              let add: number = 0;
              let digit: number = 0;
              let residuo: number = 0;
              for (let i = 0; i < 8; i++) {
                digit = parseInt(RUC.substring(i, i + 1)) * coefValRUC[i];
                add += digit;
              }
              residuo = 11 - (add % 11);
              if (residuo == validator) {
                if (cod == '001') {
                  valid = true;
                }
              }
            }
          }
        }
      } else if (specialDigit == 9) {
        var cod = RUC.substring(10, 13);
        let valid = false;
        if (RUC != '0000000000000') {
          if (RUC.length == 13) {
            if (specialDigit == 9) {
              let coefValRUC = [4, 3, 2, 7, 6, 5, 4, 3, 2];
              let validator = parseInt(RUC.substring(9, 10));
              let add: number = 0;
              let digit: number = 0;
              let residuo: number = 0;
              for (let i = 0; i < 9; i++) {
                digit = parseInt(RUC.substring(i, i + 1)) * coefValRUC[i];
                add += digit;
              }
              residuo = 11 - (add % 11);
              if (residuo == validator) {
                if (cod == '001') {
                  valid = true;
                }
              }
            }
          }
        }
      } else if (specialDigit < 6) {
        var cod = RUC.substring(10, 13);
        if (RUC != '0000000000000') {
          if (RUC.length == 13) {
            if (specialDigit < 6) {
              let coefValRUC = [2, 1, 2, 1, 2, 1, 2, 1, 2];
              let validator = parseInt(RUC.substring(9, 10));
              let add: number = 0;
              let digito: number = 0;
              for (let i = 0; i < 9; i++) {
                digito = parseInt(RUC.substring(i, i + 1)) * coefValRUC[i];
                add += parseInt((digito % 10) + '') + parseInt(digito / 10 + '');
              }
              add = Math.round(add);
              if (Math.round(add % 10) == 0 && Math.round(add % 10) == validator) {
                if (cod == '001') {
                  valid = true;
                }
              } else if (10 - Math.round(add % 10) == validator) {
                if (cod == '001') {
                  valid = true;
                }
              }
            }
          }
        }
      } else { return null; }
    }else{ return null; }
    if (!valid) return { documentNotValid: true };
    return null;
  }
}
