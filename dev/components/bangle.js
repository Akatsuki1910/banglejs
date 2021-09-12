const BANGLE_CODE = `
  Bangle.setCompassPower(1);
  Bangle.on('accel', function (a) {
    const d = [
      "A",
      Math.round(a.x * 100),
      Math.round(a.y * 100),
      Math.round(a.z * 100),
      Math.round(a.diff * 100),
      Math.round(a.mag * 100)
    ];
    Bluetooth.println(d.join(","));
  })

  Bangle.on('mag', function (m) {
    const d = [
      "M",
      Math.round(m.x),
      Math.round(m.y),
      Math.round(m.z),
      Math.round(m.dx),
      Math.round(m.dy),
      Math.round(m.dz),
      Math.round(m.heading)
    ];
    Bluetooth.println(d.join(","));
  });
`

export default function bangle(el, onLine) {
  let connection;
  el.addEventListener("click", () => {
    // disconnect if connected already
    if (connection) {
      connection.close();
      connection = undefined;
    }
    // Connect
    Puck.connect((c) => {
      if (!c) {
        alert("Couldn't connect!");
        return;
      }
      connection = c;

      let buf = "";
      connection.on("data", (d) => {
        buf += d;
        const l = buf.split("\n");
        buf = l.pop();
        l.forEach(onLine);
      });
      // First, reset the Bangle
      connection.write("reset();\n", () => {
        // Wait for it to reset itself
        setTimeout(() => {
          // Now upload our code to it
          connection.write("\x03\x10if(1){" + BANGLE_CODE + "}\n",
            () => {
              console.log("Ready...");
            });
        }, 1500);
      });
    });
  });
}
