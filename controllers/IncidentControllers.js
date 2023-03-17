const Incident = require("../models/incident");
const path = require("path");



getIncidents = async (req, res) => {
  // console.log(req.headers);
  try {
    const incidents = await Incident.find({});
    if (!incidents) throw new Error("no incident");
    res.status(200).json({ success: true, data: incidents });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

addIncident = async (req, res) => {
  // const props = Object.keys(Incident.schema.obj);
  try {

        const incident = await Incident.create(req.body);
        console.log(incident);

        res.status(200).json({ success: true, data: incident });

  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

getIncidentByID = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const incident = await Incident.findById(id);
    if (incident) res.status(200).json({ sucess: true, data: incident });
    else
      res
        .status(400)
        .json({ sucess: false, msg: "no entry match incident ID" });
  } catch (error) {
    res.status(500).json({ sucess: false, msg: error });
  }
};

updateIncidentID = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const update_incident = await Incident.findByIdAndUpdate(id, req.body);
    if (!update_incident) {
      const err = new Error();
      err.message = "No incident updated";
      throw err;
    }
    res.status(200).json({ success: true, data: id });
  } catch ({ message }) {
    res.status(500).json({ success: false, message });
  }
};

deleteIncidentByID = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const delete_incident = await Incident.findByIdAndDelete(id);
    if (!delete_incident) return;
    res.status(200).json({ sucess: true, id });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

getIncidentCrime = async (req, res) => {
  const { id } = req.params;
  const incident = await Incident.findById(id).populate("crime");
  res.json({ mode: "texting", data: incident.crime });
};

module.exports = {
  getIncidents,
  addIncident,
  getIncidentByID,
  updateIncidentID,
  deleteIncidentByID,
  getIncidentCrime,
};
