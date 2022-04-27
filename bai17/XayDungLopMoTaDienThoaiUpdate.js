class Battery {
    energy;

    constructor(energy) {
        this.energy = energy;
    }

    upEnergy() {
        this.energy++;
    }

    downEnergy() {
        this.energy--;
    }
}

class Phone {
    battery;
    memoryDen = []
    memoryDaGui = []
    message = "";
    status = false;

    constructor(battery) {
        this.battery = battery;
    }

    send(phone) {
        if (this.status) {
            this.memoryDaGui.push(this.message);
            phone.memoryDen.push(this.message);
            alert("gửi thành công")
            this.battery.downEnergy();
        } else {
            alert("máy đang tắt")
        }

    }

    turnOn() {
        this.status = true;
        this.battery.downEnergy();
        alert("đã bật")
    }

    turnOff() {
        this.status = false;
        alert("đã tắt")

    }

    upEnergy() {
        this.battery.upEnergy();
    }


}

let pinTQ = new Battery(10);
let iphone6 = new Phone(pinTQ);
let iphoneX = new Phone(pinTQ);