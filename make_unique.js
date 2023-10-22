import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const fn = "positions.ndjson.csv";

const data = await CSV.fetchJSON(fn);
const users = ArrayUtil.toUnique(data.map(d => d.UserID));
const list = [];
for (const u of users) {
  const ds = data.filter(d => d.UserID == u);
  const d = ds[ds.length - 1];
  list.push(d);
}
console.log(data.length, users.length);
await Deno.writeTextFile("positions.csv", CSV.stringify(list));
