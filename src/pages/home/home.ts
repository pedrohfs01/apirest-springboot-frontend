import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    public authService: AuthService,
    public storage: StorageService) {

  }
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    if (this.storage.getLocalUser() != null) {
      this.authService.refreshToken().subscribe(
        response => {
          this.authService.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot("CategoriasPage");
        }, error => { });
    }
  }

  login() {
    this.authService.authenticate(this.creds).subscribe(
      response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot("CategoriasPage");
      }, error => { });
  }
  signup() {
    this.navCtrl.push("SignupPage");
  }
}
