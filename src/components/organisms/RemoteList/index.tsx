import type { FC } from 'react';
import { useList } from '../../../hooks/useList';
import ListItem from '../../molecules/ListItem';
import Loading from '../../atoms/Loading';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';

const RemoteList: FC = () => {
  const { items, loading, error, retry } = useList();

  const renderElements = () => {
    if (items.length === 0) {
      return (
        <div className="text-center py-8">
          <Text variant="body" className="text-gray-500">
            No elements found
          </Text>
        </div>
      )
    }

    return items.map((item) => (
      <ListItem key={item.id} item={item} />
    ))

  }

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center py-12">
          <Loading size="large" text="Loading elements..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center py-12">
          <Text variant="h3" className="text-red-600 mb-4">
            Error fetching elements
          </Text>
          <Text variant="body" className="text-gray-600 mb-6">
            {error}
          </Text>
          <Button variant="primary" onClick={retry}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <Text variant="h2" className="mb-2">
          Elements List
        </Text>
        <Text variant="body" className="text-gray-600">
          {items.length} fetched elements
        </Text>
      </div>

      <div className="space-y-4">
        {renderElements()}
      </div>
    </div>
  );
};

export default RemoteList;
