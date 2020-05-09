function setArticlesAction(articles) {

  return {
    type: 'SET_ARTICLES',
    payload: articles,
  };
}

function clearArtilesAction() {
  return {
    type: 'CLEAR_ARTICLES',
  };
}

function articlesReducer(state = null, action) {
  switch (action.type) {
    case 'SET_ARTICLES':
      return action.payload;
    case 'CLEAR_ARTICLES':
      return null;
    default:
      return state;
  }
}

export {
  setArticlesAction,
  clearArtilesAction,
  articlesReducer,
};

