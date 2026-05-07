const Appointment = require('../models/appointmentModel');

// CREATE APPOINTMENT
exports.createAppointment = async (req, res) => {
    const { name, date, time, reason } = req.body;

    if (!name || !date || !time) {
        return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const appointment = new Appointment.create({
        user: req.user,
        name,
        date,
        time,
        reason
    });

    res.json(appointment);
};

// GET USER APPOINTMENTS
exports.getAppointments = async (req, res) => {
    const appointments = await Appointment.find({ user: req.user });
    res.json(appointments);
};

// UPDATE APPOINTMENT
exports.updateAppointment = async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
    }

    const updated = await Appointment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updated);
};

// DELETE APPOINTMENT
exports.deleteAppointment = async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
    }
    
    await appointment.remove();
    res.json({ message: 'Appointment deleted' });
};