require("dotenv").config();

const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/api/", (_req, res) => {
  res.status(200).json({
    msg: "Welcome to the translation tool 🥂",
  });
});

// POST REST Api for translating the text from one to another languages both provided from the user
app.post("/api/translate", async (req, res) => {
  if (!req.body.text)
    return res.status(400).json({
      msg: 'The "text" field was not provided or is empty.',
    });

  try {
    const options = {
      method: "POST",
      url: "https://langsync.p.rapidapi.com/",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "langsync.p.rapidapi.com",
      },
      data: {
        word: req.body.text,
        to: "fr",
        from: "auto",
      },
    };

    const response = await axios.request(options);

    return res.status(200).json({ translation: response.data.data.text });
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("*", (req, res) => {
  res.redirect("/api/");
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else {
    console.log(`Your app is running on ${PORT} 🥂`);
  }
});
