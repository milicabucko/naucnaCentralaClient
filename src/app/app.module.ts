import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule,routingComponents } from './app-routing';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

//MATERIALS
import {
  MatAutocompleteModule,  MatButtonModule,  MatButtonToggleModule,  MatCardModule,  MatCheckboxModule,
  MatChipsModule,  MatDatepickerModule,  MatDialogModule,  MatExpansionModule,  MatGridListModule,
  MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,
  MatProgressBarModule,  MatProgressSpinnerModule,  MatRadioModule,  MatRippleModule,  MatSelectModule,
  MatSidenavModule,  MatSliderModule,  MatSlideToggleModule,  MatSnackBarModule,  MatSortModule,
  MatTableModule,  MatTabsModule,  MatToolbarModule,  MatTooltipModule,  MatStepperModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//SERVISI
import { NaucnaCentralaService } from './naucna-centrala.service';

//COMPONENTS
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { IzdanjaMagazinaComponent } from './izdanja-magazina/izdanja-magazina.component';
import { HomepagecitalacComponent } from './homepagecitalac/homepagecitalac.component';
import { PosaljiRadComponent } from './posalji-rad/posalji-rad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    IzdanjaMagazinaComponent,
    HomepagecitalacComponent,
    PosaljiRadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule, AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,  MatButtonModule,  MatButtonToggleModule,  MatCardModule,  MatCheckboxModule,
    MatChipsModule,  MatDatepickerModule,  MatDialogModule,  MatExpansionModule,  MatGridListModule,
    MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,
    MatProgressBarModule,  MatProgressSpinnerModule,  MatRadioModule,  MatRippleModule,  MatSelectModule,
    MatSidenavModule,  MatSliderModule,  MatSlideToggleModule,  MatSnackBarModule,  MatSortModule,
    MatTableModule,  MatTabsModule,  MatToolbarModule,  MatTooltipModule,  MatStepperModule

  ],
  providers: [NaucnaCentralaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
