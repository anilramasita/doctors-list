import React, { useEffect, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import Filters from './components/Filters';
import DoctorList from './components/DoctorList';
import BookingPage from './components/BookingPage';
import { fetchDoctors } from './api/doctors';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [allSpecialties, setAllSpecialties] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    consultation: '',
    specialties: [],
    sort: ''
  });
  
  useEffect(() => {
    const sp = searchParams.get('search') || '';
    const consultation = searchParams.get('consultation') || '';
    const sort = searchParams.get('sort') || '';
    const specialties = searchParams.getAll('specialties');
    setFilters({ search: sp, consultation, specialties, sort });
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      const data = await fetchDoctors();
      setDoctors(data);

      const specs = Array.from(
        new Set(
          data.flatMap(doc => doc.specialities.map(s => s.name))
        )
      );
      setAllSpecialties(specs);
    })();
  }, []);

  useEffect(() => {
    let result = [...doctors];

    if (filters.search) {
      result = result.filter(doc =>
        doc.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.consultation === 'video') {
      result = result.filter(doc => doc.video_consult);
    } else if (filters.consultation === 'clinic') {
      result = result.filter(doc => doc.in_clinic);
    }

    if (filters.specialties.length) {
      result = result.filter(doc =>
        doc.specialities.some(s => filters.specialties.includes(s.name))
      );
    }

    if (filters.sort === 'fees') {
      result.sort(
        (a, b) =>
          parseInt(a.fees.replace(/\D/g, '')) -
          parseInt(b.fees.replace(/\D/g, ''))
      );
    } else if (filters.sort === 'experience') {
      result.sort(
        (a, b) =>
          parseInt(b.experience) - parseInt(a.experience)
      );
    }

    setFilteredDoctors(result);
  }, [filters, doctors]);

  
  const updateParams = (newFilters) => {
    const p = new URLSearchParams();
    if (newFilters.search) p.set('search', newFilters.search);
    if (newFilters.consultation) p.set('consultation', newFilters.consultation);
    if (newFilters.sort) p.set('sort', newFilters.sort);
    newFilters.specialties.forEach(s => p.append('specialties', s));
    setSearchParams(p);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        doctors={doctors}
        searchTerm={filters.search}
        onSearch={(search) =>
          updateParams({ ...filters, search })
        }
      />

      <div className="flex flex-col md:flex-row">
        <Filters
          filters={filters}
          setFilters={(f) => updateParams(f)}
          allSpecialties={allSpecialties}
        />
        <div className="flex-1">
          <DoctorList doctors={filteredDoctors} />
        </div>
      </div>
    </div>
  );
};


const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/book/:id" element={<BookingPage />} />
  </Routes>
);
export default App;
