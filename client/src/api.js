const BASE = import.meta.env.VITE_API_URL;

if (!BASE) console.error('VITE_API_URL is not set');

async function post(endpoint, data) {
  const res = await fetch(`${BASE}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}

async function get(endpoint) {
  const res = await fetch(`${BASE}/${endpoint}`);
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}

async function patch(endpoint, data) {
  const res = await fetch(`${BASE}/${endpoint}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}

async function del(endpoint) {
  const res = await fetch(`${BASE}/${endpoint}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}

export async function submitEnquiry(data) { return post('enquiry', data); }
export async function submitContact(data) { return post('contact', data); }
export async function submitBooking(data) { return post('booking', data); }

export async function trackVisitor(data) {
  try { return await post('visitor', data); } catch { /* silent */ }
}

export async function getPublicSettings() { return get('settings'); }

export async function adminLogin(password) { return post('admin/login', { password }); }
export async function adminGetData(password) { return get(`admin/data?password=${encodeURIComponent(password)}`); }
export async function adminUpdateStatus(collection, id, status, password) {
  return patch(`admin/${collection}/${id}`, { status, password });
}
export async function adminDeleteRecord(collection, id, password) {
  return del(`admin/${collection}/${id}?password=${encodeURIComponent(password)}`);
}
export async function adminSaveSettings(data) { return post('admin/settings', data); }
