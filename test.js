import { getEnv } from "https://js.sabae.cc/getEnv.js";

const API_KEY = await getEnv("AISSTREAM_API_KEY");

const socket = new WebSocket("wss://stream.aisstream.io/v0/stream");

socket.addEventListener("open", (_) => {
  const mes = {
    APIkey: API_KEY,
    BoundingBoxes: [
      [
        [-180, -90],
        [180, 90],
      ],
    ],
  };
  socket.send(JSON.stringify(mes));
});

socket.addEventListener("error", (event) => {
  console.log(event);
});

let idx = 0;
socket.addEventListener("message", async (event) => {
  if (event.data instanceof Blob) {
    const s = new TextDecoder().decode(new Uint8Array(await event.data.arrayBuffer()));
    const aisMessage = JSON.parse(s);
    if (aisMessage["MessageType"] === "PositionReport") {
      const positionReport = aisMessage["Message"]["PositionReport"];
      console.log(
        `ShipId: ${positionReport["UserID"]} Latitude: ${positionReport["Latitude"]} Longitude: ${positionReport["Longitude"]}`
      );
    }
    return;
  }
  console.log(idx++, event.data);
  return;
});
