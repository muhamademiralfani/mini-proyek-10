/* eslint-disable @typescript-eslint/no-explicit-any */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import contactReducer, { postSubscription } from '../../../redux/async/contactSlice';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);
describe('contactSlice', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            contact: {
                status: 'idle',
                message: null,
                error: null,
            },
        });
    });
    afterEach(() => {
        mockAxios.reset();
    });
    it('should handle postSubscription successfully', async () => {
        const mockResponse = { message: 'Email subscribed successfully' };
        mockAxios.onPost('https://furniture-api-lumoshive-academy.vercel.app/api/subscribe').reply(200, mockResponse);
        await store.dispatch(postSubscription('example@example.com'));
        const actions = store.getActions();
        // Ensure correct actions are dispatched
        expect(actions[0].type).toBe(postSubscription.pending.type);
        expect(actions[1].type).toBe(postSubscription.fulfilled.type);
        expect(actions[1].payload).toEqual(mockResponse);
    });
    it('should handle postSubscription failure', async () => {
        const mockError = { error: 'This is not a valid email.' };
        mockAxios.onPost('https://furniture-api-lumoshive-academy.vercel.app/api/subscribe').reply(400, mockError);
        await store.dispatch(postSubscription('invalid-email'));
        const actions = store.getActions();
        // Ensure correct actions are dispatched
        expect(actions[0].type).toBe(postSubscription.pending.type);
        expect(actions[1].type).toBe(postSubscription.rejected.type);
        expect(actions[1].payload).toBe(mockError.error);
    });
    it('should return the initial state', () => {
        expect(contactReducer(undefined, { type: '' })).toEqual({
            status: 'idle',
            message: null,
            error: null,
        });
    });
    it('should handle postSubscription.pending', () => {
        const state = contactReducer(undefined, postSubscription.pending('', 'example@example.com'));
        expect(state).toEqual({
            status: 'loading',
            message: null,
            error: null,
        });
    });
    it('should handle postSubscription.fulfilled', () => {
        const state = contactReducer(undefined, postSubscription.fulfilled({ message: 'Email subscribed successfully' }, '', 'example@example.com'));
        expect(state).toEqual({
            status: 'succeeded',
            message: 'Email subscribed successfully',
            error: null,
        });
    });
    it('should handle postSubscription.rejected', () => {
        const mockError = new Error('This is not a valid email.');
        const state = contactReducer(undefined, postSubscription.rejected(mockError, '', 'invalid-email'));
        expect(state).toEqual({
            status: 'failed',
            message: null,
            error: mockError.message,
        });
    });
});
