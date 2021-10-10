class TimeModule {
  static timeNow() {
    let date = new Date(); // Or the date you'd like converted.
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  }

  static timeNowFormatMysql = () => {
    return TimeModule.timeNow()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");
  };

  static timeNowSubtract = (jmlSub = 1) => {
    let output = TimeModule.timeNow();
    output.setDate(output.getDate() - jmlSub);
    return TimeModule.timeNow()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");
  };
}

module.exports = TimeModule;
