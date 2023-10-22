import { getEnv } from "https://js.sabae.cc/getEnv.js";
import { Day } from "https://js.sabae.cc/DateTime.js";

const API_KEY = await getEnv("AISSTREAM_API_KEY");

const socket = new WebSocket("wss://stream.aisstream.io/v0/stream");

socket.addEventListener("open", (_) => {
  const mes = {
    APIkey: API_KEY,
    BoundingBoxes: [
      [
        [-90, -180],
        [90, 180],
      ],
    ],
  };
  socket.send(JSON.stringify(mes));
});

socket.addEventListener("error", (event) => {
  console.log(event);
});

const fn = "positions.ndjson";

const log = async (type, obj) => {
  const dir = "data/" + type + "/";
  await Deno.mkdir(dir, { recursive: true });
  await Deno.writeTextFile(dir + new Day().toStringYMD() + ".ndjson", JSON.stringify(obj) + "\n", { append: true });
};

let idx = 0;
socket.addEventListener("message", async (event) => {
  if (event.data instanceof Blob) {
    const s = new TextDecoder().decode(new Uint8Array(await event.data.arrayBuffer()));
    const msg = JSON.parse(s);
    await log(msg.MessageType, msg);

    if (msg.MessageType === "PositionReport") {
      const positionReport = msg["Message"]["PositionReport"];
      console.log(idx,
        `ShipId: ${positionReport["UserID"]} Latitude: ${positionReport["Latitude"]} Longitude: ${positionReport["Longitude"]}`
      );
    }
    idx++;
  }
  return;
});
