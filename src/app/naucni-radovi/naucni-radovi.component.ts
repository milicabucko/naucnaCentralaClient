import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NaucnaCentralaService } from '../naucna-centrala.service';
import { Constants } from '../constants/constants';
import {  DialogData } from '../izdanja-magazina/izdanja-magazina.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

export interface DialogData {
  // izdanjeId: number;
   //magazinId: number;
   //korisnik: any;
 }

@Component({
  selector: 'app-naucni-radovi',
  templateUrl: './naucni-radovi.component.html',
  styleUrls: ['./naucni-radovi.component.css']
})
export class NaucniRadoviComponent implements OnInit {
  
  izdanjeId : number;
  radovi: any;
  korisnik: any;

  constructor(public dialog: MatDialog,private route: ActivatedRoute, public ncService : NaucnaCentralaService, private router: Router) { }

  

  ngOnInit() {
    
    this.izdanjeId = parseInt(this.route.snapshot.paramMap.get('izdanjeId'));

    this.ncService.getActiveUser().subscribe(data =>{
      this.korisnik = data;
    })

    this.ncService.izlistajSveRadove(this.izdanjeId).subscribe(data=>{
      console.log(data);
      this.radovi = data;
      if(data.length == 0){
        alert("Trenutno radova za ovo izdanje");

        this.router.navigate(['/homePageCitalac']);
      }
    })
  }

  kupiRad(id, cena, korisnik){
    this.ncService.portAvailablePC().subscribe(data => {
      this.ncService.executePayment(data.server, id, Constants.TIP_PROIZVODA_NAUCNI_RAD, korisnik, cena, -1).subscribe(data=> {
        console.log(data);
        window.open(data);
      })
    });
  }

  kupiBitCoin(id,cena,korisnik){
    this.ncService.portAvailablePC().subscribe(data => {
      this.ncService.executeBitCoin(id, Constants.TIP_PROIZVODA_NAUCNI_RAD, korisnik , cena).subscribe(data=>{
        console.log(data);
        var array = data.split(',')
        var paymentUrl = array[0];
        console.log(paymentUrl);
        document.location.href =paymentUrl;
        var transactionId = array[1];
        this.ncService.saveBitCoinTransaction(id, Constants.TIP_PROIZVODA_NAUCNI_RAD, korisnik , cena, transactionId).subscribe(data=>{
          console.log(data);
        })
      })
   });
  }


  kupiPrekoBanke(id,cena,korisnik){
    console.log("busdbfwef");
    this.ncService.executeBankPayment(id, Constants.TIP_PROIZVODA_NAUCNI_RAD, korisnik , cena).subscribe(data=>{
      console.log(data);

      //if(data.paymentId != null){
        window.location.href = data.url;
      //}
      //else{
        //alert("Doslo je do greske prilikom pokusaja kupovine! Molimo Vas da pokusate ponovo.");
      //}

    })
  }
}



@Component({
  selector: 'naucni-radovi-dialog',
  templateUrl: 'naucni-radovi-dialog.html',
})
export class NaucniRadoviDialog {

  constructor(
    public dialogRef: MatDialogRef<NaucniRadoviDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ncService : NaucnaCentralaService) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  kupiRad(id, cena, korisnik){
    this.ncService.portAvailablePC().subscribe(data => {
      this.ncService.executePayment(data.server, id, Constants.TIP_PROIZVODA_NAUCNI_RAD, korisnik, cena, -1).subscribe(data=> {
        console.log(data);
        window.open(data);
      })
    });
  }

  kupiPrekoBanke(id,cena,korisnik){
    console.log("busdbfwef");
    this.ncService.executeBankPayment(id, Constants.TIP_PROIZVODA_NAUCNI_RAD, korisnik , cena).subscribe(data=>{
      console.log(data);

      //if(data.paymentId != null){
        window.location.href = data.url;
      //}
      //else{
        //alert("Doslo je do greske prilikom pokusaja kupovine! Molimo Vas da pokusate ponovo.");
      //}

    })
  }

  kupiBitCoin(id,cena,korisnik){
    this.ncService.executeBitCoin(id, Constants.TIP_PROIZVODA_NAUCNI_RAD, korisnik , cena).subscribe(data=>{
      console.log(data);
      var array = data.split(',')
      var paymentUrl = array[0];
      console.log(paymentUrl);
      document.location.href =paymentUrl;
      var transactionId = array[1];
      this.ncService.saveBitCoinTransaction(id, Constants.TIP_PROIZVODA_NAUCNI_RAD, korisnik , cena, transactionId).subscribe(data=>{
        console.log(data);
      })
    })
  }

}
