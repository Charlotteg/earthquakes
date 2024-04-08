import { beforeEach, describe, it, expect, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useEarthquakeStore } from './earthquakes';
import axios from 'axios';
import { mockEarthquakeFC } from '@/mocks/earthquake.mock';
import { useSearchStore } from './search';

vi.mock('axios');
describe('Earthquake store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('loadEarthquakes', () => {
    describe('successful response from api', () => {
      it('should set the returned value from the api on the state', async () => {
        const earthquakeStore = useEarthquakeStore();
        vi.mocked(axios.get).mockResolvedValue({ data: mockEarthquakeFC });
        expect(earthquakeStore.earthquakes).toEqual(null);
        await earthquakeStore.loadEarthquakes();
        expect(earthquakeStore.earthquakes).toEqual(mockEarthquakeFC);
      });
      it('should set loaded to true', async () => {
        const earthquakeStore = useEarthquakeStore();
        vi.mocked(axios.get).mockResolvedValue({ data: mockEarthquakeFC });
        expect(earthquakeStore.loaded).toEqual(false);
        await earthquakeStore.loadEarthquakes();
        expect(earthquakeStore.loaded).toEqual(true);
      });
    });

    describe('error response from api', () => {
      it('should console log an error if an error is returned from the api', async () => {
        const consoleSpy = vi.spyOn(console, 'log');
        const earthquakeStore = useEarthquakeStore();
        const error = new Error('this is an error');
        vi.mocked(axios.get).mockRejectedValue(error);
        await earthquakeStore.loadEarthquakes();
        expect(consoleSpy).toHaveBeenCalledOnce();
        expect(consoleSpy).toHaveBeenLastCalledWith(
          'Error loading earthquake data',
          error
        );
      });
    });
  });

  describe('filterFeatures', () => {
    it('should return earthquakes that match the search term', () => {
      const mockSearchStore = useSearchStore(createPinia());
      const earthquakeStore = useEarthquakeStore();
      earthquakeStore.$state.earthquakes = mockEarthquakeFC;
      mockSearchStore.$state.searchTerm = 'Glad';
      const filteredEqs = earthquakeStore.filterFeatures();
      expect(filteredEqs?.length).toBe(1);
      expect(
        filteredEqs?.every(eq =>
          eq.properties?.place.includes(mockSearchStore.$state.searchTerm)
        )
      );
      mockSearchStore.$state.searchTerm = 'New';
      const newFilteredEqs = earthquakeStore.filterFeatures();
      expect(newFilteredEqs?.length).toBe(2);
      expect(
        newFilteredEqs?.every(eq =>
          eq.properties?.place.includes(mockSearchStore.$state.searchTerm)
        )
      );
      mockSearchStore.$state.searchTerm = 'xyz';
      const noFilteredEqs = earthquakeStore.filterFeatures();
      expect(noFilteredEqs?.length).toBe(0);
    });
  });
  it("should return unfiltered earthquake features if the search term is ''", () => {
    const mockSearchStore = useSearchStore(createPinia());
    const earthquakeStore = useEarthquakeStore();
    earthquakeStore.$state.earthquakes = mockEarthquakeFC;
    mockSearchStore.$state.searchTerm = '';
    const filteredEqs = earthquakeStore.filterFeatures();
    expect(filteredEqs).toEqual(mockEarthquakeFC.features);
  });
});
