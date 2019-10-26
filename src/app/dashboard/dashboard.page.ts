import { Component, OnInit, NgZone } from '@angular/core';
import { Room } from './../services/room.model';
import { AlertController } from '@ionic/angular';

import { RoomService } from "./../services/room.service";
import * as Fuse from 'fuse.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  // roomList will contain non modifiedRoomList
  roomList: Room[];

  // modified room list will contain sorted, searched room list
  // use this for ui
  modifiedRoomList: Room[];

  // variable untuk menentukan terakhir kali sortby ?
  sortby: 'byName' | 'byId' | 'byDeadline' = 'byName';

  // variable untuk menentukan terakhir kali search
  lastSearch = '';

  constructor(
    private roomService: RoomService,
    private alertController: AlertController,
    private ngZone: NgZone
  ) { 
    this.roomService.observeRoomList().subscribe(()=>{
      this.ngZone.run(() => this.getData());
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getData();
  }

  getData(){
    this.roomList = this.roomService.getRoomList();
    this.modifiedRoomList = this.roomList.map(value => value);
  }

  async sort() {
    const alert = await this.alertController.create({
      header: 'Sort',
      inputs: [
        {
          name: 'byName',
          type: 'radio',
          label: 'Sort by name',
          checked: this.sortby === 'byName',
          value: 'byName'
        },
        {
          name: 'byId',
          type: 'radio',
          label: 'Sort by ID',
          checked: this.sortby === 'byId',
          value: 'byId'
        },
        {
          name: 'byDeadline',
          type: 'radio',
          label: 'Sort by deadline',
          checked: this.sortby === 'byDeadline',
          value: 'byDeadline'
        }
      ],
      buttons: [
        {
          role: 'cancel',
          text: 'Cancel'
        },
        {
          text: 'Sort',
          handler: (value) => {
            console.log(value);
            this.sortby = value;
            // sort
            if (this.sortby === 'byName') {
              this.modifiedRoomList = this.modifiedRoomList.sort(
                (a: Room, b: Room) => {
                  if (a.name < b.name) {
                    return -1;
                  } else if (a.name > b.name) {
                    return 1;
                  } else {
                    return 0;
                  }
                }
              );
            } else if (this.sortby === 'byId') {
              this.modifiedRoomList = this.modifiedRoomList.sort(
                (a: Room, b: Room) => {
                  if (a.id < b.id) {
                    return -1;
                  } else if (a.id > b.id) {
                    return 1;
                  } else {
                    return 0;
                  }
                }
              );
            } else if (this.sortby === 'byDeadline') {
              this.modifiedRoomList = this.modifiedRoomList.sort(
                (a: Room, b: Room) => {
                  if (a.getPaymentDeadline() < b.getPaymentDeadline()) {
                    return -1;
                  } else if (a.getPaymentDeadline() > b.getPaymentDeadline()) {
                    return 1;
                  } else {
                    return 0;
                  }
                }
              );
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async search() {
    const alert = await this.alertController.create({
      header: 'Search',
      inputs: [
        {
          name: 'search',
          placeholder: 'Input Name...',
          type: 'text',
          value: this.lastSearch
        }
      ],
      buttons: [
        {
          role: 'cancel',
          text: 'Cancel'
        },
        {
          text: 'Search',
          handler: (value) => {
            console.log(value);
            this.lastSearch = value.search;
            // reset if search is blank
            if (this.lastSearch === '') {
              this.modifiedRoomList = this.roomList.map(value => value);
            } else {
              // search
              const fuse = new Fuse(
                this.modifiedRoomList,
                {
                  keys: ['name']
                }
              );

              this.modifiedRoomList = fuse.search(this.lastSearch);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  getDue(id: number){
    return this.roomService.getDue(id);
  }

  getID(id: number){
    return this.roomService.convertID(id);
  }

  coba(){
    return this.roomService.coba();
  }
}
