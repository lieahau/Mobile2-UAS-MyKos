import { Injectable } from '@angular/core';
import { Room } from './room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomList :Room[] = [
    {
      "arrivalDate" : null,
      "arrivalDateString" : "21/05/2019",
      "contact" : "---",
      "due" : -9,
      "id" : 1,
      "name" : "sasa",
      "paymentDeadline" : null,
      "paymentDeadlineString" : "31/05/2019",
      "status" : "Occupied"
    }, {
      "arrivalDate" : null,
      "arrivalDateString" : "19/05/2019",
      "contact" : "---",
      "due" : 1,
      "id" : 2,
      "name" : "---",
      "paymentDeadline" : null,
      "paymentDeadlineString" : "20/05/2019",
      "status" : "Occupied"
    }, {
      "arrivalDate" : null,
      "arrivalDateString" : "--/--/----",
      "contact" : "---",
      "due" : 0,
      "id" : 3,
      "name" : "---",
      "paymentDeadline" : null,
      "paymentDeadlineString" : "--/--/----",
      "status" : "Empty"
    }, {
      "arrivalDate" : null,
      "arrivalDateString" : "--/--/----",
      "contact" : "---",
      "due" : 0,
      "id" : 4,
      "name" : "---",
      "paymentDeadline" : null,
      "paymentDeadlineString" : "--/--/----",
      "status" : "Empty"
    }, {
      "arrivalDate" : null,
      "arrivalDateString" : "--/--/----",
      "contact" : "---",
      "due" : 0,
      "id" : 5,
      "name" : "---",
      "paymentDeadline" : null,
      "paymentDeadlineString" : "--/--/----",
      "status" : "Empty"
    }
  ];

  constructor() { }

  getRoomList(): Room[] {
    return this.roomList;
  }

}
