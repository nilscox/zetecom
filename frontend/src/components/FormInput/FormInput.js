import * as React from 'react';

import { classList } from 'utils';

const FormInput = ({ groupClassName, error, before, after, ...props }) => (
  <div className={classList('input-group', groupClassName)}>

    { before }

    <input
      className={classList('form-control', props.className, error && ' is-invalid')}
      {...props}
    />

    { after }

    <div className="invalid-feedback">
      { error }
    </div>

  </div>
);

export default FormInput;
