import React from 'react';

import { getErrorMessage } from 'Services/errors-service';
import { classList } from 'utils';

/**

FormInput props:
- groupClassName: string | Array<string>
- error: ?string
- before: ?ReactNode
- after: ?ReactNode
- ...props: props

FormInput state:
(none)

*/

const FormInput = ({ groupClassName, error, before, after, ...props }) => (
  <div className={classList('input-group', 'my-2', groupClassName)}>

    { before }

    <input
      className={classList('form-control', props.className, error && ' is-invalid')}
      {...props}
    />

    { after }

    <div className="invalid-feedback">
      { getErrorMessage(error) }
    </div>

  </div>
);

export default FormInput;
