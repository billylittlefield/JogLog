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
