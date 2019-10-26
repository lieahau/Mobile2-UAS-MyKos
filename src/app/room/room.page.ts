import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Room } from './../services/room.model';
import { RoomService } from "./../services/room.service"
 
@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  room: Room;

  constructor(public alertController: AlertController, public route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.room = this.roomService.getRoom(paramMap.get('id'));
    });
  }

  inputName(){
    let inputs = [
      {
        name: 'name',
        placeholder: 'Input Name...',
        type: 'text',
        value: this.room.name
      }
    ];
    let buttons = [
      {
        role: 'cancel',
        text: 'Cancel'
      },
      {
        text: 'Ok',
        handler: (value) => {
          this.room.name = value.name;
          this.roomService.updateRoom(this.room.id, this.room);
        }
      }
    ];
    this.alertPresent('Name', inputs, buttons);
  }

  inputContact(){
    let inputs = [
      {
        name: 'contact',
        placeholder: 'Input Contact...',
        type: 'number',
        value: this.room.contact
      }
    ];
    let buttons = [
      {
        role: 'cancel',
        text: 'Cancel'
      },
      {
        text: 'Ok',
        handler: (value) => {
          this.room.contact = value.contact;
          this.roomService.updateRoom(this.room.id, this.room);
        }
      }
    ];
    this.alertPresent('Contact', inputs, buttons);
  }

  
  inputArrivalDate(){
    let inputs = [
      {
        name: 'date',
        placeholder: 'Input Date...',
        type: 'Date',
        value: this.nyeh(this.room.getArrivalDate())
      }
    ];
    let buttons = [
      {
        role: 'cancel',
        text: 'Cancel'
      },
      {
        text: 'Ok',
        handler: (value) => {
          this.room.setArrivalDate(new Date(value.date));
          this.roomService.updateRoom(this.room.id, this.room);
        }
      }
    ];
    this.alertPresent('Arrival', inputs, buttons);
  }

  inputPaymentDeadline(){
    let inputs = [
      {
        name: 'date',
        placeholder: 'Input Date...',
        type: 'Date',
        value: this.nyeh(this.room.getPaymentDeadline())
      }
    ];
    let buttons = [
      {
        role: 'cancel',
        text: 'Cancel'
      },
      {
        text: 'Ok',
        handler: (value) => {
          this.room.setPaymentDeadline(new Date(value.date));
          this.roomService.updateRoom(this.room.id, this.room);
        }
      }
    ];
    this.alertPresent('Deadline', inputs, buttons);
  }

  async alertPresent(header: string, inputs, buttons = [{text: "Ok"}]) {
    const alert = await this.alertController.create({
      header: header,
      inputs: inputs,
      buttons: buttons
    });
    await alert.present();
  }

  getID(id: number){
    return this.roomService.convertID(id);
  }

  resetRoom(id: number){
    this.roomService.resetRoom(id);
  }

  nyeh(date: Date): string{
    return date ?
      date.getFullYear()+"-"+
      (date.getMonth()  + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1) )+"-"+
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) : null
  }
}
