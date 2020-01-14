import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AddButton from '../index';

describe('AddButton', () => {

  it('should render without crashing', () => {
    render(<AddButton show onClick={() => {}} />);
  });

  it('should not show the button', () => {
    const { getByTestId } = render(<AddButton show={false} onClick={() => {}} />);

    expect(getByTestId('add-icon')).not.toBeVisible();
  });

  it('should call onClick', () => {
    const onClick = jest.fn();

    const { getByTestId } = render(<AddButton show onClick={onClick} />);

    fireEvent.click(getByTestId('add-icon'));

    expect(onClick).toHaveBeenCalled();
  });

});
