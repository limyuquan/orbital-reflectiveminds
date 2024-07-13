import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { MemoryRouter, BrowserRouter, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from "history";

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { wait } from '@testing-library/user-event/dist/utils';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('RegisterForm component', () => {
    it('Renders Register Page correctly', () => {
        render(
            <MemoryRouter>
                <RegisterForm />
            </MemoryRouter>
        )
        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Create account')).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeInTheDocument();
    })


    it('Updates username, password, email on input change', () => {
        render(
            <MemoryRouter>
                <RegisterForm />
            </MemoryRouter>
        );

        const usernameInput = screen.getByPlaceholderText('Username');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(usernameInput.value).toBe('testuser');
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    })

    it('Back should navigate to login', async () => {
        const navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByText("Back")).toBeInTheDocument();

        userEvent.click(screen.getByText("Back"))

        expect(navigateMock).toHaveBeenCalledWith("/login");
    })

    //submit
    it('Registering with input paramets will not register user', () => {
        const history = createMemoryHistory();

        render(
            <BrowserRouter history={history}>
                <RegisterForm />
            </BrowserRouter>
        );

        expect(screen.getByText('Create account')).toBeInTheDocument();
        userEvent.click(screen.getByText('Create account'));
        expect(screen.getByText('Create account')).toBeInTheDocument();
    })
})



describe('Registering user', () => {

    let navigateMock;

    beforeEach(() => {
        global.alert = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Registering user brings user to Login page', async () => {
        navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve({ status: "Success" }), // Mock JSON response
            })
        );

        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path='/register' element={<RegisterForm />}></Route>
                </Routes>
            </MemoryRouter>
        )

        const usernameInput = screen.getByPlaceholderText('Username');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(screen.getByText('Create account')).toBeInTheDocument();

        userEvent.click(screen.getByText('Create account'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();

            expect(global.fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: JSON.stringify({
                        newUsername: 'testuser',
                        newPassword: 'password123',
                        newEmail: 'testuser@example.com',
                    }),
                })
            );
        })
        expect(navigateMock).toHaveBeenCalledWith('/login');
        expect(global.alert).not.toHaveBeenCalled();
    })

    it('Cannot register user for existing username/email', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve({ status: "Failure" }),
            })
        );

        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path='/register' element={<RegisterForm />}></Route>
                </Routes>
            </MemoryRouter>
        );

        const usernameInput = screen.getByPlaceholderText('Username');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "testuser@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(screen.getByText('Create account')).toBeInTheDocument();

        userEvent.click(screen.getByText('Create account'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();

            expect(global.fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: JSON.stringify({
                        newUsername: 'testuser',
                        newPassword: 'password123',
                        newEmail: 'testuser@example.com',
                    }),
                })
            );
        })
        expect(global.alert).toHaveBeenCalledWith("This account exists! Username or email is already in use!");
    })
})