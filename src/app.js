import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
require("dotenv/config");

import filterByModel from "./utils/filterByModel.js";

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});

app.get(`/api/v1/jukeboxes`, (req, res) => {
  let selectedSettingId = req.query.settingId;
  let selectedModel = req.query.model;

  if (!selectedSettingId) {
    res.send([]);
  }

  axios
    .all([
      axios.get(process.env.ASSIGNMENT_SETTINGS),
      axios.get(process.env.ASSIGNMENT_JUKEBOXES),
    ])
    .then(
      axios.spread((settingsData, jukeboxesData) => {
        let settings = settingsData.data["settings"];
        let jukeboxes = jukeboxesData.data;

        /* Array of requirements from selected setting ID */
        let setting = settings.filter((x) => x.id === selectedSettingId);
        let settingRequirements = setting[0]["requires"];

        /* Find jukebox names (features for each jukebox) */
        let featuresAvailable = jukeboxes.map((x) =>
          x.components ? x.components.map((y) => y.name) : null
        );

        /* Filter by model name */
        res.send(
          filterByModel(
            featuresAvailable,
            jukeboxes,
            selectedModel,
            settingRequirements
          )
        );
      })
    )
    .catch((error) => console.log(error));
});
