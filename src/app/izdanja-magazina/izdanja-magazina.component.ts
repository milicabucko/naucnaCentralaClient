import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NaucnaCentralaService } from '../naucna-centrala.service';
import { Constants } from '../constants/constants';

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

  constructor(private route: ActivatedRoute, public ncService : NaucnaCentralaService, private router: Router) { }

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

  kupiIzdanje(izdanjeId, cenaIzdanja) {
    this.ncService.executePayment(izdanjeId, Constants.TIP_PROIZVODA_IZDANJE_MAGAZINA, this.korisnik.id, cenaIzdanja).subscribe(data=> {
      console.log(data);
      window.open(data);
    })

   
  }

  kupiIzdanjeBitCoin(amount, naziv) {
    this.ncService.executeBitCoin(naziv, amount).subscribe(data=> {
      
    })

  }


}
