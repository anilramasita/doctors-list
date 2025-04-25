import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDoctors } from '../api/doctors';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    (async () => {
      const all = await fetchDoctors();
      setDoctor(all.find(d => d.id === id));
    })();
  }, [id]);

  if (!doctor) return <p className="p-6">Loading…</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-6 bg-blue-600 text-white">
        <h1 className="text-2xl">Book Appointment</h1>
      </header>
      <main className="p-6">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
            
          <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
          <p className="text-gray-600 mb-4">{doctor.specialities.map(s => s.name).join(', ')}</p>
          <p className="mb-2"><strong>Clinic:</strong> {doctor.clinic.name}</p>
          <p className="mb-4 text-gray-600">
            <strong>Location:</strong> {doctor.clinic.address.locality}, {doctor.clinic.address.city}
          </p>

          {/* Experience and Qualification */}
          <p className="text-sm text-gray-600">
            <strong>Experience:</strong> {doctor.experience} years
          </p>
          <p className="text-sm text-gray-600">
            <strong>Qualification:</strong> {doctor.qualification}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Confirm & Continue
            </button>

            {/* Back button */}
            <button
              onClick={() => navigate(-1)} // Go back to the previous page
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
