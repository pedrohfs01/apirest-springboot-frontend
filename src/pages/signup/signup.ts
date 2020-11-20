import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder:FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService) {

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
    this.estadoService.findAll().subscribe(
      response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {
      }
    );
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id).subscribe(response =>{
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    }, error =>{});
  }
  signupUser(){

  }
}
