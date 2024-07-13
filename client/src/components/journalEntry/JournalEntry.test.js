import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import JournalEntry from './JournalEntry';
import Dashboard from '../dashboard/Dashboard';
import userEvent from '@testing-library/user-event';
import AchievementPopup from '../shared/AchievementPopup';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Journal Entry component', () => {
    it('Renders journal entry correctly', () => {
        render(
            <MemoryRouter>
                <JournalEntry />
            </MemoryRouter>
        )

        expect(screen.getByText("Dashboard")).toBeInTheDocument()
        expect(screen.getByText('NEW JOURNAL ENTRY')).toBeInTheDocument();
        expect(screen.getByText('Title:')).toBeInTheDocument();
        expect(screen.getByText('Emotion:')).toBeInTheDocument();
        expect(screen.getByText('Choose emotions')).toBeInTheDocument();
        expect(screen.getByText('Add tag')).toBeInTheDocument();
        expect(screen.getByText('Create')).toBeInTheDocument();
    })

    it('Allows user to input title, content, and emotion', () => {
        render(
            <MemoryRouter>
                <JournalEntry />
            </MemoryRouter>
        );
        const titleInput = screen.getByPlaceholderText('Enter title');
        fireEvent.change(titleInput, { target: { value: 'test title' } });
        expect(titleInput.value).toBe('test title');

        const contentInput = screen.getByPlaceholderText("What's on your mind today?");
        fireEvent.change(contentInput, { target: { value: 'test content' } });
        expect(contentInput.value).toBe('test content');

        const emotionButton = screen.getByText('Choose emotions');
        userEvent.click(emotionButton);
        const emotionOption = screen.getByText('Happy');
        userEvent.click(emotionOption);
        const emotion = screen.getByText('Joyful')
        userEvent.click(emotion)
        expect(screen.getByText('Joyful')).toBeInTheDocument();
    });


    it('Renders Journal Template', () => {
        render(
            <MemoryRouter>
                <JournalEntry />
            </MemoryRouter>
        )

        const goalForm = screen.getByText('Goals');
        userEvent.click(goalForm);
        expect(screen.getByPlaceholderText("What do you want to achieve?")).toBeInTheDocument();

        const Gratitude = screen.getByText('Grateful for...');
        userEvent.click(Gratitude);
        expect(screen.getByPlaceholderText("Grateful for?")).toBeInTheDocument();
    })


    it('Allows user to add and delete tags', async () => {
        render(
            <MemoryRouter>
                <JournalEntry />
            </MemoryRouter>
        );

        const tagInput = screen.getByPlaceholderText('New tag');
        const addButton = screen.getByText('Add tag');

        fireEvent.change(tagInput, { target: { value: 'Test Tag' } });
        fireEvent.click(addButton);

        expect(screen.getByText('Test Tag')).toBeInTheDocument();

        const deleteButton = screen.getByText('X');
        fireEvent.click(deleteButton);

        expect(screen.queryByText('Test Tag')).not.toBeInTheDocument();
    });


    it('Navigates to Login Page if user not registered', () => {
        navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        render(
            <MemoryRouter initialEntries={[{ pathname: '/journal-entry', state: {} }]}>
                <JournalEntry />
            </MemoryRouter>
        )
        expect(navigateMock).toHaveBeenCalledWith('/login');
    });


    it('Should not redirect to login if userId is present', () => {
        navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        render(
            <MemoryRouter initialEntries={[{ pathname: '/journal-entry', state: { userId: 123 } }]}>
                <JournalEntry />
            </MemoryRouter>
        )
        expect(navigateMock).not.toHaveBeenCalledWith('/login');
    });
})


