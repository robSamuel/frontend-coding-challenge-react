import { render, screen } from '@testing-library/react';
import Text from './index';

describe('Text', () => {
  it('renders as paragraph by default', () => {
    render(<Text>Hola</Text>);
    const p = screen.getByText('Hola');
    expect(p.tagName.toLowerCase()).toBe('p');
  });

  it('renders headings according to variant', () => {
    const { rerender } = render(<Text variant="h1">T1</Text>);
    expect(screen.getByText('T1').tagName.toLowerCase()).toBe('h1');
    rerender(<Text variant="h2">T2</Text>);
    expect(screen.getByText('T2').tagName.toLowerCase()).toBe('h2');
    rerender(<Text variant="h3">T3</Text>);
    expect(screen.getByText('T3').tagName.toLowerCase()).toBe('h3');
  });

  it('applies classes by variant', () => {
    const { rerender } = render(<Text variant="caption">C</Text>);
    expect(screen.getByText('C').className).toMatch(/text-sm/);
    rerender(<Text variant="body">B</Text>);
    expect(screen.getByText('B').className).toMatch(/text-base/);
  });
});


