import { beforeEach, describe, it, expect, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useEarthquakeStore } from './earthquakes';
import axios from 'axios';
import { mockEarthquakFC } from '@/mocks/earthquake.mock';

vi.mock('axios');
describe('Earthquake store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('getEarthquakes', () => {
    describe('successful response from api', () => {
      it('should set the returned value from the api on the state', async () => {
        const earthquakeStore = useEarthquakeStore();
        vi.mocked(axios.get).mockResolvedValue({ data: mockEarthquakFC });
        expect(earthquakeStore.earthquakes).toEqual([]);
        await earthquakeStore.getEarthquakes();
        expect(earthquakeStore.earthquakes).toEqual(mockEarthquakFC);
      });
      it('should set loaded to true', async () => {
        const earthquakeStore = useEarthquakeStore();
        vi.mocked(axios.get).mockResolvedValue({ data: mockEarthquakFC });
        expect(earthquakeStore.loaded).toEqual(false);
        await earthquakeStore.getEarthquakes();
        expect(earthquakeStore.loaded).toEqual(true);
      });
    });

    describe('error response from api', () => {
      it('should console log an error if an error is returned from the api', async () => {
        const consoleSpy = vi.spyOn(console, 'log');
        const earthquakeStore = useEarthquakeStore();
        const error = new Error('this is an error');
        vi.mocked(axios.get).mockRejectedValue(error);
        await earthquakeStore.getEarthquakes();
        expect(consoleSpy).toHaveBeenCalledOnce();
        expect(consoleSpy).toHaveBeenLastCalledWith(
          'Error loading earthquake data',
          error
        );
      });
    });
  });
});
