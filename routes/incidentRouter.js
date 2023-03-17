const {
  getIncidents,
  addIncident,
  getIncidentByID,
  updateIncidentID,
  deleteIncidentByID,
} = require("../controllers/IncidentControllers");
const forbiddenMethod = require("../controllers/forbiddenMethod");
const express = require("express");
const { verifyUser, verifyAdmin, verifySecurity} = require("../authenticate");

const router = express.Router();

router
  .route("/")
  .get(getIncidents)
  .post(addIncident)
  .put(forbiddenMethod)
  .delete(forbiddenMethod);

router
  .route("/:id")
  .get(verifyUser, verifySecurity, getIncidentByID)
  .post(forbiddenMethod)
  .put(verifyUser, verifySecurity, updateIncidentID)
  .delete(verifyUser, verifySecurity, verifyAdmin, deleteIncidentByID);

module.exports = router;
