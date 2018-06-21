export default {
  getLocalStore(name) {
    let obj = window.localStorage.getItem(name);
    console.log(obj);
    if (obj && obj !== '') {
      obj = JSON.parse(obj);
    }
    return obj;
  },

  setLocalStore(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
    return data;
  }
};
