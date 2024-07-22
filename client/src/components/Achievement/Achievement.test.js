import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import Achievements from './Achievement';
import AchievementItem from './AchievementItem';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Achievement Component', () => {
    it('Renders correctly ', () => {
        render(
            <MemoryRouter>
                <Achievements />
            </MemoryRouter>
        )

        expect(screen.getAllByText('Achievements')[0]).toBeInTheDocument();

    })


    global.fetch = jest.fn()
        .mockImplementationOnce((url) => {

            if (url.endsWith('/api/dashboard/get-achievements')) {
                return Promise.resolve({
                    json: () => Promise.resolve({}),
                });
            }
            else {
                // Debug output for unmatched URLs
                return Promise.reject(new Error('Unknown URL'));
            }
        })
        .mockImplementationOnce((url) => {
            const mockResponse = {
                achievements: ['Achievement 1', 'Achievement 2'],
                statistics: { stat1: 100, stat2: 200 },
            };
            if (url.endsWith('/api/dashboard/get-achievements')) {
                return Promise.resolve({
                    json: () => Promise.resolve(mockResponse),
                });
            }
            else {
                // Debug output for unmatched URLs
                return Promise.reject(new Error('Unknown URL'));
            }
        })


    it('Back button goes back to Dashboard', () => {
        navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        const userId = 123; // Mocked user ID
        const mockResponse = {
            achievements: ['Achievement 1', 'Achievement 2'],
            statistics: { stat1: 100, stat2: 200 },
        };

        render(
            <MemoryRouter initialEntries={[{ pathname: '/achievements', state: { userId: 123 } }]}>
                <Achievements />
            </MemoryRouter>
        )

        const backButton = screen.getByTestId('navigate-back-button');
        expect(backButton).toBeInTheDocument();
        fireEvent.click(backButton)
        expect(navigateMock).toHaveBeenCalledWith('/dashboard', { state: { userId: 123 } });
    })


    it('Renders achievements correctly', async () => {
        navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        render(
            <MemoryRouter initialEntries={[{ pathname: '/achievements', state: { userId: 123 } }]}>
                <Achievements />
            </MemoryRouter>
        )

        const backButton = screen.getByTestId('navigate-back-button');
        expect(backButton).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText('First Entry 🎉')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('5-Day Streak 🌟')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('10-Day Streak 🌟🌟')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('25-Day Streak 🌟🌟🌟')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('50-Day Streak 🌟🌟🌟🌟')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('100-Day Streak 🌟🌟🌟🌟🌟')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('500 Words 📝')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('1000 Words 📝📝')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('2000 Words 📝📝📝')).toBeInTheDocument());
    })
}) 