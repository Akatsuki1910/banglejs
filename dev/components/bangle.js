import BANGLE_CODE from './bangleCode'

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
