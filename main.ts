/**
 * This is a MakeCode extension for the Si7021 Temperature & Humidity Sensor.
 * This refer to Arduino library for Adafruit Si7021 https://github.com/adafruit/Adafruit_Si7021
 */
const SI7021_DEFAULT_ADDRESS = 0x40;

const SI7021_RESET_CMD = 0xFE; // Reset Command
const SI7021_MEASURE_RH_NO_HOLD_CMD = 0xF5; // Measure Relative Humidity, Hold Master Mode
const SI7021_MEASURE_TEMP_NO_HOLD_CMD = 0xF3; // Measure Relative Humidity, No Hold Master Mode

//% color=#00BFFF weight=95 icon="\uf043"
namespace Si7021 {
  let I2C_ADDR = SI7021_DEFAULT_ADDRESS;

  /**
   * Reset sensor
   */
  //% blockId=Si7021_reset block="reset Si7021"
  export function reset() {
    pins.i2cWriteNumber(I2C_ADDR, SI7021_RESET_CMD, NumberFormat.UInt8BE);
    basic.pause(50);
  }

  /**
   * Reads the humidity value from Si7021 (No Master hold)
   * @returns value of humidity [%]
   */
  //% blockId=Si7021_readHumidity block="humidity"
  export function readHumidity(): number {
    pins.i2cWriteNumber(I2C_ADDR, SI7021_MEASURE_RH_NO_HOLD_CMD, NumberFormat.UInt8BE);
    basic.pause(20); // account for conversion time for reading humidity
    const raw = pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt16BE);
    pins.i2cReadNumber(I2C_ADDR, NumberFormat.Int8BE); // checksum
    const humidity = ((raw * 125) / 65536) - 6;
    return humidity > 100.0 ? 100.0 : humidity;
  }

  /**
   * Reads the temperature value from Si7021 (No Master hold)
   * @returns value of temperature [C]
   */
  //% blockId=Si7021_readTemperature block="temperature"
  export function readTemperature(): number {
    pins.i2cWriteNumber(I2C_ADDR, SI7021_MEASURE_TEMP_NO_HOLD_CMD, NumberFormat.UInt8BE);
    basic.pause(20); // account for conversion time for reading temperature
    const raw = pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt16BE);
    pins.i2cReadNumber(I2C_ADDR, NumberFormat.Int8BE); // checksum
    const temperature = ((raw * 175.72) / 65536) - 46.85;
    return temperature;
  }
}