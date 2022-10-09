import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderData } from '../models/orderdata';
import { PurchaseData } from '../models/purchasedata';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
public userId:any;
display = "none";
ModelData :Array<OrderData> = new Array<OrderData>();
OrderData :Array<OrderData> = new Array<OrderData>();
  constructor(private http: HttpClient, private _auth: LoginServiceService) { }


  ngOnInit(): void {
    this.GetUserId();
    this.GetAllReaderOrdersById(this.userId);

  }

  openModal(input:any) {
    this.GetOrderByOrderId(input);
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    
  } 
  GetUserId() {
    this.userId = this._auth.getUserId();
  }
  GetAllReaderOrdersById(input:any)
  {
    this.http.get("https://localhost:44307/api/Payment/GetAllReaderOrdersById?userId="+input).subscribe(res => this.PostSuccess1(res), res => console.log(res));
  }
  PostSuccess1(input: any) {
    console.log("success");
    this.ModelData = input;
   }
   GetOrderByOrderId(input:any)
   {
    this.http.get("https://localhost:44307/api/Payment/GetOrderByOrderId?orderId="+input).subscribe(res => this.AfterSuccess(res), res => console.log(res));

   }
   AfterSuccess(input: any) {
    console.log("success");
    this.OrderData = input;
   }

   CancelOrder(orderID:any)
   {
     debugger;
     this.http.put("https://localhost:44307/api/Payment/CancelOrder",orderID).subscribe(res => this.AfterSuccess1(res), res => console.log(res));   
   }
   AfterSuccess1(input: any) {
    console.log("success");
    this.onCloseHandled();
   }
  

}
