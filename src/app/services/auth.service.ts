import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AngularFireAuth } from "@angular/fire/auth"
import * as firebase from "firebase/app";
import AuthProvider = firebase.auth.AuthProvider;

import { RoomService } from "./../services/room.service"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: Storage, private firebaseAuth: AngularFireAuth, private roomService: RoomService) {}

  async googleSignIn(){
    return await this.authSignIn(new firebase.auth.GoogleAuthProvider);
  }

  // autoSignIn(){
  //   return new Promise(resolve => {
  //     this.storage.get('credential').then((credential)=>{
  //       this.firebaseAuth.auth.signInWithCredential(credential).then((result) => {
  //         console.log(result.user, result.credential);
  //         this.storage.set('credential', result.credential);
  //         this.roomService.connectfirebaseDB(result.user.uid);
  //         resolve(true)
  //       }).catch((error)=>{
  //         console.log(error);
  //         resolve(false);
  //       });
  //     })
  //   });
  // }

  authSignIn(provider: AuthProvider){
    return new Promise(resolve => {
      if (!(<any>window).cordova) {
        this.firebaseAuth.auth.signInWithPopup(provider).then((result) => {
          console.log(result.user, result.credential);
          this.storage.set('credential', result.credential);
          this.roomService.connectfirebaseDB(result.user.uid);
          resolve(true);
        }).catch((error)=>{
          console.log(error);
          resolve(false);
        });
      } else {
        this.firebaseAuth.auth.signInWithRedirect(provider).then(() => {
          this.firebaseAuth.auth.getRedirectResult().then((result) => {
            console.log(result.user, result.credential);
            this.storage.set('credential', result.credential);
            this.roomService.connectfirebaseDB(result.user.uid);
            resolve(true);
          }).catch((error)=>{
            console.log(error);
            resolve(false);
          });
        });
      }
    });
  }

  authSignOut(){
    this.firebaseAuth.auth.signOut();
    this.roomService.disconnectfirebaseDB();
  }

}
