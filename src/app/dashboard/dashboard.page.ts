import { Component, OnInit } from '@angular/core';
import { Room } from './../services/room.model';
import { RoomService } from "./../services/room.service"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  roomList :Room[];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.roomList = this.roomService.getRoomList();
  }

}
