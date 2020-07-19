import {
  searchAPI
} from './apis';

import db from '../../mydb';

export async function setData(hits, page) {
  hits.forEach(hit => {
    db.hits.put(hit);
  });
}

export async function getData({ page, hitsPerPage }) {
  let from = page ? page * hitsPerPage : page;
  let hits = await db.hits.offset(from).limit(hitsPerPage).toArray();
  return hits
}

export async function hideItemInDB(objectID) {
  let hit = await db.hits.get({ objectID });
  let updated = await db.hits.update(hit.id, { isHidden: true });
  if(updated) {
    console.log('db has been updated')
  } else {
    console.error('something went wrong!')
  }
}

export async function upvoteInDB(objectID) {
  let hit = await db.hits.get({ objectID });
  let updated = await db.hits.update(hit.id, { votes: hit.votes + 1 });
  if(updated) {
    console.log('db has been updated')
  } else {
    console.error('something went wrong!')
  }
}

export const SEARCH_INITIATED = 'SEARCH_INITIATED';
export const SEARCH_WAS_SUCCESSFUL = 'SEARCH_WAS_SUCCESSFUL';
export const SEARCH_WAS_UNSUCCESSFUL = 'SEARCH_WAS_UNSUCCESSFUL';
export const HIDE_NEWS_ITEM = 'HIDE_NEWS_ITEM';
export const UPVOTE = 'UPVOTE';

export function search(data) {
  return dispatch => {
    dispatch({
      type: SEARCH_INITIATED
    })
    return new Promise((resolve, reject) => {
      getData(data).then(res => {
        if (res && res.length) {
          dispatch({
            type: SEARCH_WAS_SUCCESSFUL,
            data: {
              page: data.page,
              hitsPerPage: data.hitsPerPage,
              hits: res
            }
          })
          return resolve({
            hits: res
          })
        } else {
          searchAPI(data).then(res => {
            dispatch({
              type: SEARCH_WAS_SUCCESSFUL,
              data: {
                ...res,
                hits: addVotesToHits(res.hits)
              }
            })
            return resolve(res)
          }).then(err => {
            dispatch({
              type: SEARCH_WAS_UNSUCCESSFUL
            })
            return reject(err)
          })
        }
      })
    })
  }
}

export function hideNews(objectID) {
  hideItemInDB(objectID)
  return dispatch => {
    dispatch({
      type: HIDE_NEWS_ITEM,
      objectID
    })
  }
}

function addVotesToHits(hits = []) {
  return hits && hits.length && hits.map(hit => {
    return {
      ...hit,
      votes: parseInt(Math.random() * (1000 - 1) + 1),
      isHidden: false
    }
  })
}

export function upvote(objectID) {
  upvoteInDB(objectID)
  return dispatch => {
    dispatch({
      type: UPVOTE,
      objectID
    })
  }
}