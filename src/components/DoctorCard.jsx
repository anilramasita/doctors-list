import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  const fallback = 'https://via.placeholder.com/100x100.png?text=No+Photo';
  const imgSrc = doctor.photo && doctor.photo !== 'null' ? doctor.photo : fallback;

  return (
    <div
      className="flex flex-col sm:flex-row justify-between p-4 border rounded-lg bg-white shadow mb-4"
      data-testid="doctor-card"
    >
      {/* Left: image + text */}
      <div className="flex items-start gap-4">
        <img
          src={imgSrc}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover border"
          onError={e => { e.target.onerror = null; e.target.src = fallback; }}
        />
        <div>
          <h3
            className="text-xl font-semibold text-gray-800"
            data-testid="doctor-name"
          >
            {doctor.name}
          </h3>
          <p
            className="text-sm text-gray-500"
            data-testid="doctor-specialty"
          >
            {doctor.specialities.map(s => s.name).join(', ')}
          </p>
          {/* Experience */}
          <p
            className="text-sm text-gray-600 mt-1"
            data-testid="doctor-experience"
          >
            <strong>Experience:</strong> {doctor.experience}
          </p>
          
          {/* Qualification */}
          <p className="text-sm text-gray-600">
            <strong>Qualification:</strong> {doctor.specialities.map(s => s.name).join(', ')}
          </p>

          {/* Clinic & Location */}
          <p className="text-sm text-gray-600 mt-1">
            <strong>Clinic:</strong> {doctor.clinic.name}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Location:</strong> {doctor.clinic.address.locality}, {doctor.clinic.address.city}
          </p>
        </div>
      </div>

      {/* Right: fee + button */}
      <div className="flex flex-col items-end justify-between">
        <p
          className="text-lg font-semibold"
          data-testid="doctor-fee"
        >
          {doctor.fees}
        </p>
        <button
          onClick={() => navigate(`/book/${doctor.id}`)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
