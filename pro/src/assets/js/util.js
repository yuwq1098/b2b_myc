import {rootURL} from 'api/rootUrl.js'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

//api请求URL拼接
export function joinUrl(url) {
    return rootURL + url;
};

//vue的Data数据转json
export function dataToJson(data) {
  return JSON.parse(JSON.stringify(data));
};
