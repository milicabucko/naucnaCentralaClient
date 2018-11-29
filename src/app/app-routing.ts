import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent} from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
    { path: '', redirectTo:'/login', pathMatch:'full'},
    { path: 'login' , component: LoginComponent},
    { path: 'homePageAutor', component: HomepageComponent}

];

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}

export const routingComponents = [

    LoginComponent, HomepageComponent

]