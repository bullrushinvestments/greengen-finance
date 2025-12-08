import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_TEST } from './graphql/mutations'; // Assume this is a GraphQL mutation for creating tests
import { TestFormData } from './types'; // Define the shape of test form data

interface WriteTestsProps {
  onSubmit: (data: TestFormData) => void;
}

const WriteTests: React.FC<WriteTestsProps> = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TestFormData>();

  const [createTest] = useMutation(CREATE_TEST, {
    onCompleted: (data) => {
      onSubmit(data.createTest); // Pass the created test data to parent component
      reset(); // Reset form after submission
    },
    onError: (error) => setError(error.message),
    update: (cache, { data }) => {
      if (!data?.createTest) return;
      cache.writeQuery({
        query: GET_TESTS, // Assume this is a GraphQL query to fetch all tests
        data: { tests: [data.createTest] }
      });
    },
  });

  const onSubmitForm: SubmitHandler<TestFormData> = (data) => {
    setLoading(true);
    createTest({ variables: { input: data } });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitForm)}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Test Name"
          {...register('name', { required: 'This field is required' })}
          aria-label="test name input"
          className="mt-1 p-2 border rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full"
        />
        {errors.name && <p role="alert" className="text-red-500">{errors.name.message}</p>}
      </div>
      
      {/* Add more form fields as needed */}
      
      <button
        type="submit"
        disabled={loading}
        aria-label="submit test creation"
        className={`mt-4 py-2 px-4 rounded-md ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50'}`}
      >
        {loading ? 'Creating...' : 'Create Test'}
      </button>
      
      {error && (
        <p role="alert" className="mt-4 text-red-500">
          {error}
        </p>
      )}
    </form>
  );
};

export default WriteTests;

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_TEST } from './graphql/mutations'; // Assume this is a GraphQL mutation for creating tests
import { TestFormData } from './types'; // Define the shape of test form data

interface WriteTestsProps {
  onSubmit: (data: TestFormData) => void;
}

const WriteTests: React.FC<WriteTestsProps> = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TestFormData>();

  const [createTest] = useMutation(CREATE_TEST, {
    onCompleted: (data) => {
      onSubmit(data.createTest); // Pass the created test data to parent component
      reset(); // Reset form after submission
    },
    onError: (error) => setError(error.message),
    update: (cache, { data }) => {
      if (!data?.createTest) return;
      cache.writeQuery({
        query: GET_TESTS, // Assume this is a GraphQL query to fetch all tests
        data: { tests: [data.createTest] }
      });
    },
  });

  const onSubmitForm: SubmitHandler<TestFormData> = (data) => {
    setLoading(true);
    createTest({ variables: { input: data } });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitForm)}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Test Name"
          {...register('name', { required: 'This field is required' })}
          aria-label="test name input"
          className="mt-1 p-2 border rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full"
        />
        {errors.name && <p role="alert" className="text-red-500">{errors.name.message}</p>}
      </div>
      
      {/* Add more form fields as needed */}
      
      <button
        type="submit"
        disabled={loading}
        aria-label="submit test creation"
        className={`mt-4 py-2 px-4 rounded-md ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50'}`}
      >
        {loading ? 'Creating...' : 'Create Test'}
      </button>
      
      {error && (
        <p role="alert" className="mt-4 text-red-500">
          {error}
        </p>
      )}
    </form>
  );
};

export default WriteTests;