import { Component, OnInit } from '@angular/core';
import { NaucnaCentralaService } from '../naucna-centrala.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  magazini: any;

  constructor(public ncService : NaucnaCentralaService) { }

  ngOnInit() {
    this.ncService.findAllMagazin(1).subscribe(data =>{
      this.magazini = data;
    })
  }


}
