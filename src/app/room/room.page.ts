import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Room } from './../services/room.model';
import { RoomService } from "./../services/room.service"

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  room: Room;

  constructor(public route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.room = this.roomService.getRoom(paramMap.get('id'));
    });
  }

}
