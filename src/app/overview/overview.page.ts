import { Component, OnInit, NgZone } from '@angular/core';
import { Room } from './../services/room.model';
import { RoomService } from "./../services/room.service"

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {

  roomList :Room[] = [];

  constructor(private roomService: RoomService, private ngZone: NgZone) {
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
  }

  getID(id: number){
    return this.roomService.convertID(id);
  }

}
