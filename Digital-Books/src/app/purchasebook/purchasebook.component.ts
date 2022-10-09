import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Author } from '../author/author.model';
import { PurchaseData } from '../models/purchasedata';
import { LoginServiceService } from '../services/login-service.service';


@Component({
  selector: 'app-purchasebook',
  templateUrl: './purchasebook.component.html',
  styleUrls: ['./purchasebook.component.css']
})
export class PurchasebookComponent implements OnInit {
  id: any; //bookid
  userId:any;
  constructor(private http: HttpClient,private route: ActivatedRoute,private _auth:LoginServiceService) { }

  ngOnInit(): void {
    debugger
    this.id=this.route.snapshot.paramMap.get("id");
    this.GetBookDetailById(this.id);
    this.GetUserId();
    //this.myVar = this.route.snapshot.data['input'];
  }
  PurchaseModel: PurchaseData = new PurchaseData();
  PurchaseModels: Array<PurchaseData> = new Array<PurchaseData>();
  ModelData :Array<Author> = new Array<Author>();


  GetUserId()
  {
      this.userId=this._auth.getUserId();
  }
  GetBookDetailById(input:any) {
    debugger;
    this.http.get("https://localhost:44307/api/Reader/GetAuthorBookByAuthorBookID?authorBookId="+input).subscribe(res => this.PostSuccess(res), res => console.log(res));
  }
  PostSuccess(input: any) {
    debugger;
    console.log(input);
    this.ModelData = input;
  }

  SaveBookOrder(event:any) {
    debugger;
    for(let obj of this.ModelData)
    {
      this.PurchaseModel.amount= Number(obj.price) ;
    }
    
    var convertto = {
      
      authorBookId: Number(this.id),
      userId: Number(this.userId),
      amount: Number(this.PurchaseModel.amount),
      cardHolderName: this.PurchaseModel.cardHolderName,
      cardNumber:this.PurchaseModel.cardNumber,
      paymentMethod:this.PurchaseModel.paymentMethod,
      cvv:this.PurchaseModel.cvv,
      pincode:this.PurchaseModel.pincode,
      address:this.PurchaseModel.address
    };
   
      //this.authorBookId= String(this.PurchaseModel.authorBookId);
     
      this.http.post("https://localhost:44322/api/Order/SaveBookOrder", convertto).subscribe(res => this.Success(res), res => console.log(res))
    this.PurchaseModel = new PurchaseData();
  }
  Success(input: any) {
   this.GetAllReaderOrdersById(this.userId)
  }
  GetAllReaderOrdersById(input:any)
  {
    this.http.get("https://localhost:44307/api/Payment/GetAllReaderOrdersById?userId="+input).subscribe(res => this.PostSuccess1(res), res => console.log(res));
  }
  PostSuccess1(input: any) {
    console.log("success");
   }
 private selectedLink: string="New";        

setradio(e: string): void {
    this.selectedLink = e;  
}  

isSelected(name: string): boolean {  

    if (!this.selectedLink) { 
            return false;  
    }    

    return (this.selectedLink === name);   
} 
}
