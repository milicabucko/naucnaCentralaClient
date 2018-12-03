import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NaucnaCentralaService } from '../naucna-centrala.service';

@Component({
  selector: 'app-izdanja-magazina',
  templateUrl: './izdanja-magazina.component.html',
  styleUrls: ['./izdanja-magazina.component.css']
})
export class IzdanjaMagazinaComponent implements OnInit {

  magazinId: number;
  izdanjaMagazina: any;
  korisnik: any;

  constructor(private route: ActivatedRoute, public ncService : NaucnaCentralaService) { }

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




}
