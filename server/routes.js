import express from 'express';
import { Enquiry, Contact, Booking } from './models.js';

const router = express.Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dmholidays2024';

// ── Submit enquiry ──────────────────────────────────────────────
router.post('/enquiry', async (req, res) => {
  try {
    const doc = await Enquiry.create(req.body);
    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ── Submit contact ──────────────────────────────────────────────
router.post('/contact', async (req, res) => {
  try {
    const doc = await Contact.create(req.body);
    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ── Submit booking ──────────────────────────────────────────────
router.post('/booking', async (req, res) => {
  try {
    const doc = await Booking.create(req.body);
    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ── Admin login ─────────────────────────────────────────────────
router.post('/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect password.' });
  }
});

// ── Admin: get all data ─────────────────────────────────────────
router.get('/admin/data', async (req, res) => {
  const { password } = req.query;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
  const [enquiries, contacts, bookings] = await Promise.all([
    Enquiry.find().sort({ createdAt: -1 }).lean(),
    Contact.find().sort({ createdAt: -1 }).lean(),
    Booking.find().sort({ createdAt: -1 }).lean(),
  ]);
  res.json({ success: true, enquiries, contacts, bookings });
});

// ── Admin: update status ────────────────────────────────────────
router.patch('/admin/:collection/:id', async (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
  const models = { enquiries: Enquiry, contacts: Contact, bookings: Booking };
  const Model = models[req.params.collection];
  if (!Model) return res.status(404).json({ success: false, message: 'Not found.' });
  const doc = await Model.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json({ success: true, doc });
});

// ── Admin: delete one record ────────────────────────────────────
router.delete('/admin/:collection/:id', async (req, res) => {
  const { password } = req.query;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
  const models = { enquiries: Enquiry, contacts: Contact, bookings: Booking };
  const Model = models[req.params.collection];
  if (!Model) return res.status(404).json({ success: false, message: 'Not found.' });
  await Model.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
