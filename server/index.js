// TODO Write a server program using Node and Express
//import imageProcessor from "./imageProcessor";
const express = require("express");
const imageProcessor = require("./imageProcessor");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    //res.send("color");
    res.send("Welcome to the University Logo API!" +
    "<br/>This simple API can be used to get a university's logo as an image file." +
    "<br/>The following endpoint is available:\nGET /:uni/:color/:size" +
    "<br/>* uni is the colloquial abbreviated name of a university, such as JHU for Johns Hopkins University." +
    "<br/>* color is a color name such as black or blue." +
    "<br/>* size is a value between 20 to 500 (inclusive) that specifies the image dimensions (size-by-size)"+
    "<br/><br/>Example: /jhu/blue/150");
    
});


app.get("/:uni/:color/:size", async (req, res) => {
    const { uni, color, size } = req.params;
    try{    
      const data = await imageProcessor({uni, color, size});
      res.status(200);
      res.setHeader('Content-disposition', 'inline; filename=' + `${uni}-${color}-${size}-by-${size}.png`);
      res.writeHead(200, {"Content-Type": "image/png", "Content-Length": data.length});
      res.end(data);
    } catch(err) {
      res.status(err.status).json({message: err.message});
    }
    
  });


  app.all("*", (req, res) => {
    res.status(404).send("GET " + req.url + " is not supported.");
  });

app.listen(port, () => {
    console.log(`Express app listening at port: http://localhost:${port}/`);
  });

