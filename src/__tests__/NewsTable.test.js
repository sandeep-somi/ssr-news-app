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
        hits: [
            {
                "created_at": "2018-03-14T03:50:30.000Z",
                "title": "Stephen Hawking has died",
                "url": "http://www.bbc.com/news/uk-43396008",
                "author": "Cogito",
                "points": 6015,
                "story_text": null,
                "comment_text": null,
                "num_comments": 436,
                "story_id": null,
                "story_title": null,
                "story_url": null,
                "parent_id": null,
                "created_at_i": 1520999430,
                "relevancy_score": 8012,
                "_tags": ["story", "author_Cogito", "story_16582136"],
                "objectID": "16582136",
                "_highlightResult": {
                    "title": {
                        "value": "Stephen Hawking has died",
                        "matchLevel": "none",
                        "matchedWords": []
                    },
                    "url": {
                        "value": "http://www.bbc.com/news/uk-43396008",
                        "matchLevel": "none",
                        "matchedWords": []
                    },
                    "author": {
                        "value": "Cogito",
                        "matchLevel": "none",
                        "matchedWords": []
                    }
                }
            }
        ],
        hitsPerPage: 30,
        page: 0,
        nbPages: null,
        bookmarks: [],
        hidden: []
    }
})

describe('Renders Newstable Component', () => {
  const wrapper = mount(<Provider store={store}><NewsTable /></Provider>);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render table', () => {
    expect(wrapper.find("#news-table").hostNodes().length).toBe(1);
  });

  it('should render row', () => {
      console.log(wrapper.debug());
    expect(wrapper.find(".news-row").hostNodes().length).toBe(1);
  })

});
