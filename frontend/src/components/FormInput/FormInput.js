import * as React from 'react';
import PropTypes from 'prop-types';

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

FormInput.propTypes = {
  groupClassName: PropTypes.string,
  error: PropTypes.string,
  before: PropTypes.element,
  after: PropTypes.element,
  props: Object,
};

export default FormInput;
