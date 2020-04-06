const Clarifai = require('clarifai');
// import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "4060302e88684205ac4cf81edf5bad47"
});

// Further Models, see https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
// Clarifai.COLOR_MODEL,
const handleApiCall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        res.json(entries[0]);
      })
      .catch((err) => res.status(400).json("unable to get entries"));
  }

  module.exports =  {
      handleImage,
      handleApiCall
  }