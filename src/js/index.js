// Code to upload to Bangle.js
const BANGLE_CODE = `
Bangle.setCompassPower(1);
Bangle.on('accel',function(a) {
  const d = [
    "A",
    Math.round(a.x*100),
    Math.round(a.y*100),
    Math.round(a.z*100)
    ];
  Bluetooth.println(d.join(","));
})

Bangle.on('mag', function(m) {
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
`;

// When we click the connect button...
let connection;
document.getElementById("btnConnect").addEventListener("click", () => {
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
    // Handle the data we get back, and call 'onLine'
    // whenever we get a line
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

// When we get a line of data, check it and if it's
// from the accelerometer, update it
function onLine(line) {
  const d = line.split(",");
  if (d[0] == "M") {
    console.log("RECEIVED:" + line);
  }
  // if (d.length == 4 && d[0] == "A") {
  //   const accel = {
  //     x: parseInt(d[1]),
  //     y: parseInt(d[2]),
  //     z: parseInt(d[3]),
  //   };
  //   setBarPos("accelX", accel.x);
  //   setBarPos("accelY", accel.y);
  //   setBarPos("accelZ", accel.z);
  // }
}
// Set the position of each bar
function setBarPos(id, d) {
  const s = document.getElementById(id).style;
  if (d > 150) d = 150;
  if (d < -150) d = -150;
  if (d >= 0) {
    s.left = "150px";
    s.width = d + "px";
  } else { // less than 0
    s.left = (150 + d) + "px";
    s.width = (-d) + "px";
  }
}