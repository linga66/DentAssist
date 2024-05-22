const express = require('express');
const router = express.Router();
const { getAppointments, addAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const validateObjectId = require('../middleware/validObjectId');

router.get('/', getAppointments);
router.post('/', addAppointment);
router.put('/:id', validateObjectId, updateAppointment);
router.delete('/:id', validateObjectId, deleteAppointment);

module.exports = router;
