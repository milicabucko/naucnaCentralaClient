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

  helloPayment() {
    return this.http.get("http://localhost:9000" + "/payment/hello").map(res => res.toString());
  }

  login(email){
    return this.http.get(this.SERVER_URL + "/korisnik/login/" + email).map(res => res.json());
  }

  getActiveUser() {
    return this.http.get(this.SERVER_URL + "/getActiveUser").map(res=>res.json());
  }

  findAllMagazin(){
    return this.http.get(this.SERVER_URL + '/magazin/findAllMagazin').map(res => res.json());
  }

  izlistajSvaIzdanja(magazinId: Number){
    return this.http.get(this.SERVER_URL + '/magazin/izlistajSvaIzdanja/' + magazinId).map(res => res.json());
  }

  izlistajSveRadove(izdanjeId : Number){
    return this.http.get(this.SERVER_URL + '/izdanje/izlistajSveRadove/' + izdanjeId).map(res => res.json());
  }

}
