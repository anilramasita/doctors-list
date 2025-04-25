import React from 'react';
import DoctorCard from './DoctorCard';

const DoctorList = ({ doctors }) => {
  if (doctors.length === 0) {
    return <p className="text-center p-8 text-gray-500">No doctors found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6">
      {doctors.map((doc) => (
        <DoctorCard key={doc.id} doctor={doc} />
      ))}
    </div>
  );
};

export default DoctorList;
