import React from 'react';

const ExperienceItem = ({ from, to, company, description }) => {
  return (
    <div className="mb-4">
      <div className="text-gray-600">
        {from ?
          <p>
            <span className="font-bold">Od:</span> {from}
          </p>
          : null
        }
        {to ?
          <p>
            <span className="font-bold">Do:</span> {to}
          </p>
          : null
        }
        {company ?
          <p>
            <span className="font-bold">Firma:</span> {company}
          </p>
          : null
        }
        {description ?
          <p>
            <span className="font-bold">Opis:</span> {description}
          </p>
          : null
        }
      </div>
    </div>
  );
};

export default ExperienceItem;