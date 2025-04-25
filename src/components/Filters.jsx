import React from 'react';

const Filters = ({ filters, setFilters, allSpecialties }) => {
  const onChange = (type, value) => {
    if (type === 'specialties') {
      const updated = filters.specialties.includes(value)
        ? filters.specialties.filter(s => s !== value)
        : [...filters.specialties, value];
      setFilters({ ...filters, specialties: updated });
    } else {
      setFilters({ ...filters, [type]: value });
    }
  };

  return (
    <div className="p-6 w-full md:w-1/4 bg-white border-r border-gray-200 space-y-8">
      {/* Consultation */}
      <div>
        <h2
          className="text-lg font-semibold mb-2"
          data-testid="filter-header-moc"
        >
          Mode of Consultation
        </h2>
        {[
          { label: 'Video Consult', value: 'video', testId: 'filter-video-consult' },
          { label: 'In-Clinic Consult', value: 'clinic', testId: 'filter-in-clinic' },
          { label: 'All', value: '', testId: 'filter-consultation-all' }
        ].map(opt => (
          <label key={opt.value} className="block text-sm mb-1">
            <input
              type="radio"
              name="consultation"
              checked={filters.consultation === opt.value}
              onChange={() => onChange('consultation', opt.value)}
              className="mr-2"
              data-testid={opt.testId}
            />
            {opt.label}
          </label>
        ))}
      </div>

      {/* Specialties */}
      <div>
        <h2
          className="text-lg font-semibold mb-2"
          data-testid="filter-header-speciality"
        >
          Specialties
        </h2>
        <div className="h-48 overflow-auto border rounded p-2">
          {allSpecialties.map(spec => (
            <label key={spec} className="block text-sm mb-1">
              <input
                type="checkbox"
                checked={filters.specialties.includes(spec)}
                onChange={() => onChange('specialties', spec)}
                className="mr-2"
                data-testid={`filter-specialty-${spec.replace(/\s+/g, '-')}`}
              />
              {spec}
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h2
          className="text-lg font-semibold mb-2"
          data-testid="filter-header-sort"
        >
          Sort By
        </h2>
        <select
          className="w-full p-2 border rounded"
          value={filters.sort}
          onChange={(e) => onChange('sort', e.target.value)}
          data-testid="sort-select"
        >
          <option value="">None</option>
          <option value="fees" data-testid="sort-fees">Price: Low–High</option>
          <option value="experience" data-testid="sort-experience">Experience: High–Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
