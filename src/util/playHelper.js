import ajax from '../util/ajax';

export default {
  async getFile(playing) {
    let song = {};
    if (playing) {
      Object.assign(song, playing);
      let vkey = await ajax.getVkey(playing.songmid);
      // const filename = getFile(vkey);
      // console.log('vkey');
      // console.log(vkey);
      if (vkey.code === 0) {
        let item = vkey.data.items[0];
        let file = await ajax.getFile(item.filename, item.vkey);

        song.playfile = file;
      }
    }
    return song;
  }
};
