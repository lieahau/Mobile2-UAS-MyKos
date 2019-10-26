import { Injectable } from '@angular/core';
import { Room } from './room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  roomIdValue: 'numeric' | 'alphabetic' = 'numeric';
  maxDueDate = 30;

  private roomList :Room[] = [
    new Room(1, "Ryan", "68635", new Date(2019, 10 -1, 21), new Date(2019, 10 -1, 29)),
    new Room(2, "Budi", "585458548", new Date(2019, 10 -1, 11), new Date(2019, 10 -1, 20)),
    new Room(3, "---", "---", null, null),
    new Room(4, "---", "---", null, null),
    new Room(5, "---", "---", null, null),
    new Room(6, "---", "---", null, null),
  ];

  constructor() { }

  getRoomList(): Room[] {
    return this.roomList;
  }

  getRoom(id: string | number): Room{
    let idx = this.roomList.findIndex(room=>{
      return room.id.toString() == id.toString();
    })
    if(idx >= 0) return this.roomList[idx];
    else return null;
  }

  updateRoom(id: string | number, room: Room){
    let idx = this.roomList.findIndex(room=>{
      return room.id.toString() == id.toString();
    })
    if(idx >= 0 && this.roomList[idx].id == room.id) {
      this.roomList[idx] = room;
    }
  }

  getNumberOfRooms():number{ return this.roomList.length; }
  updateNumberOfRooms(num: number){
    if(this.roomList.length > num) this.roomList.splice(num);
    else for(let i = this.roomList.length; i<num; i++){
      this.roomList.push(new Room(i+1,"---","---", null, null));
    }
  }

  getRoomIdValue():'numeric' | 'alphabetic'{ return this.roomIdValue; }
  updateRoomIdValue(value: 'numeric' | 'alphabetic'){
    this.roomIdValue = value;
  }

  getDue(id: number | String){
    let idx = this.roomList.findIndex(room=>{
      return room.id.toString() == id.toString();
    })

    if(idx >= 0){
      if (this.roomList[idx].paymentDeadline) {
          let days: number = this.roomList[idx].deadline();
          if(days < 0) return days + this.maxDueDate;
          else return null;
      }
      else return null;
    }
  }

  getMaxDueDate():number{ return this.maxDueDate; }
  updateMaxDueDate(due: number){
    this.maxDueDate = due;
  }

  convertID(num: number): number | string{
    if(this.roomIdValue == "alphabetic") {
      let t, str = "";
      while (num > 0) {
        t = (num - 1) % 26;
        str = String.fromCharCode(65 + t) + str;
        num = (num - t)/26 | 0;
      }
      return str || undefined;
    }
    else if (this.roomIdValue == "numeric"){
      return num;
    }
  }

}
