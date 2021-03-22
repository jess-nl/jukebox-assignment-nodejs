const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
require("dotenv/config");

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
        const filterByModel = (features) => {
          let match = [];

          for (let i = 0; i < features.length; i++) {
            let featuresPerJuke = features[i];
            let model = jukeboxes[i].model;

            if (
              typeof selectedModel !== "undefined" &&
              selectedModel &&
              selectedModel.length > 0 &&
              model === selectedModel &&
              featuresPerJuke.some((y) => settingRequirements.includes(y))
            ) {
              match.push(jukeboxes[i]);
            }

            if (
              (typeof selectedModel === "undefined" ||
                !selectedModel ||
                selectedModel.length <= 0) &&
              featuresPerJuke.some((y) => settingRequirements.includes(y))
            ) {
              match.push(jukeboxes[i]);
            }
          }

          return match;
        };

        res.send(filterByModel(featuresAvailable));
      })
    )
    .catch((error) => console.log(error));
});
