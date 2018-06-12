function PadZero(str) {
  //补零
  return new RegExp(/^\d$/g).test(str) ? `0${str}` : str;
}

export default {
  formatTime(time) {
    const _seconds = parseInt(time, 10);

    let result = '';
    const seconds = parseInt(_seconds % 60, 10);
    const mins = parseInt((_seconds % 3600) / 60, 10);
    const hours = parseInt(_seconds / 3600, 10);

    if (hours)
      result = `${PadZero(hours)}:${PadZero(mins)}:${PadZero(seconds)}`;
    else result = `${PadZero(mins)}:${PadZero(seconds)}`;
    // console.log(result)
    return result;
  }
};
