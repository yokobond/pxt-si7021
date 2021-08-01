
> Open this page at [https://yokobond.github.io/pxt-si7021/](https://yokobond.github.io/pxt-si7021/)

# pxt-si7021
A package to use Si7021 Humidity and Temperature Sensor in MakeCode

- Adafruit Si7021 Temperature & Humidity Sensor Breakout Board https://www.adafruit.com/product/3251
- SparkFun Humidity and Temperature Sensor Breakout - Si7021 https://www.sparkfun.com/products/13763

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/yokobond/pxt-si7021** and import

## Edit this project ![Build status badge](https://github.com/yokobond/pxt-si7021/workflows/MakeCode/badge.svg)

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/yokobond/pxt-si7021** and click import

## Blocks preview

An example code to read humidity and temperature from USB

```blocks
serial.redirectToUSB()
basic.forever(function () {
  serial.writeValue("humi", Si7021.readHumidity())
  serial.writeValue("temp", Si7021.readTemperature())
  basic.pause(100)
})
```

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
