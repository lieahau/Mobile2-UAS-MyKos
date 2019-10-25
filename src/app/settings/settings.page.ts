import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  numberOfRooms = 0;
  roomIdValue: 'numeric' | 'alphabetic' = 'numeric';
  maxDueDate = 30;

  constructor(
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async setNumberOfRooms() {
    const alert = await this.alertController.create({
      header: 'Number of rooms',
      inputs: [
        {
          name: 'numberOfRooms',
          placeholder: 'How many room?',
          type: 'number',
          value: this.numberOfRooms
        }
      ],
      buttons: [
        {
          role: 'cancel',
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: (value) => {
            console.log(value);
            this.numberOfRooms = Math.round(value.numberOfRooms);
          }
        }
      ]
    });

    await alert.present();
  }

  async setRoomIdValue() {
    const alert = await this.alertController.create({
      header: 'Room ID value',
      inputs: [
        {
          name: 'numeric',
          type: 'radio',
          label: 'Numeric',
          checked: this.roomIdValue === 'numeric',
          value: 'numeric'
        },
        {
          name: 'alphabetic',
          type: 'radio',
          label: 'Alphabetic',
          checked: this.roomIdValue === 'alphabetic',
          value: 'alphabetic'
        }
      ],
      buttons: [
        {
          role: 'cancel',
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: (value) => {
            console.log(value);
            this.roomIdValue = value;
          }
        }
      ]
    });

    await alert.present();
  }

  async setMaxDueDate() {
    const alert = await this.alertController.create({
      header: 'Maximal due date',
      inputs: [
        {
          name: 'maxDueDate',
          placeholder: 'How many day?',
          type: 'number',
          value: this.maxDueDate
        }
      ],
      buttons: [
        {
          role: 'cancel',
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: (value) => {
            console.log(value);
            this.maxDueDate = Math.round(value.maxDueDate);
          }
        }
      ]
    });

    await alert.present();
  }
}
