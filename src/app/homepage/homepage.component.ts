import { Component, OnInit } from '@angular/core';
import { NaucnaCentralaService } from '../naucna-centrala.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  magazini: any;
  korisnik: any;

  constructor(public ncService : NaucnaCentralaService, private router: Router) { }

  ngOnInit() {

    this.ncService.getActiveUser().subscribe(data =>{
      this.korisnik = data;
    })

    this.ncService.findAllMagazin().subscribe(data =>{
      this.magazini = data;
    })
  }


  prikaziIzdanja(magazinId){
    this.router.navigate(['/izdanjaMagazina', magazinId]);
  }


}