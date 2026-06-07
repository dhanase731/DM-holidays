const BASE = import.meta.env.VITE_API_URL || null;

async function post(endpoint, data) {
  if (!BASE) return { success: false, offline: true };
  try {
    const res = await fetch(`${BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return { success: false, offline: true };
  }
}

export async function submitEnquiry(data) {
  // always save to localStorage too
  const list = JSON.parse(localStorage.getItem('dmh_enquiries') || '[]');
  const entry = { ...data, submittedAt: new Date().toISOString() };
  localStorage.setItem('dmh_enquiries', JSON.stringify([entry, ...list]));
  sessionStorage.setItem('dmh_last_enquiry', JSON.stringify(entry));
  return post('enquiry', data);
}

export async function submitContact(data) {
  const list = JSON.parse(localStorage.getItem('dmh_contact_messages') || '[]');
  const entry = { ...data, submittedAt: new Date().toISOString() };
  localStorage.setItem('dmh_contact_messages', JSON.stringify([entry, ...list]));
  sessionStorage.setItem('dmh_last_contact', JSON.stringify(entry));
  return post('contact', data);
}

export async function submitBooking(data) {
  const list = JSON.parse(localStorage.getItem('dmh_bookings') || '[]');
  const entry = { ...data, submittedAt: new Date().toISOString() };
  localStorage.setItem('dmh_bookings', JSON.stringify([entry, ...list]));
  sessionStorage.setItem('dmh_last_booking', JSON.stringify(entry));
  return post('booking', data);
}

export async function adminLogin(password) {
  return post('admin/login', { password });
}

export async function adminGetData(password) {
  if (!BASE) return { success: false, offline: true };
  try {
    const res = await fetch(`${BASE}/admin/data?password=${encodeURIComponent(password)}`);
    return await res.json();
  } catch {
    return { success: false, offline: true };
  }
}

export async function adminUpdateStatus(collection, id, status, password) {
  if (!BASE) return { success: false };
  try {
    const res = await fetch(`${BASE}/admin/${collection}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, password }),
    });
    return await res.json();
  } catch {
    return { success: false };
  }
}

export async function adminDeleteRecord(collection, id, password) {
  if (!BASE) return { success: false };
  try {
    const res = await fetch(`${BASE}/admin/${collection}/${id}?password=${encodeURIComponent(password)}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch {
    return { success: false };
  }
}
