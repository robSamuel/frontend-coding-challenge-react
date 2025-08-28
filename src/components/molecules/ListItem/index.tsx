import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import type { RemoteItem } from '../../../types/remote';
import Text from '../../atoms/Text';
import { formatDate } from '../../../utils/date';
import { isValidUrl } from '../../../utils/url';

interface ListItemProps {
	item: RemoteItem;
}

const IMAGE_TIMEOUT_MS = 5000;

const ListItem: FC<ListItemProps> = ({ item }) => {
	const hasValidAvatar = useMemo(() => isValidUrl(item.avatar), [item.avatar]);
	const [showImage, setShowImage] = useState<boolean>(hasValidAvatar);
	const [loaded, setLoaded] = useState<boolean>(false);

	// Reset state when avatar changes
	useEffect(() => {
		setShowImage(hasValidAvatar);
		setLoaded(false);
	}, [hasValidAvatar]);

	// Timeout for images that never load
	useEffect(() => {
		if (!showImage) return;
		const timer = window.setTimeout(() => {
			if (!loaded) setShowImage(false);
		}, IMAGE_TIMEOUT_MS);
		return () => window.clearTimeout(timer);
	}, [showImage, loaded]);

	return (
		<div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
			<div className="flex-shrink-0 mr-4">
				{showImage && (
					<img
						src={item.avatar}
						alt={`Avatar de ${item.name}`}
						className="w-12 h-12 rounded-full object-cover"
						loading="lazy"
						onLoad={() => setLoaded(true)}
						onError={() => setShowImage(false)}
					/>
				)}
			</div>

			<div className="flex-1 min-w-0">
				<Text variant="body" className="font-medium truncate">
					{item.name}
				</Text>
				<Text variant="caption" className="text-gray-500">
					Created: {formatDate(new Date(item.createdAt))}
				</Text>
			</div>
		</div>
	);
};

export default ListItem;
