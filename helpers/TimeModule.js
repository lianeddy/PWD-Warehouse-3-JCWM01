class TimeModule {
  /**
   * name: timeNowFormatUnixTimeStamp
   * function: Dapatkan waktu sekarang dengan format Unix Timestamps
   */
  static timeNowFormatUnixTimeStamp() {
    let date = new Date(); // Or the date you'd like converted.
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  }

  /**
   * name: timeNowFormatMysql
   * function: Dapatkan waktu sekarang dengan format sesuai
   * column type timestamp MySql
   */
  static timeNowFormatMysql = () => {
    return TimeModule.timeNowFormatUnixTimeStamp()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");
  };

  /**
   * name: timeNowSubtract
   * fungsi: Pengurann waktu sekarang
   * @param  {int} jmlSub=1
   */
  static timeNowSubtractDayFormatMysql = (jmlSub = 1) => {
    let output = TimeModule.timeNowFormatUnixTimeStamp();
    output.setDate(output.getDate() - jmlSub);
    return TimeModule.timeNowFormatUnixTimeStamp()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");
  };
}

module.exports = TimeModule;
