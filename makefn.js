import { Day } from "https://js.sabae.cc/DateTime.js";

export const makefn = (type) => `data/${type}/${new Day().toStringYMD()}.ndjson`;
