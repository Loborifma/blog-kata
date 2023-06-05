import React from 'react';
import { Pagination as PaginationAntd } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { articleSlice } from '../../store/reducers/articleSlice';

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setPage } = articleSlice.actions;
  const { currentPage, articleData } = useAppSelector(
    (state) => state.articleReducer
  );

  return (
    <PaginationAntd
      total={articleData.articlesCount}
      pageSize={5}
      current={currentPage}
      showSizeChanger={false}
      showQuickJumper={false}
      onChange={(page) => dispatch(setPage(page))}
    />
  );
};

export default Pagination;
