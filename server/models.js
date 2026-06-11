import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  email:       { type: String, required: true, trim: true },
  phone:       { type: String, required: true, trim: true },
  destination: { type: String, required: true, trim: true },
  date:        { type: String, trim: true },
  people:      { type: String, trim: true },
  message:     { type: String, trim: true },
  source:      { type: String, default: 'enquiry-page' },
  status:      { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true },
  phone:     { type: String, required: true, trim: true },
  city:      { type: String, trim: true },
  area:      { type: String, trim: true },
  date:      { type: String, trim: true },
  tripType:  { type: String, trim: true },
  travelers: { type: String, trim: true },
  message:   { type: String, trim: true },
  status:    { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  email:       { type: String, required: true, trim: true },
  phone:       { type: String, required: true, trim: true },
  city:        { type: String, trim: true },
  whatsapp:    { type: String, trim: true },
  destination: { type: String, trim: true },
  date:        { type: String, trim: true },
  people:      { type: String, trim: true },
  vacationType:{ type: String, trim: true },
  status:      { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true });

const visitorSchema = new mongoose.Schema({
  name:      { type: String, trim: true, default: 'Guest' },
  email:     { type: String, trim: true, default: '' },
  page:      { type: String, trim: true, default: '/' },
  action:    { type: String, trim: true, default: 'visit' },
  userAgent: { type: String, trim: true, default: '' },
  ip:        { type: String, trim: true, default: '' },
}, { timestamps: true });

const siteSettingsSchema = new mongoose.Schema({
  key:   { type: String, unique: true, trim: true },
  value: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

export const Enquiry      = mongoose.model('Enquiry', enquirySchema);
export const Contact      = mongoose.model('Contact', contactSchema);
export const Booking      = mongoose.model('Booking', bookingSchema);
export const Visitor      = mongoose.model('Visitor', visitorSchema);
export const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
