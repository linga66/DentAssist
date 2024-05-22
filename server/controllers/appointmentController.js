const Appointment = require('../models/appointment');
const { updateGoogleCalendarEvent, setCredentials } = require('../services/googleCalendarService');

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error retrieving appointments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addAppointment = async (req, res) => {
  const { patient, date, time, notes, googleTokens, eventId } = req.body;
  setCredentials(googleTokens);

  try {
    const newAppointment = new Appointment({
      patient,
      date,
      time,
      notes,
      eventId
    });
    await newAppointment.save();

    await updateGoogleCalendarEvent(eventId, date, time);

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error adding appointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { date, time, googleTokens, eventId } = req.body;

  setCredentials(googleTokens);

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { date, time },
      { new: true }
    );
    await updateGoogleCalendarEvent(eventId, date, time);

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    await Appointment.findByIdAndDelete(appointmentId);

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};
