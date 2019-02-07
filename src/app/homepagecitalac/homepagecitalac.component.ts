import { Component, OnInit, Inject } from '@angular/core';
import { NaucnaCentralaService } from '../naucna-centrala.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../naucni-radovi/naucni-radovi.component';
import { Constants } from '../constants/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface DialogData {
  // izdanjeId: number;
   //magazinId: number;
   //korisnik: any;
 }

@Component({
  selector: 'app-homepagecitalac',
  templateUrl: './homepagecitalac.component.html',
  styleUrls: ['./homepagecitalac.component.css']
})
export class HomepagecitalacComponent implements OnInit {

  constructor(public dialog: MatDialog, public ncService : NaucnaCentralaService, private router: Router) { }

  magazini : any;
  korisnik: any;

  ngOnInit() {

    this.ncService.findAllMagazin().subscribe(data =>{
      this.magazini = data;
    })

    this.ncService.getActiveUser().subscribe(data =>{
      this.korisnik = data;
    })
  }
  
  prikaziIzdanja(magazinId){
    this.router.navigate(['/izdanjaMagazina', magazinId]);
  }
  
  platiClanarinu(magazin){

    const dialogRef = this.dialog.open(PlatiClanarinuHomepageDialog, {
      width: '400px',
      data: {korisnik: this.korisnik, magazin: magazin}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
}

@Component({
  selector: 'plati-clanarinu-homepage-dialog',
  templateUrl: 'plati-clanarinu-homepage-dialog.html',
})
export class PlatiClanarinuHomepageDialog {

  clanarinaForm: FormGroup;
  cena: Number;

  constructor(
    public dialogRef: MatDialogRef<PlatiClanarinuHomepageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ncService : NaucnaCentralaService) {}

  ngOnInit() {
    this.clanarinaForm = new FormGroup({
      brojMeseci: new FormControl(1, [Validators.required]),
    })
    this.cena = this.clanarinaForm.value.brojMeseci * this.data.magazin.cenovnikClanarine.cena;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  platiClanarinu() {
    this.ncService.portAvailablePC().subscribe(data => {
      this.ncService.executePayment(data.server, this.data.magazin.magazin.id, Constants.CLANARINA, this.data.korisnik.id, this.cena, this.clanarinaForm.value.brojMeseci).subscribe(data=> {
        console.log(data);
        window.open(data);
      })
    });
  }

  izracunajCenuClanarine() {
    this.cena = this.clanarinaForm.value.brojMeseci * this.data.magazin.cenovnikClanarine.cena;
  }
  

}