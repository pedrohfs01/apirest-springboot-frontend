import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder:FormBuilder) {

      this.formGroup = this.formBuilder.group({
        nome : ['pedro', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['pedro@gmail.com', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
        cpfOuCnpj: ['31192252071', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['123', [Validators.required]],
        logradouro: ['Brasilia', [Validators.required]],
        numero: ['100', [Validators.required]],
        complemento: ['Apt 100', []],
        bairro: ['Sobradinho', []],
        cep: ['73000000', [Validators.required]],
        telefone1: ['989292912', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, []]
      });
  }

  ionViewDidLoad() {
    
  }
  signupUser(){

  }
}
