import React, { useCallback } from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { InputInitializer } from 'react-use-form-state';

import DateInput from 'src/components/DateInput';
import Input, { InputProps } from 'src/components/Input';
import { FieldsErrors } from 'src/hooks/use-form-errors';
import replaceFields from 'src/utils/replaceFields';

import useCommentsAreaForm, { CreateCommentsAreaFormState } from './useCommentsAreaForm';

import defaultCommentsAreaImage from '../CommentsArea/default-comments-area.png';

const imageRatio = 1.61803398875;

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  description: {
    width: '100%',
    padding: spacing(2),
  },
  left: {
    height: '100%',
  },
  right: {
    flex: 1,
    paddingLeft: spacing(4),
  },
  image: {
    height: spacing(36),
    width: spacing(36 * imageRatio),
    objectFit: 'cover',
    [breakpoints.down('md')]: {
      width: spacing(26 * imageRatio),
      height: spacing(26),
    },
  },
  authorInput: {
    marginRight: spacing(4),
  },
}));

type CommentsAreaFormProps = {
  className?: string;
  initialValues?: Partial<CreateCommentsAreaFormState>;
  fieldsErrors?: FieldsErrors<CreateCommentsAreaFormState>;
  requiredFields?: Array<keyof CreateCommentsAreaFormState>;
  onSubmit: (form: CreateCommentsAreaFormState) => void;
};

const CommentsAreaForm: React.FC<CommentsAreaFormProps> = ({
  className,
  initialValues,
  fieldsErrors,
  requiredFields,
  children,
  onSubmit,
}) => {
  const [form, { text }] = useCommentsAreaForm(
    replaceFields(initialValues as CreateCommentsAreaFormState, value => (value === null ? '' : value)),
    fieldsErrors,
  );
  const classes = useStyles();

  const placeholders: Record<keyof CreateCommentsAreaFormState, string> = {
    informationUrl: "URL de l'information",
    informationTitle: "Titre de l'information",
    informationAuthor: "Auteur de l'information",
    informationPublicationDate: 'Date de publication',
    imageUrl: "URL de l'image",
  };

  const requiredPlaceholderSuffix = (field: keyof CreateCommentsAreaFormState) => {
    return requiredFields?.includes(field) ? ' *' : '';
  };

  const fieldProps = (
    name: keyof CreateCommentsAreaFormState,
    initializer: InputInitializer<CreateCommentsAreaFormState, InputProps>,
  ): InputProps => ({
    autoComplete: 'off',
    required: requiredFields?.includes(name),
    placeholder: placeholders[name] + requiredPlaceholderSuffix(name),
    error: form.errors[name],
    ...initializer({ name, onChange: () => form.setFieldError(name, undefined) }),
  });

  const handleDateChange = useCallback(
    (date: Date) => {
      form.setField('informationPublicationDate', date.toISOString());
    },
    [form],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(replaceFields(form.values, value => (value === '' ? null : value)));
  };

  return (
    <Grid component="form" container className={clsx(classes.description, className)} onSubmit={handleSubmit}>
      <Grid item className={classes.left}>
        <img src={form.values.imageUrl || defaultCommentsAreaImage} className={classes.image} />
      </Grid>

      <Grid item container direction="column" className={classes.right}>
        <Input placeholder="Titre de l'information" {...fieldProps('informationTitle', text)} />
        <Input required placeholder="URL de l'information *" {...fieldProps('informationUrl', text)} />
        <Input placeholder="URL de l'image" {...fieldProps('imageUrl', text)} />

        <Grid item container>
          <Grid item className={classes.authorInput}>
            <Input placeholder="Auteur" {...fieldProps('informationAuthor', text)} />
          </Grid>
          <Grid item>
            <DateInput
              placeholder="Date de publication"
              onDateChange={handleDateChange}
              {...fieldProps('informationPublicationDate', text)}
            />
          </Grid>
        </Grid>

        <Grid item container justify="flex-end">
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommentsAreaForm;