describe('Journal Entry to Dashboard', () => {
    let navigateMock;

    beforeEach(() => {
        global.alert = jest.fn();
    });

    it('Dashboard button returns to Home Page', async () => {
        navigateMock = jest.fn()
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        render(
            <MemoryRouter initialEntries={[{ pathname: '/journal-entry', state: { userId: 123 } }]}>
                <JournalEntry />
            </MemoryRouter>
        )

        expect(screen.getByText("Dashboard")).toBeInTheDocument();

        userEvent.click(screen.getByText("Dashboard"))

        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith('/dashboard', { state: { userId: 123 } });
            const [pathname, options] = navigateMock.mock.calls[0];
            window.history.pushState([], 'Dashboard', pathname)
        });

        expect(navigateMock).toHaveBeenCalledWith('/dashboard', { state: { userId: 123 } });
    })


    global.fetch = jest.fn()
        .mockImplementationOnce((url) => {
            if (url.endsWith('/api/entry/update-journal')) {
                return Promise.resolve({
                    json: () => Promise.resolve({}), // Mock response for updating journal
                });
            }
            else {
                // Debug output for unmatched URLs
                console.log('Different URL:', url);
                return Promise.reject(new Error('Unknown URL'));
            }
        })
        .mockImplementationOnce(() => {
            return Promise.resolve({
                json: () => Promise.resolve({
                    new_achievements: [] // Mock response for submitting new journal
                }),
            });
        })
        .mockImplementationOnce(() => {
            return Promise.resolve({
                json: () => Promise.resolve({
                    new_achievements: [0] // Mock response for submitting new journal
                }),
            });
        });


    it('Updating journal returns to Dashboard', async () => {
        navigateMock = jest.fn()
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        const mockEntry = {
            userId: 123,
            entry: {
                title: 'Existing Title',
                content: 'Existing Content',
                emotion: 'Sad',
                journalTags: 'tag1, tag2',
                entryID: 1
            }
        };

        render(
            <MemoryRouter initialEntries={[{ pathname: '/journal-entry', state: { userId: 123, entry: { entryID: 1 } } }]}>
                <JournalEntry />
            </MemoryRouter>
        )

        const titleInput = screen.getByPlaceholderText('Enter title');
        fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
        expect(titleInput.value).toBe('Updated Title');

        const contentInput = screen.getByPlaceholderText("What's on your mind today?");
        fireEvent.change(contentInput, { target: { value: 'Updated Content' } });
        expect(contentInput.value).toBe('Updated Content');

        const emotionButton = screen.getByText('Choose emotions');
        userEvent.click(emotionButton);
        const emotionOption = screen.getByText('Happy');
        userEvent.click(emotionOption);
        const emotion = screen.getByText('Joyful')
        userEvent.click(emotion)
        expect(screen.getByText('Joyful')).toBeInTheDocument();

        expect(screen.getByText('Create')).toBeInTheDocument();

        userEvent.click(screen.getByText('Create'))

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(`undefined/api/entry/update-journal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: 123,
                    title: 'Updated Title',
                    content: 'Updated Content',
                    emotion: 'Joyful',
                    journalTags: '',
                    entry_id: 1
                })
            });
        })
        await waitFor(() =>
            expect(window.alert).toHaveBeenCalledWith('Journal entry updated successfully!')
        );
        expect(navigateMock).toHaveBeenCalledWith('/dashboard', { state: { userId: 123 } });

    })


    it('Submitting new journal entry will not cause achievement to pop up', async () => {
        const userId = 123;
        navigateMock = jest.fn()
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        render(
            <MemoryRouter initialEntries={[{ pathname: '/journal-entry', state: { userId: 123, entry: { entryID: null } } }]}>
                <JournalEntry />
            </MemoryRouter>
        );

        const titleInput = screen.getByPlaceholderText('Enter title');
        fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
        expect(titleInput.value).toBe('Updated Title');

        const contentInput = screen.getByPlaceholderText("What's on your mind today?");
        fireEvent.change(contentInput, { target: { value: 'Updated Content' } });
        expect(contentInput.value).toBe('Updated Content');

        const emotionButton = screen.getByText('Choose emotions');
        userEvent.click(emotionButton);
        const emotionOption = screen.getByText('Happy');
        userEvent.click(emotionOption);
        const emotion = screen.getByText('Joyful')
        userEvent.click(emotion)
        expect(screen.getByText('Joyful')).toBeInTheDocument();

        expect(screen.getByText('Create')).toBeInTheDocument();

        userEvent.click(screen.getByText('Create'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch).toHaveBeenCalledWith(`undefined/api/entry/submit-new-journal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: 123,
                    title: 'Updated Title',
                    content: 'Updated Content',
                    emotion: 'Joyful',
                    journalTags: '',
                    entry_id: null
                })
            });
        });

        expect(global.alert).toHaveBeenCalledWith('Journal entry added successfully!');
        expect(navigateMock).toHaveBeenCalledWith('/dashboard', { state: { userId: userId } });
    });


    it('Submitting new journal entry will cause achievement to pop up', async () => {
        const userId = 123;
        navigateMock = jest.fn()
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        render(
            <MemoryRouter initialEntries={[{ pathname: '/journal-entry', state: { userId: 123, entry: { entryID: null } } }]}>
                <JournalEntry />
            </MemoryRouter>
        );

        const titleInput = screen.getByPlaceholderText('Enter title');
        fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
        expect(titleInput.value).toBe('Updated Title');

        const contentInput = screen.getByPlaceholderText("What's on your mind today?");
        fireEvent.change(contentInput, { target: { value: 'Updated Content' } });
        expect(contentInput.value).toBe('Updated Content');

        const emotionButton = screen.getByText('Choose emotions');
        userEvent.click(emotionButton);
        const emotionOption = screen.getByText('Happy');
        userEvent.click(emotionOption);
        const emotion = screen.getByText('Joyful')
        userEvent.click(emotion)
        expect(screen.getByText('Joyful')).toBeInTheDocument();

        expect(screen.getByText('Create')).toBeInTheDocument();

        userEvent.click(screen.getByText('Create'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(3);
            expect(global.fetch).toHaveBeenCalledWith(`undefined/api/entry/submit-new-journal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: 123,
                    title: 'Updated Title',
                    content: 'Updated Content',
                    emotion: 'Joyful',
                    journalTags: '',
                    entry_id: null
                })
            });
        });

        expect(screen.getByText('Achievement Unlocked')).toBeInTheDocument();
        expect(screen.getByText('See your achievements')).toBeInTheDocument();
        userEvent.click(screen.getByText('See your achievements'));
        expect(navigateMock).toHaveBeenCalledWith('/achievements', { state: { userId: userId } });
    });
})