import createGoogleMapsMock from 'jest-google-maps-mock';
import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import MapPage, {queryWiki}from './Page';
import mockedAxios from 'axios';

import * as redux from "react-redux";

jest.mock('react-router-dom', () => {
    return {
        Link: function({ children }) {
            return <div className='link'>{children}</div>
        }
    }
})

afterEach(cleanup);

describe('createGoogleMapsMock', () => {
  let googleMaps;

  beforeEach(() => {
    googleMaps = createGoogleMapsMock();
  });

  it('should create a map mock', () => {
    const mapDiv = document.createElement('div');
    new googleMaps.Map(mapDiv);

    expect(googleMaps.Map).toHaveBeenCalledTimes(1);
    expect(googleMaps.Map.mock.instances.length).toBe(1);
    expect(googleMaps.Map).toHaveBeenLastCalledWith(mapDiv);
  });

  test('mocking axios request to query wikipedia to get desired location properties', async () => {  
    const data = {data: {query: {geosearch: [
      {dist: 1618.3, lat: -20.2744, lon: 148.715, ns: 0, pageid: 1589715, primary: "", title: "Airlie Beach, Queensland"},
      {dist: 1633.5, lat: -20.2863, lon: 148.6866, ns: 0, pageid: 40948065, primary: "", title: "Cannonvale, Queensland"},
      {dist: 2590.3, lat: -20.28, lon: 148.7261, ns: 0, pageid: 62189317, primary: "", title: "Whitsunday, Queensland"}
    ]}}}
    mockedAxios.get.mockResolvedValueOnce(data);

    const expected = [
      {lat: -20.2744, lon: 148.715, pageid: 1589715, title: "Airlie Beach, Queensland"}, 
      {lat: -20.2863, lon: 148.6866, pageid: 40948065, title: "Cannonvale, Queensland"},
      {lat: -20.28, lon: 148.7261, pageid: 62189317, title: "Whitsunday, Queensland"}
    ]

    const wikiData = await queryWiki({lat: -20.2812314, lng: 148.70130029999999})

    expect(wikiData).toStrictEqual(expected)
  });

});

// const useDispatchSpy = jest.spyOn(redux, "useDispatch")
// const mockUseDispatch = jest.fn()
// useDispatchSpy.mockImplementation(mockUseDispatch)
// const useSelectorSpy = jest.spyOn(redux, "useSelector")
// const mockUseSelector = jest.fn().mockReturnValue([])
// useSelectorSpy.mockImplementation(mockUseSelector)
