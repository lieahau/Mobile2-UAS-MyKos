import { Component, OnInit } from '@angular/core';

import { RoomService } from "./../services/room.service"

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  numberOfRooms: number;
  roomIdValue: 'numeric' | 'alphabetic';
  maxDueDate: number;

  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.numberOfRooms = this.roomService.getNumberOfRooms();
    this.roomIdValue = this.roomService.getRoomIdValue();
    this.maxDueDate = this.roomService.getMaxDueDate();
    console.log(this.maxDueDate);
  }

  // input handler
  setNumberOfRooms($event) {
    this.numberOfRooms = Math.floor($event.target.value);
    console.log(`Set number of rooms ${this.numberOfRooms}`);
  }

  submitNumberOfRooms() {
    this.roomService.updateNumberOfRooms(this.numberOfRooms);
  }

  setRoomIdValue($event) {
    this.roomIdValue = $event.target.value;
    console.log(`Set room id value ${this.roomIdValue}`);

    this.roomService.updateRoomIdValue(this.roomIdValue);
  }

  setMaxDueDate($event) {
    this.maxDueDate = Math.floor($event.target.value);
    console.log(`Set max due date ${this.maxDueDate}`);
  }

  submitMaxDueDate() {
    this.roomService.updateMaxDueDate(this.maxDueDate);
  }
}
