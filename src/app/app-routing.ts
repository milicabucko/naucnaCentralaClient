import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent} from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { IzdanjaMagazinaComponent } from './izdanja-magazina/izdanja-magazina.component';
import { HomepagecitalacComponent } from './homepagecitalac/homepagecitalac.component';

const routes: Routes = [
    { path: '', redirectTo:'/login', pathMatch:'full'},
    { path: 'login' , component: LoginComponent},
    { path: 'homePageAutor', component: HomepageComponent},
    { path: 'izdanjaMagazina/:magazinId', component: IzdanjaMagazinaComponent},
    { path: 'homePageCitalac', component: HomepagecitalacComponent}

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

    LoginComponent, HomepageComponent, IzdanjaMagazinaComponent,
    HomepagecitalacComponent

]