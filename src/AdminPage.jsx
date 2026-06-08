import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { adminLogin, adminGetData, adminUpdateStatus, adminDeleteRecord } from './api';

const STORED_PWD_KEY = 'dmh_admin_pwd';

const STATUS_COLORS = { new: '#4a90e2', contacted: '#f6c200', closed: '#1d9e6c' };

function StatCard({ label, value, color }) {
  return (
    <div className="col-6 col-lg-3">
      <div className="admin-stat-card" style={{ borderTop: `4px solid ${color}` }}>
        <div className="admin-stat-value" style={{ color }}>{value}</div>
        <div className="admin-stat-label">{label}</div>
      </div>
    </div>
  );
}

function DataTable({ title, rows, columns, color, collection, password, onRefresh }) {
  const [search, setSearch] = useState('');

  const filtered = rows.filter((row) =>
    columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(search.toLowerCase()))
  );

  const handleStatus = async (id, status) => {
    await adminUpdateStatus(collection, id, status, password);
    onRefresh();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    await adminDeleteRecord(collection, id, password);
    onRefresh();
  };

  return (
    <div className="admin-table-section mb-5">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        <h5 className="admin-table-title mb-0" style={{ borderLeft: `4px solid ${color}`, paddingLeft: '0.75rem' }}>
          {title} <span className="admin-count-badge">{rows.length}</span>
        </h5>
        <input
          className="form-control form-control-sm admin-search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty">No records found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table admin-table">
            <thead>
              <tr>
                <th>#</th>
                {columns.map((col) => <th key={col.key}>{col.label}</th>)}
                <th>Submitted</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={row._id}>
                  <td className="text-muted fw-bold">{i + 1}</td>
                  {columns.map((col) => (
                    <td key={col.key} title={row[col.key] || ''}>
                      {row[col.key] || '—'}
                    </td>
                  ))}
                  <td className="text-muted small" style={{ whiteSpace: 'nowrap' }}>
                    {row.createdAt
                      ? new Date(row.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
                      : '—'}
                  </td>
                  <td>
                    <select
                      className="admin-status-select"
                      value={row.status || 'new'}
                      style={{ borderColor: STATUS_COLORS[row.status || 'new'], color: STATUS_COLORS[row.status || 'new'] }}
                      onChange={(e) => handleStatus(row._id, e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-danger admin-delete-btn" 
                      onClick={() => handleDelete(row._id)} 
                      title="Delete"
                      style={{ width: '30px', height: '30px', padding: '0', lineHeight: '1' }}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [pwdInput, setPwdInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ enquiries: [], contacts: [], bookings: [] });
  const [offline, setOffline] = useState(false);

  const fetchData = useCallback(async (pwd) => {
    setLoading(true);
    try {
      const result = await adminGetData(pwd);
      if (result.offline) {
        setOffline(true);
        // fallback to localStorage
        setData({
          enquiries: JSON.parse(localStorage.getItem('dmh_enquiries') || '[]'),
          contacts: JSON.parse(localStorage.getItem('dmh_contact_messages') || '[]'),
          bookings: JSON.parse(localStorage.getItem('dmh_bookings') || '[]'),
        });
      } else if (result.success) {
        setOffline(false);
        setData({ enquiries: result.enquiries, contacts: result.contacts, bookings: result.bookings });
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
      setOffline(true);
      setData({
        enquiries: JSON.parse(localStorage.getItem('dmh_enquiries') || '[]'),
        contacts: JSON.parse(localStorage.getItem('dmh_contact_messages') || '[]'),
        bookings: JSON.parse(localStorage.getItem('dmh_bookings') || '[]'),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setError('');
    const result = await adminLogin(pwdInput);
    if (result.success) {
      sessionStorage.setItem(STORED_PWD_KEY, pwdInput);
      setPassword(pwdInput);
      setAuthed(true);
      fetchData(pwdInput);
    } else if (result.offline) {
      // backend not running — verify against hardcoded password and use localStorage
      if (pwdInput === 'surya@123') {
        sessionStorage.setItem(STORED_PWD_KEY, pwdInput);
        setPassword(pwdInput);
        setAuthed(true);
        fetchData(pwdInput);
      } else {
        setError('Incorrect password.');
      }
    } else {
      setError('Incorrect password.');
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(STORED_PWD_KEY);
    if (saved) {
      setPassword(saved);
      setAuthed(true);
      fetchData(saved);
    }
  }, [fetchData]);

  const logout = () => {
    sessionStorage.removeItem(STORED_PWD_KEY);
    setAuthed(false);
    setPassword('');
    setPwdInput('');
  };

  if (!authed) {
    return (
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <div className="admin-login-logo">DM Holidays</div>
          <h2 className="admin-login-title">Admin Panel</h2>
          <p className="admin-login-sub">Sign in to manage enquiries and submissions.</p>
          <form onSubmit={login}>
            <input
              className="form-control admin-login-input mb-3"
              type="password"
              placeholder="Enter admin password"
              value={pwdInput}
              onChange={(e) => setPwdInput(e.target.value)}
              autoFocus
            />
            {error && <div className="admin-login-error mb-3">{error}</div>}
            <button type="submit" className="btn admin-login-btn w-100">Sign In</button>
          </form>
          <Link to="/" className="admin-login-back">← Back to website</Link>
        </div>
      </div>
    );
  }

  const total = data.enquiries.length + data.contacts.length + data.bookings.length;
  const newCount = [...data.enquiries, ...data.contacts, ...data.bookings]
    .filter((r) => !r.status || r.status === 'new')
    .length;

  const enquiryCols = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'destination', label: 'Destination' },
    { key: 'date', label: 'Travel Date' },
    { key: 'people', label: 'Travelers' },
    { key: 'message', label: 'Message' },
  ];

  const contactCols = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'city', label: 'City' },
    { key: 'tripType', label: 'Trip Type' },
    { key: 'travelers', label: 'Travelers' },
    { key: 'message', label: 'Message' },
  ];

  const bookingCols = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'city', label: 'City' },
    { key: 'destination', label: 'Destination' },
    { key: 'date', label: 'Travel Date' },
    { key: 'people', label: 'People' },
    { key: 'vacationType', label: 'Vacation Type' },
  ];

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header-brand">
          <span className="admin-dot" />
          DM Holidays — Admin
        </div>
        <div className="d-flex align-items-center gap-3">
          {offline && <span className="admin-offline-badge">⚠ Offline Mode</span>}
          <Link to="/" className="admin-header-link">View Site</Link>
          <button className="btn admin-logout-btn" onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="admin-main container-fluid">
        <div className="admin-page-title-row mb-4">
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-sub">
            {offline ? 'Showing localStorage data — start the backend server for live MongoDB data.' : 'Live data from MongoDB'}
          </p>
        </div>

        <div className="row g-3 mb-5">
          <StatCard label="Total Submissions" value={total} color="#f6c200" />
          <StatCard label="New / Unread" value={newCount} color="#e25c4a" />
          <StatCard label="Enquiries" value={data.enquiries.length} color="#4a90e2" />
          <StatCard label="Bookings" value={data.bookings.length} color="#1d9e6c" />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            {offline && (
              <div className="alert alert-warning py-2 mb-0" style={{ fontSize: '0.875rem' }}>
                ⚠ Offline mode: Showing localStorage data. Start backend server for live MongoDB data.
              </div>
            )}
          </div>
          <button
            className="btn btn-outline-primary admin-refresh-btn"
            onClick={() => fetchData(password)}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Loading...
              </>
            ) : (
              <>↻ Refresh Data</>
            )}
          </button>
        </div>

        <DataTable
          title="Enquiry Submissions"
          rows={data.enquiries}
          columns={enquiryCols}
          color="#4a90e2"
          collection="enquiries"
          password={password}
          onRefresh={() => fetchData(password)}
        />

        {data.contacts.length > 0 && (
          <DataTable
            title="Contact Submissions"
            rows={data.contacts}
            columns={contactCols}
            color="#e25c4a"
            collection="contacts"
            password={password}
            onRefresh={() => fetchData(password)}
          />
        )}

        {data.bookings.length > 0 && (
          <DataTable
            title="Booking Submissions"
            rows={data.bookings}
            columns={bookingCols}
            color="#1d9e6c"
            collection="bookings"
            password={password}
            onRefresh={() => fetchData(password)}
          />
        )}
      </main>
    </div>
  );
}
