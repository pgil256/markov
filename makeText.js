/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function showText(text) {
    let MarkovMachine = new markov.MarkovMachine(text);
    console.log(MarkovMachine.makeText());
  }

function createText(path) {
  fs.readFile(path, "utf8", function callback(error, data) {
    if (error) {
      console.error(`${error}`);
      process.exit(1);
    } else {
      showText(data);
    }
  });

}


async function createURL(url) {
    let response;
  
    try {
      response = await axios.get(url);
    } catch (error) {
      console.error(`${error}`);
      process.exit(1);
    }
    showText(response.data)
  }

  let [method, path] = process.argv.slice(2);

  if (method === "file") {
    createText(path);
  }
  else if (method === "url") {
    createURL(path);
  }
  else {
    console.error(`${method} not applicable.`);
    process.exit(1);
  }