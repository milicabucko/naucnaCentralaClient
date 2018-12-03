import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NaucnaCentralaService } from '../naucna-centrala.service';

@Component({
  selector: 'app-naucni-radovi',
  templateUrl: './naucni-radovi.component.html',
  styleUrls: ['./naucni-radovi.component.css']
})
export class NaucniRadoviComponent implements OnInit {
  
  izdanjeId : number;
  radovi: any;

  constructor(private route: ActivatedRoute, public ncService : NaucnaCentralaService, private router: Router) { }

  

  ngOnInit() {
    
    this.izdanjeId = parseInt(this.route.snapshot.paramMap.get('izdanjeId'));

    this.ncService.izlistajSveRadove(this.izdanjeId).subscribe(data=>{
      console.log(data);
      this.radovi = data;
    })
  }

}
