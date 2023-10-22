import { JSONL } from "https://js.sabae.cc/JSONL.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { makefn } from "./makefn.js";

const data = JSONL.parse(await Deno.readTextFile(makefn("ShipStaticData")));

const users = ArrayUtil.toUnique(data.map(d => d.Message.ShipStaticData.UserID));

const list = [];
for (const u of users) {
  const ds = data.filter(d => d.Message.ShipStaticData.UserID == u);
  const d = ds[ds.length - 1];
  const obj = {};
  Object.assign(obj, d.Message.ShipStaticData);
  Object.assign(obj, d.MetaData);
  list.push(obj);
}
console.log(data.length, users.length);
await Deno.writeTextFile("latest/ShipStaticData.csv", CSV.stringify(list));
