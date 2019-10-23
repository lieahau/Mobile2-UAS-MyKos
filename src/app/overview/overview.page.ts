import { Component, OnInit } from '@angular/core';
import { Room } from './../services/room.model';
import { RoomService } from "./../services/room.service"

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {

  roomList :Room[] = [];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.roomList = this.roomService.getRoomList();
  }

}
