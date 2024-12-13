/* eslint-disable @typescript-eslint/no-explicit-any */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchProducts } from '../../../redux/async/productSlice';
const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('productSlice - fetchProducts', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            products: {
                page: 1,
                limit: 8,
                totalItems: 0,
                totalPages: 0,
                products: [],
                status: 'idle',
                error: null,
            },
        });
    });
    it('dispatches the correct actions when fetching products is successful', async () => {
        const mockResponse = {
            page: 1,
            limit: 8,
            totalItems: 20,
            totalPages: 3,
            products: [
                {
                    id: 1,
                    title: 'Ceiling Light',
                    image: 'https://example.com/ceiling-light.jpg',
                    price: 75,
                    price_after_discount: 70,
                },
            ],
        };
        mockAxios
            .onGet('https://furniture-api-lumoshive-academy.vercel.app/api/products', {
            params: { page: 1, limit: 8 },
        })
            .reply(200, mockResponse);
        const expectedActions = [
            { type: 'products/fetchProducts/pending', meta: expect.anything() },
            {
                type: 'products/fetchProducts/fulfilled',
                payload: mockResponse,
                meta: expect.anything(),
            },
        ];
        await store.dispatch(fetchProducts({ page: 1, limit: 8 }));
        const actions = store.getActions();
        expect(actions).toEqual(expect.arrayContaining(expectedActions));
    });
    it('dispatches the correct actions when fetching products fails', async () => {
        mockAxios
            .onGet('https://furniture-api-lumoshive-academy.vercel.app/api/products', {
            params: { page: 1, limit: 8 },
        })
            .reply(500, { message: 'Request failed with status code 500' });
        const expectedActions = [
            { type: 'products/fetchProducts/pending', meta: expect.anything() },
            {
                type: 'products/fetchProducts/rejected',
                payload: { message: 'Request failed with status code 500' },
                meta: expect.anything(),
                error: expect.anything(),
            },
        ];
        await store.dispatch(fetchProducts({ page: 1, limit: 8 }));
        const actions = store.getActions();
        expect(actions).toEqual(expect.arrayContaining(expectedActions));
    });
});
