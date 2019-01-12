import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NaucnaCentralaService } from '../naucna-centrala.service';
import { Constants } from '../constants/constants';

@Component({
  selector: 'app-naucni-radovi',
  templateUrl: './naucni-radovi.component.html',
  styleUrls: ['./naucni-radovi.component.css']
})
export class NaucniRadoviComponent implements OnInit {
  
  izdanjeId : number;
  radovi: any;
  korisnik: any;

  constructor(private route: ActivatedRoute, public ncService : NaucnaCentralaService, private router: Router) { }

  

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

  kupiRad(id, cena) {
    this.ncService.executePayment(id, Constants.TIP_PROIZVODA_NAUCNI_RAD, this.korisnik.id, cena).subscribe(data=> {
      console.log(data);
      window.open(data);
    })
   
  }

}
