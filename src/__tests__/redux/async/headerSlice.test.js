import reducer, { fetchHeader } from '../../../redux/async/headerSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);
describe('headerSlice', () => {
    it('should handle initial state', () => {
        const initialState = reducer(undefined, { type: '' });
        expect(initialState).toEqual({
            title: '',
            description: '',
            banner: '',
            status: 'idle',
            error: null,
        });
    });
    it('should fetch header data successfully', async () => {
        const mockData = {
            title: 'Creative Home Simpify your Furniture',
            description: 'Do i have consent to record this meeting gain locaion, root-and-branch, review, nor game plan who’s the goto',
            banner: 'https://ik.imagekit.io/lumoshiveAcademy/Furniture/8f82d2c087c3c1808660cf2b4c6dc4a5.webp',
        };
        mock.onGet('https://furniture-api-lumoshive-academy.vercel.app/api/header').reply(200, mockData);
        const store = configureStore({ reducer: reducer });
        await store.dispatch(fetchHeader());
        const state = store.getState();
        expect(state.title).toEqual(mockData.title);
        expect(state.description).toEqual(mockData.description);
        expect(state.banner).toEqual(mockData.banner);
    });
});
