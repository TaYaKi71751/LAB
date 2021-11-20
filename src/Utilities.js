const wget = require('wget-improved');

class Utilities {
  child_process = require('child_process');
  wget = require('wget-improved').download;
  valueSlice(o) {
    return Object.values(o).slice(0, o.length);
  }
  curl({
    url,
    output
  }) {
    var o = this.child_process.execSync(`curl -LsSf ${url} -o ${output ?? '-'}`);
    return o.toString().trim();
  }
  getFile({
    url,
    output
  }) {
    var _prog = {};
    _prog[0] = {};
    _prog[1] = {};
    let download = this.wget(url, output);
    download.on('error', function (err) {
      console.log(err);
    });
    download.on('start', function (fileSize) {
      console.log(`START DL`)
      console.log(`FILE_SILE : ${fileSize}`);
    });
    download.on('end', function (output) {
      console.log(`END DL`);
      console.log(output);
    });
    download.on('progress', function (progress) {
      typeof progress === 'number'
      _prog[0] = (_prog[0] != (progress * 100 + '').split('.')[0]) ? (progress * 100 + '').split('.')[0] : _prog[0];
      console.clear();
      console.log(`${_prog[0]}%`)
    });
  }
}
module.exports = Utilities;