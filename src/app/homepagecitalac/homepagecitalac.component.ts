import { Component, OnInit } from '@angular/core';
import { NaucnaCentralaService } from '../naucna-centrala.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepagecitalac',
  templateUrl: './homepagecitalac.component.html',
  styleUrls: ['./homepagecitalac.component.css']
})
export class HomepagecitalacComponent implements OnInit {

  constructor(public ncService : NaucnaCentralaService, private router: Router) { }

  magazini : any;

  ngOnInit() {

    this.ncService.findAllMagazin().subscribe(data =>{
      this.magazini = data;
    })
  }
  
  prikaziIzdanja(magazinId){
    this.router.navigate(['/izdanjaMagazina', magazinId]);
  }
}
