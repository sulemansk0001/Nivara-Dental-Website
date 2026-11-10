import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Button } from '../components/common/Button';
import { AppointmentItem, EnquiryItem, Doctor, Service } from '../types';
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Lock,
  LogOut,
  Users,
  MessageSquare,
  Activity,
  Filter,
  RefreshCw
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('nivara_admin_token') || null
  );
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data
  const [activeTab, setActiveTab] = useState<'appointments' | 'enquiries' | 'doctors'>('appointments');
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    completedAppointments: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
  });
  const [loadingData, setLoadingData] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await api.adminLogin(password);
      if (res.success && res.token) {
        setToken(res.token);
        localStorage.setItem('nivara_admin_token', res.token);
      } else {
        setLoginError(res.message || 'Invalid administrative password.');
      }
    } catch {
      setLoginError('Authentication service unreachable.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('nivara_admin_token');
  };

  const loadDashboardData = async () => {
    if (!token) return;
    setLoadingData(true);
    try {
      const [ovRes, aptRes, enqRes, docRes] = await Promise.all([
        api.getAdminOverview(token),
        api.getAdminAppointments(token),
        api.getAdminEnquiries(token),
        api.getDoctors(),
      ]);

      if (ovRes && ovRes.stats) setStats(ovRes.stats);
      if (aptRes && aptRes.appointments) setAppointments(aptRes.appointments);
      if (enqRes && enqRes.enquiries) setEnquiries(enqRes.enquiries);
      if (docRes) setDoctors(docRes);
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token]);

  const handleUpdateAppointmentStatus = async (id: string, status: string) => {
    if (!token) return;
    try {
      await api.updateAppointmentStatus(id, status, token);
      setActionSuccess(`Appointment #${id} updated to ${status}.`);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, appointmentStatus: status as any } : a))
      );
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleUpdateEnquiryStatus = async (id: string, status: string) => {
    if (!token) return;
    try {
      await api.updateEnquiryStatus(id, status, token);
      setActionSuccess(`Enquiry #${id} marked as ${status}.`);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, enquiryStatus: status as any } : e))
      );
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err) {
      alert('Failed to update enquiry status.');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen py-32 bg-clinic-bg flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 bg-white rounded-card shadow-elevated border border-clinic-border space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-skyblue-light text-skyblue flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-navy">
              Staff Portal Login
            </h2>
            <p className="text-xs text-clinic-muted">
              Secure administrative access for Nivara Dental Studio clinic team.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-brand text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy block">
                Administrative Secret Key
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-brand border border-clinic-border bg-white focus:outline-none focus:ring-2 focus:ring-skyblue text-navy"
              />
              <span className="text-[10px] text-clinic-muted">
                Demo key: <code className="bg-gray-100 px-1 py-0.5 rounded text-navy">nivara_admin_secure_key_2026</code>
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoggingIn}
            >
              Sign In to Dashboard
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-clinic-bg pb-24">
      {/* Admin Top Navigation */}
      <div className="bg-white text-[#252525] px-6 py-4 shadow-subtle border-b border-[#D6EAF7] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-skyblue text-white font-heading font-black flex items-center justify-center text-sm shadow-xs">
            N
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-[#252525]">Nivara Dental Studio</div>
            <div className="text-[10px] text-[#666666]">Staff & Clinical Management Console</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={loadDashboardData}
            aria-label="Refresh data"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {actionSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-brand text-xs text-green-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 bg-white rounded-card border border-clinic-border shadow-subtle">
            <div className="text-xs text-clinic-muted font-medium">Total Appointments</div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-navy mt-1">
              {stats.totalAppointments}
            </div>
            <div className="text-[11px] text-skyblue font-bold mt-1">
              {stats.pendingAppointments} Pending Verification
            </div>
          </div>

          <div className="p-5 bg-white rounded-card border border-clinic-border shadow-subtle">
            <div className="text-xs text-clinic-muted font-medium">Confirmed Patients</div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-green-600 mt-1">
              {stats.confirmedAppointments}
            </div>
            <div className="text-[11px] text-clinic-muted mt-1">
              Ready for clinical operatory
            </div>
          </div>

          <div className="p-5 bg-white rounded-card border border-clinic-border shadow-subtle">
            <div className="text-xs text-clinic-muted font-medium">Completed Visits</div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-navy mt-1">
              {stats.completedAppointments}
            </div>
            <div className="text-[11px] text-clinic-muted mt-1">
              Successfully discharged
            </div>
          </div>

          <div className="p-5 bg-white rounded-card border border-clinic-border shadow-subtle">
            <div className="text-xs text-clinic-muted font-medium">Patient Enquiries</div>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-skyblue mt-1">
              {stats.totalEnquiries}
            </div>
            <div className="text-[11px] text-skyblue font-bold mt-1">
              {stats.newEnquiries} New Messages
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-clinic-border gap-6">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 text-sm font-bold transition-colors relative ${
              activeTab === 'appointments' ? 'text-skyblue' : 'text-clinic-muted hover:text-navy'
            }`}
          >
            <span>Appointments ({appointments.length})</span>
            {activeTab === 'appointments' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-skyblue rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`pb-3 text-sm font-bold transition-colors relative ${
              activeTab === 'enquiries' ? 'text-skyblue' : 'text-clinic-muted hover:text-navy'
            }`}
          >
            <span>Patient Enquiries ({enquiries.length})</span>
            {activeTab === 'enquiries' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-skyblue rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className={`pb-3 text-sm font-bold transition-colors relative ${
              activeTab === 'doctors' ? 'text-skyblue' : 'text-clinic-muted hover:text-navy'
            }`}
          >
            <span>Doctors & Specialists ({doctors.length})</span>
            {activeTab === 'doctors' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-skyblue rounded-full" />
            )}
          </button>
        </div>

        {/* Tab 1: Appointments Table */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-card overflow-hidden border border-clinic-border shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-clinic-bg border-b border-clinic-border text-xs uppercase text-clinic-muted font-bold">
                    <th className="py-3.5 px-4">Patient Info</th>
                    <th className="py-3.5 px-4">Treatment</th>
                    <th className="py-3.5 px-4">Specialist</th>
                    <th className="py-3.5 px-4">Date & Time</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-clinic-border text-xs">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-clinic-warm/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-navy">{apt.patientName}</div>
                        <div className="text-clinic-muted text-[11px]">{apt.phone}</div>
                        <div className="text-clinic-muted text-[11px]">{apt.email}</div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-navy">
                        {apt.treatment}
                        {apt.additionalNotes && (
                          <div className="text-[10px] text-clinic-muted italic max-w-xs truncate">
                            Note: {apt.additionalNotes}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-clinic-muted">
                        {apt.doctor}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-navy">{apt.appointmentDate}</div>
                        <div className="text-skyblue font-medium text-[11px]">{apt.appointmentTime}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            apt.appointmentStatus === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : apt.appointmentStatus === 'completed'
                              ? 'bg-blue-100 text-blue-700'
                              : apt.appointmentStatus === 'cancelled'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {apt.appointmentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        {apt.appointmentStatus === 'pending' && (
                          <button
                            onClick={() => handleUpdateAppointmentStatus(apt.id, 'confirmed')}
                            className="px-2.5 py-1 bg-green-600 text-white rounded text-[11px] font-bold hover:bg-green-700"
                          >
                            Confirm
                          </button>
                        )}
                        {apt.appointmentStatus === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateAppointmentStatus(apt.id, 'completed')}
                            className="px-2.5 py-1 bg-blue-600 text-white rounded text-[11px] font-bold hover:bg-blue-700"
                          >
                            Mark Done
                          </button>
                        )}
                        {apt.appointmentStatus !== 'cancelled' && apt.appointmentStatus !== 'completed' && (
                          <button
                            onClick={() => handleUpdateAppointmentStatus(apt.id, 'cancelled')}
                            className="px-2 py-1 bg-gray-200 text-navy rounded text-[11px] hover:bg-red-100 hover:text-red-700"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {appointments.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-clinic-muted">
                        No appointments currently scheduled.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Enquiries Table */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-card overflow-hidden border border-clinic-border shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-clinic-bg border-b border-clinic-border text-xs uppercase text-clinic-muted font-bold">
                    <th className="py-3.5 px-4">Enquirer</th>
                    <th className="py-3.5 px-4">Requested Service</th>
                    <th className="py-3.5 px-4">Message</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-clinic-border text-xs">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-clinic-warm/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-navy">{enq.patientName}</div>
                        <div className="text-clinic-muted text-[11px]">{enq.phone}</div>
                        <div className="text-clinic-muted text-[11px]">{enq.email}</div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-navy">
                        {enq.requestedService}
                      </td>
                      <td className="py-3.5 px-4 text-clinic-muted max-w-sm">
                        {enq.message}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            enq.enquiryStatus === 'resolved'
                              ? 'bg-green-100 text-green-700'
                              : enq.enquiryStatus === 'contacted'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {enq.enquiryStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        {enq.enquiryStatus === 'new' && (
                          <button
                            onClick={() => handleUpdateEnquiryStatus(enq.id, 'contacted')}
                            className="px-2.5 py-1 bg-blue-600 text-white rounded text-[11px] font-bold hover:bg-blue-700"
                          >
                            Mark Contacted
                          </button>
                        )}
                        {enq.enquiryStatus !== 'resolved' && (
                          <button
                            onClick={() => handleUpdateEnquiryStatus(enq.id, 'resolved')}
                            className="px-2.5 py-1 bg-green-600 text-white rounded text-[11px] font-bold hover:bg-green-700"
                          >
                            Mark Resolved
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {enquiries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-clinic-muted">
                        No enquiries currently received.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Doctors List */}
        {activeTab === 'doctors' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((d) => (
              <div key={d.id} className="p-6 bg-white rounded-card border border-clinic-border shadow-subtle space-y-3">
                <img
                  src={d.profileImage}
                  alt={d.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-skyblue"
                />
                <div>
                  <h4 className="font-heading text-base font-bold text-navy">{d.name}</h4>
                  <div className="text-xs text-skyblue font-semibold">{d.specialisation}</div>
                  <div className="text-xs text-clinic-muted mt-0.5">{d.qualification}</div>
                </div>
                <div className="text-xs text-clinic-muted">
                  <strong>Fee:</strong> {d.consultationFee}
                </div>
                <div className="text-[11px] text-gray-400">
                  <strong>Days:</strong> {d.daysAvailable.join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
