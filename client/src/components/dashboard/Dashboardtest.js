import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Dashboard from './Dashboard';


describe('Dashboard component', () => {
    it('Correctly renders Dashboard', () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/dashboard', state: { userId: 123 } }]}>
                <Dashboard/>
            </MemoryRouter>
        )
    })
})
