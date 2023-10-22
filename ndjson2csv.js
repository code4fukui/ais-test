import { JSONL } from "https://js.sabae.cc/JSONL.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const fn = "positions.ndjson";

const data = JSONL.parse(await Deno.readTextFile(fn));
await Deno.writeTextFile(fn + ".csv", CSV.stringify(data));
