const Patient = require('../models/Patient');

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addPatient = async (req, res) => {
  const { name, age, contact } = req.body;
  const newPatient = new Patient({ name, age, contact });

  try {
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  const { name, age, contact } = req.body;

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, { name, age, contact }, { new: true });
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    await Patient.findByIdAndDelete(id);
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
};
