import React from 'react';

import { classList, getErrorMessage } from 'Utils';

const FormInput = ({ groupClassName, error, before, after, ...props }) => (
  <div className={classList('input-group', 'my-2', groupClassName)}>

    { before }

    <input
      className={classList('form-control', props.className, error && ' is-invalid')}
      {...props}
    />

    { after }

    <div className="invalid-feedback">
      { error && Object.keys(error).map(constraint => (
        <div key={constraint}>{ getErrorMessage(constraint) }</div>
      )) }
    </div>

  </div>
);

export default FormInput;
