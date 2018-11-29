import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class NaucnaCentralaService {

  private SERVER_URL = "http://localhost:7000";

  constructor(private http : Http) { }

  hello() {
    return this.http.get(this.SERVER_URL + "/korisnik/hello").map(res => res.toString());
  }

  login(email){
    alert('usla sam u service');
    return this.http.get(this.SERVER_URL + "/korisnik/login/" + email).map(res => res.json());
  }

  findAllMagazin(korisnikId : Number){
    alert('usla sam u service');
    return this.http.get(this.SERVER_URL + '/magazin/findAllMagazin/' + korisnikId).map(res => res.json());
  }

}
