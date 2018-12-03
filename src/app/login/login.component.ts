import { Component, OnInit } from '@angular/core';
import { NaucnaCentralaService } from '../naucna-centrala.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(public ncService : NaucnaCentralaService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      lozinka: new FormControl('',[Validators.required])
    })
  }

  //zameniti sve alerte dijalozima

  login(){
    let email = this.loginForm.value.email;
    let lozinka = this.loginForm.value.lozinka;
    if(email === "" || lozinka === "" ){
      if(email === ""){
        alert("Unesite Vas email!");
      } 
      else if(lozinka === ""){
        alert("Unesite Vas lozinku!");
      }
    }else{
      this.ncService.login(email).subscribe(data =>{
      //alert("usla u metodu");
      if(data.lozinka === this.loginForm.value.lozinka){
        if(data.uloga === "AUTOR"){
          console.log("Ja sam AUTOR");
          this.router.navigate(['/homePageAutor']);
        }else{
          console.log("Ja sam CITALAC");
          this.router.navigate(['/homePageCitalac']);
         }
        }else{
          alert("Neispravan email ili lozinka");
        }
     })
    }
  }

  zdravo() {
    this.ncService.hello().subscribe(
      data => {
        alert(data);
      }
    )
  }

  

}
