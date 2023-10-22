export const getTypes = async () => {
  const res = [];
  for await (const f of Deno.readDir("data")) {
    if (f.isDirectory) {
      res.push(f.name);
    }
  }
  return res;
};
