import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../services/auth.service'

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  async googleSignIn(){
    if(await this.authService.googleSignIn()) this.router.navigateByUrl('/dashboard');
  }

}
