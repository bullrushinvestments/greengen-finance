import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import CoreFunctionalityComponent from './CoreFunctionalityComponent';

jest.mock('./SomeExternalDependency', () => ({
  useExternalData: jest.fn(),
}));

describe('Core Functionality Component', () => {
  const mockUseExternalData = (data?: any) => {
    return jest.fn().mockReturnValue({
      data,
      loading: false,
      error: null,
    });
  };

  beforeEach(() => {
    (useExternalData as jest.Mock).mockClear();
  });

  it('renders without crashing', () => {
    render(<CoreFunctionalityComponent />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays data when fetched successfully', async () => {
    const mockData = { id: '123', name: 'Product' };
    (useExternalData as jest.Mock).mockImplementation(mockUseExternalData(mockData));
    render(<CoreFunctionalityComponent />);
    await waitFor(() => expect(screen.getByText(/product/i)).toBeInTheDocument());
  });

  it('displays error message when fetching data fails', async () => {
    const mockError = new Error('Failed to fetch');
    (useExternalData as jest.Mock).mockImplementation(mockUseExternalData(null, mockError));
    render(<CoreFunctionalityComponent />);
    await waitFor(() => expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument());
  });

  it('handles loading state properly', async () => {
    (useExternalData as jest.Mock).mockImplementation(mockUseExternalData());
    render(<CoreFunctionalityComponent />);
    await waitFor(() => expect(screen.getByText(/loading/i)).toBeInTheDocument());
  });

  it('allows user to interact with buttons and triggers actions', async () => {
    const mockData = { id: '123', name: 'Product' };
    (useExternalData as jest.Mock).mockImplementation(mockUseExternalData(mockData));
    render(<CoreFunctionalityComponent />);
    fireEvent.click(screen.getByText(/add to cart/i));
    await waitFor(() => expect(screen.getByText(/added to cart/i)).toBeInTheDocument());
  });

  it('ensures accessibility features are implemented', () => {
    (useExternalData as jest.Mock).mockImplementation(mockUseExternalData());
    render(<CoreFunctionalityComponent />);
    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeVisible();
    expect(button).toHaveAttribute('aria-label');
  });

  it('handles edge cases such as empty data or null values', async () => {
    (useExternalData as jest.Mock).mockImplementation(mockUseExternalData({}));
    render(<CoreFunctionalityComponent />);
    await waitFor(() => expect(screen.getByText(/no products available/i)).toBeInTheDocument());
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import CoreFunctionalityComponent from './CoreFunctionalityComponent';

jest.mock('./SomeExternalDependency', () => ({
  useExternalData: jest.fn(),
}));

describe('Core Functionality Component', () => {
  const mockUseExternalData = (data?: any) => {
    return jest.fn().mockReturnValue({
      data,
      loading: false,
      error: null,
    });
  };

  beforeEach(() => {
    (useExternalData as jest.Mock).mockClear();
  });

  it('renders without crashing', () => {
    render(<CoreFunctionalityComponent />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays data when fetched successfully', async () => {
    const mockData = { id: '123', name: 'Product' };
    (useExternalData as jest.Mock).mockImplementation(mockUseExternalData(mockData));
    render(<CoreFunctionalityComponent />);
    await waitFor(() => expect(screen.getByText(/product/i)).toBeInTheDocument());
  });

  it('displays error message when fetching data fails', async () => {
    const mockError = new Error('Failed to fetch');
    (useExternalData as jest.Mock).mockImplementation(mockUseExternalData(null, mockError));
    render(<CoreFunctionalityComponent />);
    await waitFor(() => expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument());
  });

  it('handles loading state properly', async () => {
    (useExternalData as jest.Mock).mockImplementation(mockUseExternalData());
    render(<CoreFunctionalityComponent />);
    await waitFor(() => expect(screen.getByText(/loading/i)).toBeInTheDocument());
  });

  it('allows user to interact with buttons and triggers actions', async () => {
    const mockData = { id: '123', name: 'Product' };
    (useExternalData as jest.Mock).mockImplementation(mockUseExternalData(mockData));
    render(<CoreFunctionalityComponent />);
    fireEvent.click(screen.getByText(/add to cart/i));
    await waitFor(() => expect(screen.getByText(/added to cart/i)).toBeInTheDocument());
  });

  it('ensures accessibility features are implemented', () => {
    (useExternalData as jest.Mock).mockImplementation(mockUseExternalData());
    render(<CoreFunctionalityComponent />);
    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeVisible();
    expect(button).toHaveAttribute('aria-label');
  });

  it('handles edge cases such as empty data or null values', async () => {
    (useExternalData as jest.Mock).mockImplementation(mockUseExternalData({}));
    render(<CoreFunctionalityComponent />);
    await waitFor(() => expect(screen.getByText(/no products available/i)).toBeInTheDocument());
  });
});