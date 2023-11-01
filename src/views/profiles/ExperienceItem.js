import React from 'react';

const ExperienceItem = ({ from, to, company, description }) => {
  return (
    <div className="mb-4">
      <div className="text-gray-600">
        <p>
          <span className="font-bold">Od:</span> {from}
        </p>
        <p>
          <span className="font-bold">Do:</span> {to}
        </p>
        <p>
          <span className="font-bold">Firma:</span> {company}
        </p>
        <p>
          <span className="font-bold">Opis:</span> {description}
        </p>
      </div>
    </div>
  );
};

export default ExperienceItem;