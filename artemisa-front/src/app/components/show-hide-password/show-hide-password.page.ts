import { Component, ContentChild, ElementRef } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-show-hide-password',
  templateUrl: './show-hide-password.page.html',
  styleUrls: ['./show-hide-password.page.scss'],
})
export class ShowHidePasswordPage {

  @ContentChild('input') input: ElementRef;
  public showPassword = false;

  constructor() {}
  
  toggleShow() { // Toggle Show Hide password
    this.showPassword = !this.showPassword;
    this.input.nativeElement.type = this.showPassword ? 'text' : 'password';
  }
}
