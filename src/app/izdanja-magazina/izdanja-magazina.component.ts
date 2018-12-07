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
      console.log(data);
      this.izdanjaMagazina = data;
    })
  }

  prikaziRadove(izdanjeId){
    this.router.navigate(['/listaRadova', izdanjeId]);
  }

  kupiIzdanje(izdanjeId) {
    this.ncService.executePayment(izdanjeId, Constants.TIP_PROIZVODA_IZDANJE_MAGAZINA, this.korisnik.id, 4).subscribe(data=> {
      
    })

   
  }

  kupiIzdanjeBitCoin(amount, naziv) {
    this.ncService.executeBitCoin(naziv, amount).subscribe(data=> {
      
    })

  }


}
