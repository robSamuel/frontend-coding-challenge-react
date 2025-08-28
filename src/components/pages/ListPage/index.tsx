import type { FC } from 'react';
import MainTemplate from '../../templates/MainTemplate';
import RemoteList from '../../organisms/RemoteList';

const ListPage: FC = () => {
  return (
    <MainTemplate
      title="Elements List"
      showBackButton
    >
      <RemoteList />
    </MainTemplate>
  );
};

export default ListPage;
