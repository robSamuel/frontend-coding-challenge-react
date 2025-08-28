import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './index';

describe('Modal', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Content</p>
      </Modal>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('shows title and content when isOpen is true', () => {
    render(
      <Modal isOpen onClose={() => {}} title="Title">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('closes when clicking the backdrop', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );
    const backdrop = screen.getByRole('button', { name: /close modal/i });
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes with Enter or Space key', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose}>
        <p>Content</p>
      </Modal>,
    );
    const backdrop = screen.getByRole('button', { name: /close modal/i });
    // Asegurar foco en el backdrop (tiene tabIndex=0, por lo que es focuseable)
    (backdrop as HTMLElement).focus();
    expect(backdrop).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClose).toHaveBeenCalledTimes(1);

    // Vuelve a abrir y prueba Space
    onClose.mockClear();
    (backdrop as HTMLElement).focus();
    await user.keyboard(' ');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});


