window.parseTime = function (hh,mm,ss) {
  hh = parseInt(hh) || 0;
  mm = parseInt(mm) || 0;
  ss = parseInt(ss) || 0;
  if (ss > 60) {
    mm += Math.floor(ss / 60);
    ss = (ss % 60);
  }
  if (mm > 60) {
    hh += Math.floor(mm / 60);
    mm = (mm % 60);
  }
  return hh + ":" + mm + ":" + ss;
};
String.prototype.stylizeDuration = function () {
  var stylized = this.substring(11,19);
  while (stylized.length > 1 && (stylized[0] === ":" || stylized[0] === "0")) {
    stylized = stylized.substring(1);
  }
  return stylized;
};
