const csv = require("csvtojson");
const { join } = require("node:path");
const { createWriteStream, createReadStream } = require("node:fs");

const csvFilePath = join(__dirname, "./nodejs-hw1-ex1.csv");
const txtFilePath = join(__dirname, "./nodejs-hw1-ex2.txt");

const readStream = createReadStream(csvFilePath);
const writeStream = createWriteStream(txtFilePath);

readStream.on("error", console.log);
writeStream.on("error", console.log);

const transformObjToExample = (obj: {}) => {
  const transformed = {};
  Object.entries(obj).forEach(([key, value]) => {
    //@ts-ignore
    transformed[key.toLowerCase()] = parseFloat(value as string) || value;
  });
  return transformed;
};

csv({
  output: "json",
})
  .fromStream(readStream)
  .subscribe((row: any) => {
    writeStream.write(JSON.stringify(transformObjToExample(row)) + "\n");
  });
