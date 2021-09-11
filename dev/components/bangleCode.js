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

export default BANGLE_CODE
