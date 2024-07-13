import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Index from './Index';
import LoginForm from '../loginform/LoginForm';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Index component', () => {
    let navigateMock;

    beforeEach(() => {
        navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders Index component correctly', async () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<LoginForm />} />
                </Routes>
            </MemoryRouter>
        );

        // Assert app title
        const appTitle = getByText('REFLECTIVE MINDS');
        expect(appTitle).toBeInTheDocument();

        // Assert index title
        const indexTitle = getByText('Your Personal Growth');
        expect(indexTitle).toBeInTheDocument();

        // Assert index secondary title
        const indexSecondary = getByText('A minimal online journaling app with daily prompts and powerful guides to help you grow into your best self.');
        expect(indexSecondary).toBeInTheDocument();

        // Find button by text and assert it exists
        const button = getByText('Start Your Journal Journey Today');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(navigateMock).toHaveBeenCalledWith('/login');
    });
});

