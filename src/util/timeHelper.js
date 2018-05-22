function PadZero(str) {
    //补零
    return new RegExp(/^\d$/g).test(str) ? `0${str}` : str;
}

export default {
    formatTime(_seconds) {
        _seconds = parseInt(_seconds);
        let hours, mins, seconds;
        let result = '';
        seconds = parseInt(_seconds % 60);
        mins = parseInt(_seconds % 3600 / 60)
        hours = parseInt(_seconds / 3600);

        if (hours)
            result = `${PadZero(hours)}:${PadZero(mins)}:${PadZero(seconds)}`
        else
            result = `${PadZero(mins)}:${PadZero(seconds)}`
        // console.log(result)
        return result;
    }
}