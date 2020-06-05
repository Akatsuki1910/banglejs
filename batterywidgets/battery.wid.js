// WIDGETS = {};

(() => {
  var width = 24;

  function draw() {
    var date = new Date();
    g.reset();
    g.setFontAlign(0, 0);
    var text = E.getBattery();
    g.setFont("6x8");
    g.drawString(text, this.x + width / 2, this.y + 19);
  }

  setInterval(function () {
    WIDGETS["date"].draw(WIDGETS["date"]);
  }, 10 * 60000);

  WIDGETS["date"] = {
    area: "tr",
    width: width,
    draw: draw
  };
})()

// Bangle.drawWidgets();