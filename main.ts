/**
 * This is a MakeCode extension for the Si7021 Temperature & Humidity Sensor.
 * This refer to Arduino library for Adafruit Si7021 https://github.com/adafruit/Adafruit_Si7021
 */
const SI7021_DEFAULT_ADDRESS = 0x40;

const SI7021_RESET_CMD = 0xFE; // Reset Command
const SI7021_MEASURE_RH_NO_HOLD_CMD = 0xF5; // Measure Relative Humidity, Hold Master Mode
const SI7021_MEASURE_TEMP_NO_HOLD_CMD = 0xF3; // Measure Relative Humidity, No Hold Master Mode
const SI7021_WRITE_RHT_REG_CMD = 0xE6; // Write RH/T User Register 1
const SI7021_READ_RHT_REG_CMD = 0xE7; // Read RH/T User Register 1
const SI7021_WRITE_HEATER_REG_CMD = 0x51; // Write Heater Control Register
const SI7021_READ_HEATER_REG_CMD = 0x11; // Read Heater Control Register
const SI7021_REG_HEATER_BIT = 0x02; // Control Register Heater Bit

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

  /**
   * Return sensor heater state
   * @returns heater state (TRUE = enabled, FALSE = disabled)
   */
  //% blockId=Si7021_isHeaterEnabled block="heater"
  export function isHeaterEnabled(): boolean {
    const register = readRegister(SI7021_READ_RHT_REG_CMD);
    return ((register & SI7021_REG_HEATER_BIT) != 0);
  }

  /**
   * Enable/Disable sensor heater
   */
  //% blockId=Si7021_enableHeater block="heater $on"
  export function enableHeater(on: boolean) {
    let register = readRegister(SI7021_READ_RHT_REG_CMD);
    if (on) {
      register |= (1 << SI7021_REG_HEATER_BIT);
    } else {
      register &= ~(1 << SI7021_REG_HEATER_BIT);
    }
    writeRegister(SI7021_WRITE_RHT_REG_CMD, register);
  }

  /**
   * Set the sensor heater heat level
   */
  //% blockId=Si7021_setHeatLevel block="heat level $level"
  export function setHeatLevel(level: number) {
    writeRegister(SI7021_WRITE_HEATER_REG_CMD, level);
  }

  function writeRegister(command: number, value: number) {
    pins.i2cWriteNumber(I2C_ADDR, command, NumberFormat.UInt8BE);
    pins.i2cWriteNumber(I2C_ADDR, value, NumberFormat.UInt8BE);
  }

  function readRegister(command: number): number {
    pins.i2cWriteNumber(I2C_ADDR, command, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt8BE);
  }
}