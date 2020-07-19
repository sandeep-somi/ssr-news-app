import {
  SEARCH_INITIATED,
  SEARCH_WAS_SUCCESSFUL,
  SEARCH_WAS_UNSUCCESSFUL,
  HIDE_NEWS_ITEM,
  UPVOTE,
  setData
} from './actions';

const initialState = {
  isLoading: false,
  hits: [],
  hitsPerPage: 30,
  page: 0,
  nbPages: null,
  bookmarks: [],
  hidden: []
}

export default function (state = { ...initialState }, action) {
  switch (action.type) {
    case SEARCH_INITIATED:
      return { ...state, isLoading: true }
    case SEARCH_WAS_SUCCESSFUL:
      const { hits, hitsPerPage, page, nbPages } = action.data;
      setData(hits);
      return { ...state, isLoading: false, hits, hitsPerPage, page, nbPages }
    case SEARCH_WAS_UNSUCCESSFUL:
      return { ...state, isLoading: false }

    case HIDE_NEWS_ITEM:
      const { objectID } = action;
      const index = state.hits.findIndex(i => i.objectID === objectID);
      let updatedHits = [...state.hits];
      updatedHits[index] = {
        ...updatedHits[index],
        isHidden: true
      }
      return { ...state, hits: updatedHits }

    case UPVOTE: {
      const hits = [...state.hits];
      const index = state.hits.findIndex(i => i.objectID === action.objectID);
      hits[index] = {
        ...hits[index],
        votes: hits[index].votes && hits[index].votes + 1 || 1
      }
      return { ...state, hits }
    }

    default:
      return state
  }
}