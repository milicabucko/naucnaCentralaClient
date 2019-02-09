import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NaucnaCentralaService } from '../naucna-centrala.service';
import { Constants } from '../constants/constants';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

export interface DialogData {
 // izdanjeId: number;
  //magazinId: number;
  //korisnik: any;
}

@Component({
  selector: 'app-izdanja-magazina',
  templateUrl: './izdanja-magazina.component.html',
  styleUrls: ['./izdanja-magazina.component.css']
})
export class IzdanjaMagazinaComponent implements OnInit {

  magazinId: number;
  izdanjaMagazina: any;
  korisnik: any;
  izdanjeId: number;



  constructor(public dialog: MatDialog, private route: ActivatedRoute, public ncService : NaucnaCentralaService, private router: Router) { }

  ngOnInit() {

    this.magazinId = parseInt(this.route.snapshot.paramMap.get('magazinId'));

    this.ncService.getActiveUser().subscribe(data =>{
      this.korisnik = data;
    })

    this.ncService.izlistajSvaIzdanja(this.magazinId).subscribe(data=>{
      console.log(data.length);
      this.izdanjaMagazina = data;
      if(data.length == 0){
        alert("Nema izdanja za ovaj magazin");
        this.router.navigate(['/homePageCitalac']);
      }
    })
  }

  prikaziRadove(izdanjeId){
    this.router.navigate(['/listaRadova', izdanjeId]);
  }

  /*kupiIzdanje(id, cena) {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: {id, cena,korisnik: this.korisnik}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }*/

  kupiIzdanje(izdanjeId, cenaIzdanja, korisnik) {
    this.ncService.portAvailablePC().subscribe(data => {
     this.ncService.executePayment(data.server, izdanjeId, Constants.TIP_PROIZVODA_IZDANJE_MAGAZINA, korisnik, cenaIzdanja, -1).subscribe(data=> {
       console.log(data);
       window.open(data);
     })
    });
  }
  
  kupiPrekoBanke(izdanjeId,cena,korisnik){
    this.ncService.executeBankPayment(izdanjeId, Constants.TIP_PROIZVODA_IZDANJE_MAGAZINA, korisnik , cena).subscribe(data=>{
      console.log(data);
     //  if(data.paymentId != null){
         window.location.href = data.url;
      // }
     //  else{
      //   alert("Doslo je do greske prilikom pokusaja kupovine! Molimo Vas da pokusate ponovo.");
      // }

    })
  }

  kupiBitCoin(id,cena,korisnik){
    this.ncService.executeBitCoin(id, Constants.TIP_PROIZVODA_IZDANJE_MAGAZINA, korisnik , cena).subscribe(data=>{
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


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ncService : NaucnaCentralaService) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  kupiIzdanje(izdanjeId, cenaIzdanja, korisnik) {
    this.ncService.portAvailablePC().subscribe(data => {
     this.ncService.executePayment(data.server, izdanjeId, Constants.TIP_PROIZVODA_IZDANJE_MAGAZINA, korisnik, cenaIzdanja, -1).subscribe(data=> {
       console.log(data);
       window.open(data);
     })
    });
  }
  
  kupiPrekoBanke(izdanjeId,cena,korisnik){
    console.log("busdbfwef");
    this.ncService.executeBankPayment(izdanjeId, Constants.TIP_PROIZVODA_IZDANJE_MAGAZINA, korisnik , cena).subscribe(data=>{
      console.log(data);
     //  if(data.paymentId != null){
         window.location.href = data.url;
      // }
     //  else{
      //   alert("Doslo je do greske prilikom pokusaja kupovine! Molimo Vas da pokusate ponovo.");
      // }

    })
  }

  kupiBitCoin(id,cena,korisnik){
    this.ncService.executeBitCoin(id, Constants.TIP_PROIZVODA_IZDANJE_MAGAZINA, korisnik , cena).subscribe(data=>{
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
