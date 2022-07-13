import { stdin, stdout } from "node:process";
import { Transform } from "node:stream";

const reverseTransform = new Transform({
  transform(chunk: any, encoding: string, callback: any) {
    callback(null, chunk.toString().split("").reverse().join("") + "\n");
  },
});
stdin
  .pipe(reverseTransform)
  .on("error", console.log)
  .pipe(stdout)
  .on("error", console.log);
