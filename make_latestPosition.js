import { JSONL } from "https://js.sabae.cc/JSONL.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { Day } from "https://js.sabae.cc/DateTime.js";

const makefn = (type) => `data/${type}/${new Day().toStringYMD()}.ndjson`;

const ships = JSONL.parse(await Deno.readTextFile(makefn("ShipStaticData")));
const data = JSONL.parse(await Deno.readTextFile(makefn("PositionReport")));

const users = ArrayUtil.toUnique(data.map(d => d.Message.PositionReport.UserID));
console.log(users.length)
const list = [];
for (const u of users) {
  const ds = data.filter(d => d.Message.PositionReport.UserID == u);
  const d = ds[ds.length - 1];
  const ship = ships.find(s => s.Message.ShipStaticData.UserID == u);
  const obj = {};
  Object.assign(obj, d.Message.PositionReport);
  if (ship) {
    Object.assign(obj, ship.Message.ShipStaticData);
  }
  list.push(obj);
}
console.log(data.length, users.length);
await Deno.writeTextFile("latest/PositionReport.csv", CSV.stringify(list));
