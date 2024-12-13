import dataReducer, { fetchData } from '../../../redux/async/dataSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios;
describe('dataSlice', () => {
    const initialState = {
        experience: '',
        country: '',
        sold: '',
        variant: '',
        status: 'idle',
    };
    it('should return the initial state', () => {
        const state = dataReducer(undefined, {});
        expect(state).toEqual(initialState);
    });
    it('should handle fetchData.pending', () => {
        const action = { type: fetchData.pending.type };
        const state = dataReducer(initialState, action);
        expect(state.status).toEqual('loading');
    });
    it('should handle fetchData.fulfilled', () => {
        const mockPayload = {
            experience: '7',
            country: '2',
            sold: '10k+',
            variant: '250+',
        };
        const action = { type: fetchData.fulfilled.type, payload: mockPayload };
        const state = dataReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.experience).toEqual('7');
        expect(state.country).toEqual('2');
        expect(state.sold).toEqual('10k+');
        expect(state.variant).toEqual('250+');
    });
    it('should handle fetchData.rejected', () => {
        const action = { type: fetchData.rejected.type };
        const state = dataReducer(initialState, action);
        expect(state.status).toEqual('failed');
    });
    it('should handle the async thunk fetchData successfully', async () => {
        const mockResponse = {
            data: {
                experience: '7',
                country: '2',
                sold: '10k+',
                variant: '250+',
            },
        };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);
        const store = configureStore({
            reducer: { data: dataReducer },
        });
        await store.dispatch(fetchData());
        const state = store.getState().data;
        expect(state.status).toEqual('succeeded');
        expect(state.experience).toEqual('7');
        expect(state.country).toEqual('2');
        expect(state.sold).toEqual('10k+');
        expect(state.variant).toEqual('250+');
    });
    it('should handle the async thunk fetchData failure', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
        const store = configureStore({
            reducer: { data: dataReducer },
        });
        await store.dispatch(fetchData());
        const state = store.getState().data;
        expect(state.status).toEqual('failed');
    });
});
