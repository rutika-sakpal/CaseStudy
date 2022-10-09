// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { LoginServiceService } from '../services/login-service.service';

// import { PurchasebookComponent } from './purchasebook.component';

// describe('PurchasebookComponent', () => {
//   let component: PurchasebookComponent;
//   let fixture: ComponentFixture<PurchasebookComponent>;

//   beforeEach(async () => {
//     let http:HttpClient;
//     let router:ActivatedRoute;
//     let author:LoginServiceService;
//     await TestBed.configureTestingModule({
//       declarations: [ PurchasebookComponent ],
    
//       imports:[HttpClientTestingModule,HttpClientModule,RouterModule,ActivatedRoute,HttpClient],
//     })
//     .compileComponents();
//     http=TestBed.inject(HttpClient);
//     router=TestBed.inject(ActivatedRoute);
//     author=TestBed.inject(LoginServiceService);
  
//     fixture = TestBed.createComponent(PurchasebookComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it(`should have a data search'`, (() => {
//     fixture = TestBed.createComponent(PurchasebookComponent);
//     component = fixture.debugElement.componentInstance;
//     let data=component.GetUserId();
//     expect(data).toEqual();
//   }));
// });
