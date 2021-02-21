//WIDGETS = {};
require("FontTeletext10x18Ascii").add(Graphics);

(() => {
  var width = 24;

  function draw() {
    g.reset();
    g.setFontAlign(0, 0);
    var text = (" " + E.getBattery()).slice(-3);
    g.setFont("Teletext10x18Ascii");
    g.drawString(text, this.x + width / 2 - 5, this.y + 15, true);
  }

  setInterval( () => WIDGETS.date.draw(), 600000);

  WIDGETS.date = {
    area: "tr",
    width: width,
    draw: draw
  };
})();

//Bangle.drawWidgets();