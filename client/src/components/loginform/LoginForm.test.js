import React from 'react';
import { render, fireEvent, screen, history, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { MemoryRouter, BrowserRouter, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('LoginForm component', () => {

    it('Renders login form correctly', () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login')[0]).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    });


    it('Updates username/password on input change', () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        expect(usernameInput.value).toBe('testuser');
        expect(passwordInput.value).toBe('testpassword');
    });

    // Add more test cases for form submission, navigate to register, etc.
    it('Click here should render Register form', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByText("Click here")).toBeInTheDocument();
        userEvent.click(screen.getByText("Click here"))

        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Create account')).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeInTheDocument();
    })
});


describe('Logs in user', () => {
    let navigateMock;

    beforeEach(() => {
        global.alert = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });


    it('Login user', async () => {
        navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve({ status: "Success", userId: 123 }), // Mock JSON response
            })
        );

        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path='/login' element={<LoginForm />}></Route>
                </Routes>
            </MemoryRouter>
        );

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: 'Login' }))

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();

            expect(global.fetch).toHaveBeenCalledWith(
                expect.any(String), 
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: JSON.stringify({ username: 'testuser', password: 'password123' }),
                })
            );
        })

        expect(global.alert).not.toHaveBeenCalledWith("Account does not exist! Incorrect username or password!");
        expect(navigateMock).toHaveBeenCalledWith('/dashboard', { state: { userId: 123 } });
    })


    it('Cannot login user for incorrect username/password', async () => {

        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({ status: "Failure" }), // Mock JSON response
            })
        );

        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path='/login' element={<LoginForm />}></Route>
                </Routes>
            </MemoryRouter>
        );

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(usernameInput, { target: { value: 'wrongtestuser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword123' } });

        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', { name: 'Login' }))

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();

            expect(global.fetch).toHaveBeenCalledWith(
                expect.any(String), // URL
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: JSON.stringify({ username: 'testuser', password: 'password123' }),
                })
            );
        })
        expect(global.alert).toHaveBeenCalledWith("Account does not exist! Incorrect username or password!");
    })
})

