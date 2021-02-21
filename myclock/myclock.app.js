require("Font7x11Numeric7Seg").add(Graphics);
require("Font8x16").add(Graphics);
const X = 210,
  Y = 140;

function draw() {
  var d = new Date();
  var h = d.getHours(),
    m = d.getMinutes();
  var time = ("  " + h).substr(-2) + ":" + ("0" + m).substr(-2);
  g.reset();
  g.setFont("7x11Numeric7Seg", 6);
  g.setFontAlign(1, 1);
  g.drawString(time, X, Y, true);
  g.setFont("7x11Numeric7Seg", 2);
  g.drawString(("0" + d.getSeconds()).substr(-2), X + 30, Y, true);
  g.setFont("8x16", 2);
  g.setFontAlign(0, 1);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var dateStr = year + " " + month + "/" + day;
  g.drawString(dateStr, g.getWidth() / 2, Y + 40, true);
}

g.clear();
draw();
var secondInterval = setInterval(draw, 1000);
Bangle.on('lcdPower', on => {
  if (secondInterval) clearInterval(secondInterval);
  secondInterval = undefined;
  if (on) {
    secondInterval = setInterval(draw, 1000);
    draw();
  }
});
Bangle.loadWidgets();
Bangle.drawWidgets();
setWatch(Bangle.showLauncher, BTN2, {
  repeat: false,
  edge: "falling"
});