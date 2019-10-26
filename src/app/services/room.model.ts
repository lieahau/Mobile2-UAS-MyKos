export class Room{
    id: number;
    name: string;
    contact: string;
    arrivalDate: Date;
    paymentDeadline: Date;

    constructor(    
        id: number,
        name: string,
        contact: string,
        arrivalDate: Date,
        paymentDeadline: Date,
    ){
        this.id = id,
        this.name = name,
        this.contact = contact;
        this.arrivalDate = arrivalDate;
        this.paymentDeadline = paymentDeadline;
    }

    // due(maxDue: number = 0): number{
    //     if (this.paymentDeadline) {
    //         let days: number = this.deadline();
    //         console.log(days + maxDue);
    //         if(days < 0) return days + maxDue;
    //         else return null;
    //     }
    //     else return null;
    // }

    deadline(): number{
        if (this.paymentDeadline) return Math.ceil((this.paymentDeadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return null
    }

    arrivalDateString(): string{
        if (this.arrivalDate) return ""+
            (this.arrivalDate.getDate() < 10 ? '0' + this.arrivalDate.getDate() : this.arrivalDate.getDate()) +"/"+
            (this.arrivalDate.getMonth()  + 1 < 10 ? '0' + (this.arrivalDate.getMonth() + 1) : (this.arrivalDate.getMonth() + 1) )+"/"+
            this.arrivalDate.getFullYear();
        else return "--/--/----";
    };

    paymentDeadlineString(): string{
        if (this.paymentDeadline) return ""+
            (this.paymentDeadline.getDate() < 10 ? '0' + this.paymentDeadline.getDate() : this.paymentDeadline.getDate()) +"/"+
            (this.paymentDeadline.getMonth()  + 1 < 10 ? '0' + (this.paymentDeadline.getMonth() + 1) : (this.paymentDeadline.getMonth() + 1) )+"/"+
            this.paymentDeadline.getFullYear();
        else return "--/--/----";
    };
    
    status() : "Empty" | "Occupied" | "Reserved"{

        if(!this.arrivalDate) return "Empty";
        else if(Math.ceil((this.arrivalDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) > 0) return "Reserved";
        else return "Occupied";
    }
}