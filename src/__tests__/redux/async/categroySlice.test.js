/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryReducer, { fetchCategories, transformCategoryData } from '../../../redux/async/categorySlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios;
describe('categorySlice', () => {
    const initialState = {
        categories: [],
        status: 'idle',
        error: null,
    };
    it('should return the initial state', () => {
        const state = categoryReducer(undefined, { type: '' });
        expect(state).toEqual(initialState);
    });
    it('should handle fetchCategories.pending', () => {
        const action = { type: fetchCategories.pending.type };
        const state = categoryReducer(initialState, action);
        expect(state.status).toEqual('loading');
        expect(state.error).toBeNull();
    });
    it('should handle fetchCategories.fulfilled', () => {
        const mockCategories = [
            { title: 'Chair', image: 'https://example.com/chair.png' },
            { title: 'Table', image: 'https://example.com/table.png' },
        ];
        const action = { type: fetchCategories.fulfilled.type, payload: mockCategories };
        const state = categoryReducer(initialState, action);
        expect(state.status).toEqual('succeeded');
        expect(state.categories).toEqual(mockCategories);
    });
    it('should handle fetchCategories.rejected', () => {
        const action = { type: fetchCategories.rejected.type, payload: 'Failed to fetch categories' };
        const state = categoryReducer(initialState, action);
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Failed to fetch categories');
    });
    it('should handle the async thunk fetchCategories successfully', async () => {
        const mockResponse = {
            category: [
                { title: 'Chair', image: 'https://example.com/chair.png' },
                { title: 'Table', image: 'https://example.com/table.png' },
            ],
        };
        mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });
        const store = configureStore({
            reducer: { category: categoryReducer },
        });
        await store.dispatch(fetchCategories());
        const state = store.getState().category;
        expect(state.status).toEqual('succeeded');
        expect(state.categories).toEqual(mockResponse.category);
    });
    it('should handle the async thunk fetchCategories failure', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
        const store = configureStore({
            reducer: { category: categoryReducer },
        });
        await store.dispatch(fetchCategories());
        const state = store.getState().category;
        expect(state.status).toEqual('failed');
        expect(state.error).toEqual('Network Error');
    });
    it('should correctly transform category data', () => {
        const apiData = [
            { title: 'Chair', image: 'https://example.com/chair.png' },
            { title: 'Table', image: 'https://example.com/table.png' },
        ];
        const transformed = transformCategoryData(apiData);
        expect(transformed).toEqual(apiData);
    });
});
