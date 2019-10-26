export class Room{
    public id: number;
    public name: string;
    public contact: string;
    private arrivalDate: customDate;
    private paymentDeadline: customDate;

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
        this.arrivalDate = arrivalDate ? new customDate(arrivalDate) : null;
        this.paymentDeadline = paymentDeadline ? new customDate(paymentDeadline) : null;
    }

    getArrivalDate(): Date{ return this.arrivalDate ? new Date(this.arrivalDate.time) : null; }
    setArrivalDate(arrivalDate: Date){ this.arrivalDate = arrivalDate ? new customDate(arrivalDate) : null; }
    getArrivalDateString(): string{
        if (this.arrivalDate) return ""+
            (this.arrivalDate.getDate() < 10 ? '0' + this.arrivalDate.getDate() : this.arrivalDate.getDate()) +"/"+
            (this.arrivalDate.getMonth()  + 1 < 10 ? '0' + (this.arrivalDate.getMonth() + 1) : (this.arrivalDate.getMonth() + 1) )+"/"+
            this.arrivalDate.getFullYear();
        else return "--/--/----";
    };

    getPaymentDeadline(): Date{ return this.paymentDeadline ? new Date(this.paymentDeadline.time) : null;}
    setPaymentDeadline(paymentDeadline: Date){ this.paymentDeadline = paymentDeadline ? new customDate(paymentDeadline) : null; }
    getPaymentDeadlineString(): string{
        if (this.paymentDeadline) return ""+
            (this.paymentDeadline.getDate() < 10 ? '0' + this.paymentDeadline.getDate() : this.paymentDeadline.getDate()) +"/"+
            (this.paymentDeadline.getMonth()  + 1 < 10 ? '0' + (this.paymentDeadline.getMonth() + 1) : (this.paymentDeadline.getMonth() + 1) )+"/"+
            this.paymentDeadline.getFullYear();
        else return "--/--/----";
    };

    getDeadline(): number{
        if (this.paymentDeadline) return Math.ceil((this.paymentDeadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return null
    }
    
    getStatus() : "Empty" | "Occupied" | "Reserved"{
        if(!this.arrivalDate) return "Empty";
        else if(Math.ceil((this.arrivalDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) > 0) return "Reserved";
        else return "Occupied";
    }

    reset(){
        this.name = "---";
        this.contact = "---";
        this.arrivalDate = null;
        this.paymentDeadline = null;
    }
}

export class customDate{
    date: number;
    month: number;
    time: number;
    year: number;

    constructor(date: Date){
        this.date = date.getDate();
        this.month = date.getMonth();
        this.time = date.getTime();
        this.year = date.getFullYear() - 1900;
    }
    
    getDate():number{ return this.date; }
    getMonth():number{ return this.month; }
    getFullYear():number{ return this.year + 1900; }
    getTime():number{ return this.time; }
}