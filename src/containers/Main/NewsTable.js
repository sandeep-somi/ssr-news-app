import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import * as actions from './actions';
import cn from 'classnames';

export default function () {
  const dispatch = useDispatch();
  const page = useSelector(state => state.main.page);
  const nbPages = useSelector(state => state.main.nbPages);
  const hitsPerPage = useSelector(state => state.main.hitsPerPage);
  const hits = useSelector(state => state.main.hits);

  function onHide(objectID) {
    dispatch(actions.hideNews(objectID));
  }

  function handlePageChange(nextPage) {
    if (nextPage < 0 || nextPage > nbPages) return null;
    dispatch(actions.search({ page: nextPage, hitsPerPage }))
  }

  function upvote(objectID) {
    dispatch(actions.upvote(objectID));
  }

  function rowRenderer(hit, index) {
    const { title, num_comments, author, created_at, objectID, url, votes = 0, isHidden = false } = hit
    if (isHidden) {
      return null
    }
    const origin = url && url.split('/')[2] || '';

    return (
      <tr key={objectID || index}>
        <td>{num_comments}</td>
        <td>{votes}</td>
        <td>
          <span onClick={() => upvote(objectID)}>
            <i className="fas fa-arrow-alt-circle-up"></i>
          </span>
        </td>
        <td>
          {title}
          {origin ? <span>
            <a href={url} target="_blank">({origin})</a>
          </span> : null}
          <span className="news-by">by</span>
          <span>{author}</span>
          <span className="posted">{moment(created_at).fromNow(true)}</span>
          <span className="hide-action" onClick={() => onHide(objectID)}>[ hide ]</span>
        </td>
      </tr>
    )
  }

  // if (isLoading) {
  //   return (
  //     <div className="vh-100 d-flex justify-content-center align-items-center">
  //       <div>
  //         <h6 className="text-secondary">Loading...</h6>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="news-table-wrapper">
      <table id="news-table">
        <thead>
          <tr>
            <th>Comments</th>
            <th>Vote Count</th>
            <th>UpVote</th>
            <th>NewsDetail</th>
          </tr>
        </thead>
        <tbody>
          {hits.map(rowRenderer)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              <span className="float-left">{page + 1}</span>
              <span className={cn({ 'disabled': page <= 0 })} onClick={() => handlePageChange(page - 1)}>Previous</span>
              {' | '}
              <span className={cn({ 'disabled': page >= nbPages })} onClick={() => handlePageChange(page + 1)}>Next</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}