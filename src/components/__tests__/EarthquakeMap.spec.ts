import { describe, it, expect } from 'vitest';

import { shallowMount } from '@vue/test-utils';
import EarthquakeMap from '../EarthquakeMap.vue';

describe('EarthquakeMap', () => {
  it('the map container exists', () => {
    const wrapper = shallowMount({ EarthquakeMap });
    const mapContainer = wrapper.find<HTMLDivElement>({
      ref: 'mapContainer',
    });
    expect(mapContainer).toBeTruthy();
  });
});
