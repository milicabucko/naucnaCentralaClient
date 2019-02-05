import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NaucnaCentralaService } from '../naucna-centrala.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../constants/constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  isBitcoin: Boolean;
  isCommonPassword: Boolean;

  constructor(private router: Router, private route: ActivatedRoute, private naucnaCentralaService: NaucnaCentralaService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      ime: new FormControl('', [Validators.required]),
      prezime: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      lozinka: new FormControl('', [Validators.required]),
      uloga: new FormControl('', [Validators.required]),
      tipoviPlacanja: new FormControl('', [Validators.required]),
      token: new FormControl('', null)
    })

    this.isBitcoin = false;
    this.isCommonPassword = false;
  }

  save() {
    this.naucnaCentralaService.registration(this.registrationForm.value).subscribe(data=>{
      console.log(data);
    })
  }

  somethingChanged() {

    if (this.registrationForm.value.tipoviPlacanja.includes(Constants.TIP_PLACANJA_BITCOIN)) {
      this.isBitcoin = true;
      this.registrationForm.controls['token'].setValidators([Validators.required]);
      this.registrationForm.controls['token'].setValue("");
    }
    else {
      this.isBitcoin = false;
      this.registrationForm.controls['token'].setErrors(null);
    }

  }

  commonPasswordsCheck() {
    if (this.registrationForm.value.lozinka != "") {
      this.naucnaCentralaService.commonPasswordsCheck(this.registrationForm.value.lozinka).subscribe(data=>{
        this.isCommonPassword = data;
      })
    }
  }

  uloge = [
    {value: Constants.ULOGA_AUTOR, viewValue: 'Autor'},
    {value: Constants.ULOGA_CITALAC, viewValue: 'Citalac'}
  ];

  tipovi = [
    {value: Constants.TIP_PLACANJA_BANKA, viewValue: 'Banka'},
    {value: Constants.TIP_PLACANJA_PAYPAL, viewValue: 'PayPal'},
    {value: Constants.TIP_PLACANJA_BITCOIN, viewValue: 'BitCoin'}
  ];

}
