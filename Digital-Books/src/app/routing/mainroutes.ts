import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";
import { MyorderComponent } from "../myorder/myorder.component";
import { PurchasebookComponent } from "../purchasebook/purchasebook.component";
import { RegistrationComponent } from "../registration/registration.component";
import { AuthguardService } from "../services/authguard.service";

export const Mainroutes = [
     { path: '', component: HomeComponent },
     { path: 'reader', loadChildren:() => import('../reader/reader.module').then (m => m.ReaderModule)},
     { path: 'author',canActivate:[AuthguardService], loadChildren: () => import('../author/author.module').then (m => m.AuthorModule)},
     { path: 'home', component: HomeComponent },
     { path: 'author/home/newuser',component:RegistrationComponent },
     { path: 'login/newuser',component:RegistrationComponent },
     { path: 'login', component: LoginComponent },
     { path: 'purchasebook', component: PurchasebookComponent },
     { path: 'reader/add/purchasebook/:id', component: PurchasebookComponent},
     { path: 'home/purchasebook', component: PurchasebookComponent },
     { path: 'myorders', component: MyorderComponent },
     //{ path: 'author/login/newuser', loadChildren: () => import('../registration/registration.module').then (m => m.RegistrationModule)},
    
];
