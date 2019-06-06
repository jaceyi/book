export function realBookCover(url) {
  if (url.search(/agent/i) === -1) {
    return 'http://api.zhuishushenqi.com' + url;
  }
  else {
    return decodeURIComponent(url.replace(/\/agent\//, ''));
  }
}

export function dateToStr(datetime) {
  let year = datetime.getFullYear();
  let month = datetime.getMonth() + 1;
  let date = datetime.getDate();
  let hour = datetime.getHours();
  let minutes = datetime.getMinutes();
  let second = datetime.getSeconds();

  if (month < 10) {
    month = '0' + month;
  }
  if (date < 10) {
    date = '0' + date;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (second < 10) {
    second = '0' + second;
  }

  return year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + second;
}

export function formatSearchParams(params) {
  if (!params) {
    return null
  }
  const _params = params.slice(1);
  const _o = {};
  _params.split('&').forEach(item => {
    const _items = item.split('=');
    _o[_items[0]] = _items[1];
  });
  return _o;
}
