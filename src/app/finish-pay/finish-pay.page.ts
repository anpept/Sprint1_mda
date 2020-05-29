import { Component, OnInit } from '@angular/core';
import { ServicioCheckService } from "../checkout/servicio-check.service";
import { Order } from "../models/order.model";

@Component({
  selector: 'app-finish-pay',
  templateUrl: './finish-pay.page.html',
  styleUrls: ['./finish-pay.page.scss'],
})
export class FinishPayPage implements OnInit {

  mensaje: string;
  order = {} as Order;

  constructor(private servicioCheck: ServicioCheckService) { }

  ngOnInit() {
    this.mensaje = this.servicioCheck.getMessage();
    this.order = this.servicioCheck.getOrder();
  }

}
