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
      email: new FormControl('',[Validators.required, Validators.email]),
      lozinka: new FormControl('',[Validators.required])
    })
  }

  //zameniti sve alerte dijalozima

  login(){
    
    this.ncService.login(this.loginForm.value.email, this.loginForm.value.lozinka).subscribe(data =>{
    
      if (data.id === -1) {
        this.loginForm.reset();
        alert('Nepostojeci korisnik!');
      }
      else if(data.uloga === "AUTOR"){
        console.log("Ja sam AUTOR");
        this.router.navigate(['/homePageAutor']);
      } 
      else {
        console.log("Ja sam CITALAC");
        this.router.navigate(['/homePageCitalac']);
      }
    
    })
    
  }

  zdravo() {
    this.ncService.hello().subscribe(
      data => {
        alert(data);
      }
    )
  }

  

}
