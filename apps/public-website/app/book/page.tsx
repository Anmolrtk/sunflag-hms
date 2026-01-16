"use client";

import { useState, useEffect } from "react";

export default function BookAppointmentPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Helper to get today's date string (YYYY-MM-DD)
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // State
  const [dateInput, setDateInput] = useState(getTodayString()); // Default to Today
  const [timeSlot, setTimeSlot] = useState("Morning"); // Default to Morning

  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    reason: "",
    doctorId: ""
  });

  // Fetch Doctors
  useEffect(() => {
    fetch("http://localhost:3001/users/public/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Failed to load doctors", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. COMBINE DATE & TIME SLOT
      // Morning = 10:00 AM, Evening = 5:00 PM (17:00)
      const timeString = timeSlot === "Morning" ? "10:00:00" : "17:00:00";
      const finalDateTime = `${dateInput}T${timeString}`;

      // 2. Prepare Payload
      const payload = {
        ...formData,
        date: finalDateTime // Send as combined ISO string
      };

      console.log("📤 Sending Data:", payload);

      const res = await fetch("http://localhost:3001/appointments/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Server rejected the booking");
      }

      setSuccess(true);
      
    } catch (err: any) {
      console.error("❌ Booking Error:", err);
      setError(err.message);
      alert("Booking Failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

    // 5. Success View
    // 5. Success View (Updated Date Format)
      if (success) {
        // Convert YYYY-MM-DD to DD-MM-YYYY for display
        const formattedDate = dateInput.split('-').reverse().join('-');

        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                You will get confirmation soon on your mobile number.
              </h2>
              
              <p className="text-gray-600 mb-6 text-sm">
                Thank you for booking with us. Your appointment for <strong>{timeSlot}</strong> on <strong>{formattedDate}</strong> has been received.
              </p>
              
              <button
                onClick={() => window.location.href = "/"} // Redirect to Home
                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        );
      }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Book Appointment</h2>
          <p className="mt-2 text-gray-600">Schedule a visit with our specialists</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              name="patientName"
              required
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              name="patientPhone"
              required
              type="tel"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              onChange={handleChange}
            />
          </div>

          {/* NEW: Date Picker (Defaults to Today) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </div>

          {/* NEW: Time Slot Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTimeSlot("Morning")}
                className={`p-3 text-center rounded-lg border ${
                  timeSlot === "Morning" 
                    ? "bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-200" 
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                ☀️ Morning (10 AM)
              </button>
              
              <button
                type="button"
                onClick={() => setTimeSlot("Evening")}
                className={`p-3 text-center rounded-lg border ${
                  timeSlot === "Evening" 
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-200" 
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                🌙 Evening (5 PM)
              </button>
            </div>
          </div>

          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
            <select
              name="doctorId"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              onChange={handleChange}
            >
              <option value="">-- Choose a Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                {doc.fullName} ({doc.doctorProfile?.specialization || "General"})
                </option>
              ))}
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Reason for Visit</label>
            <textarea
              name="reason"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"}`}
          >
            {loading ? "Confirming..." : "Confirm Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
