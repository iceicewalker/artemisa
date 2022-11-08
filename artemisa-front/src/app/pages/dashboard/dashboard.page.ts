import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getDoc, onSnapshot } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  counter: any = { p: 0, c: 0, t: 0, cc: 0 }
  counterC: any = { m: 0, y: 0, t: 0 }
  counterP: any = { p: 0, c: 0, t: 0 }
  orders: any = [];
  users: any = [];
  products: any = [];
  ordersFiltered: any = [];
  usersFiltered: any = [];
  productsFiltered: any = [];
  chartLoaded: boolean = false;
  
  range = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });

  constructor(private cdr: ChangeDetectorRef, private alertService: AlertService, private productService: ProductService, private spinner: NgxSpinnerService, private orderService: OrderService, private userService: CustomerService) { }

  ngOnInit() {
    this.spinner.show();
    this.loadOrders();
    this.loadUsers();
    this.loadProducts();
    this.spinner.hide();
  }

  setDate(type){ //Set the date depending on the param
    var date = new Date(), y = date.getFullYear(), m = date.getMonth(), d = date.getDay();
    date.setHours(0, 0, 0, 0);
    var dateTemp = new Date(date);
    if(type === 0)
      dateTemp.setDate(date.getDate() - 7)
    else if(type === 1)
      dateTemp = new Date(y, m, 1);
    else if(type === 2)
      dateTemp = new Date(y, m - 3, 1);
    else if(type === 3)
      dateTemp = new Date(y, m - 6, 1);
    else if(type === 4)
      dateTemp = new Date(y - 1, m, 1);
    else if(type === 5){
      dateTemp = new Date(y, m -1, 1);
      date = new Date(y, m, 1);
    }
    this.range.controls['start'].setValue(dateTemp);
    this.range.controls['end'].setValue(date);
    this.filter();
    this.charts();
  }

  charts(){ //Generates the charts
    let dates = [];
    let values = [];
    var toDate = new Date(this.range.value.end);
    var dateTemp = new Date(this.range.value.start);
    while(toDate >= dateTemp){
      dates.push(dateTemp.toISOString().split('T')[0]);
      dateTemp.setDate(dateTemp.getDate() + 1);
    }
    dates.forEach((p) => {
      values.push((this.ordersFiltered.filter((z) => z.fechaCorta === p)).length)
    })
    this.chartOptions = { series: [ { name: "Pedidos", data: values } ], chart: { type: "bar", height: 350 }, plotOptions: { bar: { horizontal: false, columnWidth: "55%" } }, dataLabels: { enabled: false }, stroke: { show: true, width: 2, colors: ["transparent"] }, xaxis: { categories: dates }, yaxis: { title: { text: "Nro. de Pedidos" } }, fill: { opacity: 1 }, tooltip: { y: { formatter: function(val) { return "" + val; } } } };
    this.chartLoaded = true;
    this.cdr.markForCheck();
  }

  filter(){ //Filters all the data.
    if(this.range.valid){
      this.counter = { p: 0, c: 0, t: 0, cc: 0 }
      this.ordersFiltered = [];
      this.orders.forEach((o) => {
        let date = new Date(o.fecha.toDate());
        if(date >= this.range.value['start'] && date <= this.range.value['end']){
          if(o['estado'] === 0)
            this.counter.p++;
          if(o['estado'] === 1)
            this.counter.c++;
          if(o['estado'] === 2)
            this.counter.cc++;
          this.counter.t++;
          this.ordersFiltered.push(o);
          this.cdr.markForCheck();
          this.charts();
        }
      });
    }else{
      this.range.markAllAsTouched();
      this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Debes seleccionar las fechas correctamente para continuar.' })
    }
  }

  clear(){ //Clears the form
    this.range.reset();
  }
  loadProducts(){ //Load all the products
    const q = this.productService.getQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.products = querySnapshot.docs.map((doc) => {
        if(doc.data()['stock'] <= doc.data()['stockMinimo'])
          this.counterP.p++;
        else if(doc.data()['stock'] <= doc.data()['stockMedio'])
          this.counterP.c++;
        else 
          this.counterP.t++;
        return Object.assign(doc.data(), { id: doc.id, ref: doc.ref}) 
      })
      this.spinner.hide();
    });
  }

  loadUsers(){ //Load all the users
    const q = this.userService.getQuery();  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.users = querySnapshot.docs.map((doc) => { return Object.assign(doc.data(), { id: doc.id, ref: doc.ref}) });
      var currentDate = new Date();
      var curMonth = currentDate.getMonth() + 1;
      var curYear = currentDate.getFullYear();
      this.users.forEach((u) => {
        let date = new Date(u.creacion.toDate());
        if(date.getFullYear() === curYear){
          if(date.getMonth() + 1 === curMonth){ this.counterC.m++; }
          this.counterC.y++;
        }
      })
      this.counterC.t = this.users.length;
      this.spinner.hide();
    });
  }
  loadOrders(){
    const q = this.orderService.getQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.orders = querySnapshot.docs.map((doc) => {
        if(doc.data()['estado'] === 0)
          this.counter.p++;
        if(doc.data()['estado'] === 1)
          this.counter.c++;
        if(doc.data()['estado'] === 2)
          this.counter.cc++;
        this.counter.t++;
        let payload = Object.assign(doc.data(), { id: doc.id, ref: doc.ref, fechaCorta: (new Date(doc.data().fecha.toDate())).toISOString().split('T')[0] });
        return payload;
      })
      this.setDate(0);
      this.spinner.hide();
    });
  }
}
