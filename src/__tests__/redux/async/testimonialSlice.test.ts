/* eslint-disable @typescript-eslint/no-explicit-any */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchTestimonials } from '../../../redux/async/testimonialSlice';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('testimonialSlice - fetchTestimonials', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      testimonials: {
        page: 1,
        testimonials: [],
        totalPages: 1,
        status: 'idle',
        error: null,
      },
    });
  });

  it('dispatches the correct actions when fetching testimonials is successful', async () => {
    const mockResponse = {
      page: 1,
      limit: 1,
      totalItems: 10,
      totalPages: 10,
      testimonials: [
        {
          id: 2,
          name: 'Jane Smith',
          message: 'Affordable prices and quality products.',
          title: 'Marketing Manager',
          image: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
      ],
    };

    // Mock endpoint with URL and query parameters
    mockAxios
      .onGet(/https:\/\/furniture-api-lumoshive-academy.vercel.app\/api\/testimonials.*/)
      .reply(200, mockResponse);

    const expectedActions = [
      { type: 'testimonials/fetchTestimonials/pending', meta: expect.anything() },
      {
        type: 'testimonials/fetchTestimonials/fulfilled',
        payload: mockResponse,
        meta: expect.anything(),
      },
    ];

    await store.dispatch(fetchTestimonials({ page: 1 }) as any);

    const actions = store.getActions();
    expect(actions).toEqual(expect.arrayContaining(expectedActions));
  });

  it('dispatches the correct actions when fetching testimonials fails', async () => {
    mockAxios
      .onGet(/https:\/\/furniture-api-lumoshive-academy.vercel.app\/api\/testimonials.*/)
      .reply(500, { message: 'Request failed with status code 500' });

    const expectedActions = [
      { type: 'testimonials/fetchTestimonials/pending', meta: expect.anything() },
      {
        type: 'testimonials/fetchTestimonials/rejected',
        meta: expect.anything(),
        error: expect.anything(),
      },
    ];

    await store.dispatch(fetchTestimonials({ page: 1 }) as any);

    const actions = store.getActions();
    expect(actions).toEqual(expect.arrayContaining(expectedActions));
  });
});
