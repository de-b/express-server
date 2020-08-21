const express = require("express");

const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", (req, res) => {
  fs.writeFile("./files/test.txt", "this is content for text", function (
    err,
    done
  ) {
    if (err) {
      res.json({
        msg: `Can not create a file ${err}`,
      });
    } else {
      res.json({
        msg: `Successfully created a file ${done}`,
      });
    }
  });
});

app.get("/write/:name/:content", (req, res) => {
  fs.writeFile("./files/" + req.params.name, req.params.content, function (
    err,
    done
  ) {
    if (err) {
      res.json("Error: could not create a file", err);
    } else {
      res.json("successfully created a file", done);
    }
  });
});

app.get("/read/:name", function (req, res) {
  fs.readFile("./files/" + req.params.name, function (err, done) {
    if (err) {
      res.json("can not access the file " + req.params.name + err);
    } else {
      res.json(
        "file you have request is " +
          req.params.name +
          " and the content is >>>>> " +
          done
      );
    }
  });
});

app.listen(9000, function (err, done) {
  if (err) {
    console.log("server not running");
  } else {
    console.log("server running successfully on 9000");
  }
});
