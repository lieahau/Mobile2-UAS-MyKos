export class Room{
    arrivalDate: Date;
    arrivalDateString: string;
    contact: string;
    due: number;
    id: string | number;
    name: string;
    paymentDeadline: Date;
    paymentDeadlineString: string;
    status: "Occupied" | "Empty" | "Reserved";
}