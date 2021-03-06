import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Constants } from './constants/constants';

@Injectable()
export class NaucnaCentralaService {

  private SERVER_URL = "https://localhost:7000";
  private PAYMENT_CONCENTRATOR_URL = "https://localhost:9000";

  constructor(private http : Http) { }

  hello() {
    return this.http.get(this.SERVER_URL + "/korisnik/hello").map(res => res.toString());
  }

  portAvailablePC() {
    return this.http.get(this.SERVER_URL + "/util/paymentConcentratorServer").map(res => res.json());
  }

  registration(korisnik: any) {

    korisnik.banka = false;
    korisnik.paypal = false;
    korisnik.bitcoin = false;

    if (korisnik.tipoviPlacanja.includes(Constants.TIP_PLACANJA_BANKA)) {
      korisnik.banka = true;
    }
    if (korisnik.tipoviPlacanja.includes(Constants.TIP_PLACANJA_PAYPAL)) {
      korisnik.paypal = true;
    }
    if (korisnik.tipoviPlacanja.includes(Constants.TIP_PLACANJA_BITCOIN)) {
      korisnik.bitcoin = true;
    }

    return this.http.post(this.SERVER_URL + "/korisnik/registration", korisnik).map(res => res.text());

  }

  commonPasswordsCheck(lozinka) {
    return this.http.get(this.SERVER_URL + "/korisnik/commonPassword/" + lozinka).map(res => res.json());
  }

  executePayment(pcURL: String, proizvodId: Number, tipProizvoda: String, korisnikId: Number, cena: Number, brojMeseci: number) {
    console.log("PC url: " + pcURL);
    var kupovina : any;
    kupovina = {};
    kupovina.proizvodId = proizvodId;
    kupovina.tipProizvoda = tipProizvoda;
    kupovina.korisnikId = korisnikId;
    kupovina.cena = cena;
    kupovina.brojMeseci = brojMeseci;
    return this.http.post(pcURL + "/payment/execute", kupovina).map(res => res.text());
  }

  executeBitCoin(proizvodId: Number, tipProizvoda: String, korisnikId: Number, cena: Number) {
    var kupovina : any;
    kupovina = {};
    kupovina.proizvodId = proizvodId;
    console.log(proizvodId);
    kupovina.tipProizvoda = tipProizvoda;
    kupovina.korisnikId = korisnikId;
    kupovina.cena = cena;
    return this.http.post(this.PAYMENT_CONCENTRATOR_URL + "/api/bitcoin", kupovina).map(res => res.text());
  }

  saveBitCoinTransaction(proizvodId: Number, tipProizvoda: String, korisnikId: Number, cena: Number, transactionId: String) {
    var kupovina : any;
    kupovina = {};
    kupovina.proizvodId = proizvodId;
    console.log(proizvodId);
    kupovina.tipProizvoda = tipProizvoda;
    kupovina.korisnikId = korisnikId;
    kupovina.cena = cena;
    kupovina.transactionId = transactionId;
    return this.http.post(this.SERVER_URL + "/api/addBitCoin", kupovina).map(res => res.text());
  }

  executeBankPayment(proizvodId: Number, tipProizvoda: String, korisnikId: Number, cena: Number) {
    var kupovina : any;
    kupovina = {};
    kupovina.proizvodId = proizvodId;
    kupovina.tipProizvoda = tipProizvoda;
    kupovina.korisnikId = korisnikId;
    kupovina.cena = cena;
    kupovina.tenantID = 1;
    return this.http.post(this.SERVER_URL + "/api/bankPayment", kupovina).map(res => res.json());
  }

  login(email, lozinka){
    return this.http.get(this.SERVER_URL + "/korisnik/login/" + email + '/' + lozinka).map(res => res.json());
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
