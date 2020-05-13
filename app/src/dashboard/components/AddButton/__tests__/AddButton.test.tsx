import React from 'react';

import AddButton from '../index';

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';

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
