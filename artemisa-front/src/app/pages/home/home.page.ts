import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { getAuth } from 'firebase/auth';
import { onSnapshot } from '@firebase/firestore';
import { Location } from '@angular/common';
import * as jQuery from 'jquery';
import { ModalController } from '@ionic/angular';
import { AddEmployeePage } from '../add-employee/add-employee.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  public navLinks = this.globals.NAVLIST;
  public user: any;
  public tab: string;

  constructor(private modal: ModalController, private alertService: AlertService, private globals: Globals, private router: Router, private userService: UserService, private authService: AuthService, private location: Location, private cdr: ChangeDetectorRef) { }

  ngOnInit(){
    this.loadUser();
    this.tab = (this.location.path().split("/"))[1]; //Current tab
    this.location.onUrlChange(val => { this.tab = (val.split("/"))[1]; }); //Validates URL location changes
  }
  
  loadUser(){ //Load current user data.
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if(user){
        this.user = user; 
        onSnapshot(this.userService.doc(user.uid), (doc => { this.user = Object.assign(doc.data(),{ ref: doc.ref }); this.cdr.detectChanges(); }))
      }else{
        this.user = {};
      }
    })
  }

  async modify(){ //Modify the user
    const modal = await this.modal.create({
      component: AddEmployeePage,
      componentProps: {data: this.user, myProfile: true},
      cssClass: 'evaluate-modal'
    });
    modal.present();
  } 
  
  toggleSideBar(){ //Toggles the navbar
    jQuery('#main-container').toggleClass("r-lx");
    jQuery('#navbar').toggleClass("r-ln");
    jQuery('#second-logo').toggle("slow");
  }

  navigate(url){ //Navigates depending on the param
    if(url === "signOut")
      this.authService.signOut();
    else
      this.router.navigate([url]);
      if(jQuery(window).width() < 767)
        this.toggleSideBar();
  }

}
