// WIDGETS = {};
require("FontTeletext10x18Ascii").add(Graphics);
(() => {
  var width = 24;

  function draw() {
    g.reset();
    g.setFontAlign(0, 0);
    var text = E.getBattery();
    g.setFont("Teletext10x18Ascii");
    g.drawString(text, this.x + width / 2, this.y + 15);
  }

  setInterval(function () {
    WIDGETS.date.draw(WIDGETS.date);
  }, 10 * 60000);

  WIDGETS.date = {
    area: "tr",
    width: width,
    draw: draw
  };
})();

// Bangle.drawWidgets();