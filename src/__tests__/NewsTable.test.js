import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import jest from 'jest';
import NewsTable from '../containers/Main/NewsTable';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const store = mockStore({
    main: {
        isLoading: false,
        hits: [],
        hitsPerPage: 30,
        page: 0,
        nbPages: null,
        bookmarks: [],
        hidden: []
    }
})

describe('renders learn react link', () => {
  const wrapper = mount(<Provider store={store}><NewsTable /></Provider>);
  it('should render table', () => {
    console.log(wrapper.debug());
    expect(wrapper.find("#news-table").hostNodes().length).toBe(1);
  });
});
