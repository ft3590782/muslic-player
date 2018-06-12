// import fetchJsonp from 'fetch-jsonp'

// fetch对中文返回的jsonp支持不够友好,无法解决乱码问题,改用jquery.ajax
// async function doFetch(request) {

//     if (Object.prototype.toString.call(request, {headers: {'Content-Type': 'application/x-javascript; charset=utf-8'}}) === '[object String]' && request.type.toLowerCase() !== 'jsonp') {
//         return await fetch(request).then(res => {
//             return res
//         }).catch(error => {
//             return error
//         })
//     } else {
//         return await fetchJsonp(request.url, {jsonpCallbackFunction: request.callback}).then(res => {
//             return res.json()
//         })
//     }

// }

// export default {
//     // async doFetch()
//     async getAllSongs() {
//         return await doFetch({url: 'http://music.qq.com/musicbox/shop/v3/data/hit/hit_all.js', type: 'jsonp', callback: 'JsonCallback'})
//     },
//     async getNewSongs() {
//         return await doFetch({url: 'http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js', type: 'jsonp', callback: 'JsonCallback'})
//     }
// }

import { ajax } from 'jquery';

const doAjax = request => {
  return new Promise((resolve, reject) => {
    let _request = {
      //  type: "get",
      // async: false,
      // url: "http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js",
      // dataType: "jsonp",
      // jsonp: "callback",
      // jsonpCallback: "JsonCallback",
      // scriptCharset: 'GBK', //设置编码，否则会乱码
      success: function(data) {
        resolve(data);
      },
      error: function() {
        alert('fail');
      }
    };

    _request = Object.assign({}, _request, request);
    // console.log(_request);
    ajax(_request);
  });
};

export default {
  // async doFetch()
  async getAllSongs() {
    return await doAjax({
      type: 'jsonp',
      async: false,
      url: 'http://music.qq.com/musicbox/shop/v3/data/hit/hit_all.js',
      dataType: 'jsonp',
      jsonp: 'callback',
      jsonpCallback: 'JsonCallback',
      scriptCharset: 'GBK' //设置编码，否则会乱码
    });
  },
  async getNewSongs() {
    // return await doFetch({
    //     url: 'http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js',
    //     type: 'jsonp',
    //     callback: 'JsonCallback'
    // })
    return await doAjax({
      type: 'jsonp',
      async: false,
      url: 'http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js',
      dataType: 'jsonp',
      jsonp: 'callback',
      jsonpCallback: 'JsonCallback',
      scriptCharset: 'GBK' //设置编码，否则会乱码
    });
  },
  async search(keyword, pageIndex = 1, pageSize = 20) {
    return await doAjax({
      type: 'jsonp',
      async: false,
      url: `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=jsonp&jsonpCallback=callback&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURI(
        keyword
      )}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=${pageSize}&p=${pageIndex}&remoteplace=txt.mqq.all&_=1512564562121`,
      dataType: 'jsonp',
      jsonp: 'callback',
      jsonpCallback: 'callback'
      // scriptCharset: 'GBK' //设置编码，否则会乱码
    });
  },
  async getVkey(mid) {
    return await doAjax({
      type: 'jsonp',
      async: false,
      url: `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?
			g_tk=1278911659&hostUin=0&format=jsonp&callback=callback&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0
			&songmid=${mid}
			&filename=C400${mid}.m4a
			&guid=3655047200`,
      dataType: 'jsonp',
      jsonp: 'callback',
      jsonpCallback: 'callback'
      // scriptCharset: 'GBK' //设置编码，否则会乱码
    });
  },
  async getFile(filename, vkey) {
    return await `http://dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}
			&guid=3655047200&fromtag=66`;
  }
};
