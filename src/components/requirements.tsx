import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface Requirement {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'completed';
}

const GatherRequirements: React.FC = () => {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const response = await axios.get<{ requirements: Requirement[] }>('/api/requirements');
      setRequirements(response.data.requirements);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch requirements:', error);
      toast.error('Failed to fetch requirements.');
      setLoading(false);
    }
  };

  const handleRequirementCompletion = async (requirementId: string) => {
    try {
      await axios.put(`/api/requirements/${requirementId}/complete`);
      setRequirements(prevRequirements =>
        prevRequirements.map(requirement =>
          requirement.id === requirementId ? { ...requirement, status: 'completed' } : requirement
        )
      );
      toast.success('Requirement marked as completed.');
    } catch (error) {
      console.error(`Failed to complete requirement ${requirementId}:`, error);
      toast.error(`Failed to mark requirement as completed.`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Gather Requirements</h1>
          <ul role="list" aria-label="Requirements list" className="divide-y divide-gray-200">
            {requirements.map(requirement => (
              <li key={requirement.id} className="py-4 flex items-center justify-between">
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-900">{requirement.name}</p>
                  <p className="mt-1 text-sm text-gray-500">{requirement.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRequirementCompletion(requirement.id)}
                  disabled={requirement.status === 'completed'}
                  aria-label={`Mark requirement ${requirement.name} as completed`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    requirement.status === 'completed' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {requirement.status === 'pending' ? 'Mark as Completed' : 'Completed'}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default GatherRequirements;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface Requirement {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'completed';
}

const GatherRequirements: React.FC = () => {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const response = await axios.get<{ requirements: Requirement[] }>('/api/requirements');
      setRequirements(response.data.requirements);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch requirements:', error);
      toast.error('Failed to fetch requirements.');
      setLoading(false);
    }
  };

  const handleRequirementCompletion = async (requirementId: string) => {
    try {
      await axios.put(`/api/requirements/${requirementId}/complete`);
      setRequirements(prevRequirements =>
        prevRequirements.map(requirement =>
          requirement.id === requirementId ? { ...requirement, status: 'completed' } : requirement
        )
      );
      toast.success('Requirement marked as completed.');
    } catch (error) {
      console.error(`Failed to complete requirement ${requirementId}:`, error);
      toast.error(`Failed to mark requirement as completed.`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Gather Requirements</h1>
          <ul role="list" aria-label="Requirements list" className="divide-y divide-gray-200">
            {requirements.map(requirement => (
              <li key={requirement.id} className="py-4 flex items-center justify-between">
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-900">{requirement.name}</p>
                  <p className="mt-1 text-sm text-gray-500">{requirement.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRequirementCompletion(requirement.id)}
                  disabled={requirement.status === 'completed'}
                  aria-label={`Mark requirement ${requirement.name} as completed`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    requirement.status === 'completed' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {requirement.status === 'pending' ? 'Mark as Completed' : 'Completed'}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default GatherRequirements;