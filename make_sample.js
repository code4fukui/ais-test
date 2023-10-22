import { JSONL } from "https://js.sabae.cc/JSONL.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { Day } from "https://js.sabae.cc/DateTime.js";
import { getTypes } from "./getTypes.js";
import { makefn } from "./makefn.js";

const types = await getTypes();
console.log(types);

for (const type of types) {
  const data = JSONL.parse(await Deno.readTextFile(makefn(type)));
  const d = data[data.length - 1];
  await Deno.writeTextFile("sample/" + type + ".json", JSON.stringify(d, null, 2));
}
