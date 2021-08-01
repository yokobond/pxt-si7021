serial.redirectToUSB()
// Si7021.reset()
basic.forever(function () {
    serial.writeValue("humi", Si7021.readHumidity())
    serial.writeValue("temp", Si7021.readTemperature())
    basic.pause(100)
})
