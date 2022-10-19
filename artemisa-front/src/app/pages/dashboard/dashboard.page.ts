import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  counter: any = { p: 0, c: 0, t: 0 }
  counterC: any = { m: 0, y: 0, t: 0 }
  
  constructor() { }

  ngOnInit() {
  }

}
