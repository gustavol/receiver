// P0 = Laranja = esq rev
// 
// P1 = Roxo = esq frent
// 
// P2 = Branco = dir frent
// 
// P16 = cinza = dir rev
radio.onReceivedNumber(function (receivedNumber) {
    rxBuffer.push(receivedNumber)
})
function stop () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
    pins.digitalWritePin(DigitalPin.P16, 0)
    basic.clearScreen()
}
function handleReceivedMessage (receivedNumber: number) {
    if (receivedNumber == 0) {
        stop()
    } else if (receivedNumber == 1) {
        if (direction == 0) {
            pins.digitalWritePin(DigitalPin.P0, 0)
            pins.digitalWritePin(DigitalPin.P1, 1)
            pins.digitalWritePin(DigitalPin.P2, 1)
            pins.digitalWritePin(DigitalPin.P16, 0)
        } else {
            pins.digitalWritePin(DigitalPin.P0, 1)
            pins.digitalWritePin(DigitalPin.P1, 0)
            pins.digitalWritePin(DigitalPin.P2, 0)
            pins.digitalWritePin(DigitalPin.P16, 1)
        }
    } else if (receivedNumber == 2) {
        if (direction == 0) {
            pins.digitalWritePin(DigitalPin.P0, 0)
            pins.digitalWritePin(DigitalPin.P1, 1)
            pins.digitalWritePin(DigitalPin.P2, 0)
            pins.digitalWritePin(DigitalPin.P16, 0)
        } else {
            pins.digitalWritePin(DigitalPin.P0, 1)
            pins.digitalWritePin(DigitalPin.P1, 0)
            pins.digitalWritePin(DigitalPin.P2, 0)
            pins.digitalWritePin(DigitalPin.P16, 1)
        }
    } else if (receivedNumber == 3) {
        if (direction == 0) {
            pins.digitalWritePin(DigitalPin.P0, 0)
            pins.digitalWritePin(DigitalPin.P1, 0)
            pins.digitalWritePin(DigitalPin.P2, 1)
            pins.digitalWritePin(DigitalPin.P16, 0)
        } else {
            pins.digitalWritePin(DigitalPin.P0, 0)
            pins.digitalWritePin(DigitalPin.P1, 0)
            pins.digitalWritePin(DigitalPin.P2, 0)
            pins.digitalWritePin(DigitalPin.P16, 1)
        }
    } else if (receivedNumber == 4) {
        direction = 0
    } else if (receivedNumber == 5) {
        direction = 1
    } else {
        basic.showIcon(IconNames.No)
    }
}
let lastRx = 0
let direction = 0
let rxBuffer: number[] = []
radio.setGroup(1)
radio.setTransmitPower(7)
basic.forever(function () {
    // stop();
    if (rxBuffer.length > 0) {
        for (let i = 0; i <= rxBuffer.length - 1; i++) {
            handleReceivedMessage(rxBuffer[i])
            lastRx = control.millis()
        }
        rxBuffer = []
    }
    if (control.millis() - lastRx > 1000) {
        stop()
    }
})
