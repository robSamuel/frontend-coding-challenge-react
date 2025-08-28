import type { FC, ReactNode} from 'react';

interface TextProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  className?: string;
}

const Text: FC<TextProps> = ({
  children,
  variant = 'body',
  className = '',
}) => {
  const variantClasses = {
    h1: 'text-4xl font-bold text-gray-900',
    h2: 'text-3xl font-semibold text-gray-900',
    h3: 'text-2xl font-medium text-gray-900',
    body: 'text-base text-gray-700',
    caption: 'text-sm text-gray-500'
  };

  const Component = variant.startsWith('h') ? variant as 'h1' | 'h2' | 'h3' : 'p';

  return (
    <Component className={`${variantClasses[variant]} ${className}`}>
      {children}
    </Component>
  );
};

export default Text;
