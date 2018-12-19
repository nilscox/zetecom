import React from 'react';

import { classList } from 'Utils';

const FormInput = ({ groupClassName, error, before, after, ...props }) => (
  <div className={classList('input-group', 'my-2', groupClassName)}>

    { before }

    <input
      className={classList('form-control', props.className, error && ' is-invalid')}
      {...props}
    />

    { after }

    <div className="invalid-feedback">
      { /* ERROR MESSAGE */ }
    </div>

  </div>
);

export default FormInput;
