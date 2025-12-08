import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { useMediaQuery } from '@material-ui/core';

interface BusinessSpec {
  id: number;
  name: string;
  description: string;
  requirements: Requirement[];
}

interface Requirement {
  id: number;
  title: string;
  details: string;
}

const CreateBusinessSpecification: React.FC = () => {
  const [businessSpec, setBusinessSpec] = useState<BusinessSpec | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<BusinessSpec>('https://api.example.com/business-spec')
      .then(response => setBusinessSpec(response.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const isMobile = useMediaQuery('(max-width:600px)');

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{`Error: ${error}`}</div>;

  const renderRequirements = () => {
    return businessSpec?.requirements.map(req => (
      <div key={req.id} className={clsx('p-4 mb-2', isMobile ? 'bg-gray-100' : 'bg-white')}>
        <h3 className="text-lg font-medium">{req.title}</h3>
        <p className="mt-2 text-sm">{req.details}</p>
      </div>
    ));
  };

  return (
    <div className={clsx('max-w-screen-md mx-auto p-4', isMobile ? 'bg-gray-100' : 'bg-white')}>
      <h1 className="text-3xl font-bold mb-6">{businessSpec?.name}</h1>
      <p className="mb-8 text-lg">{businessSpec?.description}</p>
      {renderRequirements()}
    </div>
  );
};

export default CreateBusinessSpecification;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { useMediaQuery } from '@material-ui/core';

interface BusinessSpec {
  id: number;
  name: string;
  description: string;
  requirements: Requirement[];
}

interface Requirement {
  id: number;
  title: string;
  details: string;
}

const CreateBusinessSpecification: React.FC = () => {
  const [businessSpec, setBusinessSpec] = useState<BusinessSpec | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<BusinessSpec>('https://api.example.com/business-spec')
      .then(response => setBusinessSpec(response.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const isMobile = useMediaQuery('(max-width:600px)');

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{`Error: ${error}`}</div>;

  const renderRequirements = () => {
    return businessSpec?.requirements.map(req => (
      <div key={req.id} className={clsx('p-4 mb-2', isMobile ? 'bg-gray-100' : 'bg-white')}>
        <h3 className="text-lg font-medium">{req.title}</h3>
        <p className="mt-2 text-sm">{req.details}</p>
      </div>
    ));
  };

  return (
    <div className={clsx('max-w-screen-md mx-auto p-4', isMobile ? 'bg-gray-100' : 'bg-white')}>
      <h1 className="text-3xl font-bold mb-6">{businessSpec?.name}</h1>
      <p className="mb-8 text-lg">{businessSpec?.description}</p>
      {renderRequirements()}
    </div>
  );
};

export default CreateBusinessSpecification;