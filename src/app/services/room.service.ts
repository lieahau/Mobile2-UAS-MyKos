import { Injectable } from '@angular/core';
import { Room } from './room.model';

import { AngularFireDatabase } from "@angular/fire/database"
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  roomIdValue: 'numeric' | 'alphabetic' = 'numeric';
  maxDueDate = 0;

  userRef = "coba";
  databaseRef: any;

  roomList :Room[] = [];
  observableRoomList: BehaviorSubject<Room[]>;

  constructor(private fireBaseDB: AngularFireDatabase) {
    this.databaseRef = this.fireBaseDB.database.ref(this.userRef);
    this.observableRoomList = new BehaviorSubject<Room[]>(this.roomList);
    
    this.databaseRef.child('maxDueDate').on('value', due=> {
      if(due) this.maxDueDate = due.val();
    });

    this.databaseRef.child('rooms').on('value', snapshot => {
      this.roomList = []
      snapshot.forEach(child => {
        let val = child.val();
        this.roomList.push(new Room(
          val.id, 
          val.name, 
          val.contact, 
          val.arrivalDate ? new Date(val.arrivalDate.time) : null, 
          val.paymentDeadline ? new Date(val.paymentDeadline.time) : null
        ));
      });
      this.emittRoomList();
    });
  }

  observeRoomList(): Observable<Room[]> {
    return this.observableRoomList.asObservable();
  }
  emittRoomList(){
    this.observableRoomList.next(null);
  }

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
      let query = this.databaseRef.child('rooms').orderByChild('id').equalTo(room.id);
      query.once("child_added", (snapshot)=>{
        snapshot.ref.update(room);
      });
    }
  }
  resetRoom(id: string | number){
    let idx = this.roomList.findIndex(room=>{
      return room.id.toString() == id.toString();
    })
    if(idx >= 0) {
      this.roomList[idx].reset();
      let query = this.databaseRef.child('rooms').orderByChild('id').equalTo(id);
      query.once("child_added", (snapshot)=>{
        snapshot.ref.update(this.roomList[idx]);
      });
    }
  }
  resetRooms(ids: string[] | number[]) {
    for (const id of ids) {
      this.resetRoom(id);
    }
  }


  getNumberOfRooms():number{ return this.roomList.length; }
  updateNumberOfRooms(num: number){
    if(this.roomList.length > num) this.roomList.splice(num);
    else for(let i = this.roomList.length; i<num; i++){
      this.roomList.push(new Room(i+1,"---","---", null, null));
    }
    this.databaseRef.child('rooms').set(this.roomList);
  }


  getRoomIdValue():'numeric' | 'alphabetic'{ return this.roomIdValue; }
  updateRoomIdValue(value: 'numeric' | 'alphabetic'){
    this.roomIdValue = value;
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


  getMaxDueDate():number{ return this.maxDueDate; }
  updateMaxDueDate(due: number){
    this.maxDueDate = due;
    this.databaseRef.update({maxDueDate: due});
  }
  getDue(id: number | String){
    let idx = this.roomList.findIndex(room=>{
      return room.id.toString() == id.toString();
    })

    if(idx >= 0){
      let dead: number = this.roomList[idx].getDeadline();
      if (dead) {
          if(this.maxDueDate + dead < 0) return -1;
          else if(dead < 0) {return dead*-1;}
          else return null;
      }
      else return null;
    }
  }

}
