import express from 'express';
import { Enquiry, Contact, Booking } from './models.js';

const router = express.Router();

function auth(password, res) {
  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ success: false, message: 'Unauthorized.' });
    return false;
  }
  return true;
}

router.post('/enquiry', async (req, res) => {
  try {
    const doc = await Enquiry.create(req.body);
    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/contact', async (req, res) => {
  try {
    const doc = await Contact.create(req.body);
    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/booking', async (req, res) => {
  try {
    const doc = await Booking.create(req.body);
    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/admin/login', (req, res) => {
  if (!auth(req.body.password, res)) return;
  res.json({ success: true });
});

router.get('/admin/data', async (req, res) => {
  if (!auth(req.query.password, res)) return;
  try {
    const [enquiries, contacts, bookings] = await Promise.all([
      Enquiry.find().sort({ createdAt: -1 }).lean(),
      Contact.find().sort({ createdAt: -1 }).lean(),
      Booking.find().sort({ createdAt: -1 }).lean(),
    ]);
    res.json({ success: true, enquiries, contacts, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.patch('/admin/:collection/:id', async (req, res) => {
  if (!auth(req.body.password, res)) return;
  const models = { enquiries: Enquiry, contacts: Contact, bookings: Booking };
  const Model = models[req.params.collection];
  if (!Model) return res.status(404).json({ success: false, message: 'Not found.' });
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/admin/:collection/:id', async (req, res) => {
  if (!auth(req.query.password, res)) return;
  const models = { enquiries: Enquiry, contacts: Contact, bookings: Booking };
  const Model = models[req.params.collection];
  if (!Model) return res.status(404).json({ success: false, message: 'Not found.' });
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
