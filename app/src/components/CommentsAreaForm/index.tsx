import React, { useCallback, useEffect } from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import clsx from 'clsx';
import { InputInitializer } from 'react-use-form-state';

import DateInput from 'src/components/DateInput';
import Input, { InputProps } from 'src/components/Input';
import { FieldsErrors } from 'src/hooks/use-form-errors';
import env from 'src/utils/env';
import replaceFields from 'src/utils/replaceFields';

import useCommentsAreaForm, { CreateCommentsAreaFormState } from './useCommentsAreaForm';

import defaultCommentsAreaImage from '../CommentsArea/default-comments-area.png';

const imageRatio = 1.61803398875;

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
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
  openUrlIcon: {
    color: palette.secondary.light,
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
  clear?: boolean;
  onSubmit: (form: CreateCommentsAreaFormState) => void;
};

const CommentsAreaForm: React.FC<CommentsAreaFormProps> = ({
  className,
  initialValues = {},
  fieldsErrors,
  requiredFields,
  clear,
  children,
  onSubmit,
}) => {
  const [form, { text }] = useCommentsAreaForm(
    replaceFields(initialValues, value => (value === null ? '' : value)),
    fieldsErrors,
  );

  const classes = useStyles();

  const placeholders: Record<keyof CreateCommentsAreaFormState, string> = {
    identifier: '',
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

  useEffect(() => {
    if (clear) {
      form.clear();
    }
  }, [clear, form]);

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

  const openUrlIconLink = (
    <a target="_blank" rel="noreferrer" href={form.values.informationUrl}>
      <LaunchIcon className={classes.openUrlIcon} />
    </a>
  );

  return (
    <Grid component="form" container className={clsx(classes.description, className)} onSubmit={handleSubmit}>
      <Grid item className={classes.left}>
        <img src={form.values.imageUrl || defaultCommentsAreaImage} className={classes.image} />
      </Grid>

      <Grid item container direction="column" className={classes.right}>
        <Input {...fieldProps('informationTitle', text)} />
        <Input {...fieldProps('informationUrl', text)} endAdornment={openUrlIconLink} />
        <Input {...fieldProps('imageUrl', text)} />

        {env.DEBUG === 'true' && <Input disabled {...fieldProps('identifier', text)} />}

        <Grid item container>
          <Grid item className={classes.authorInput}>
            <Input {...fieldProps('informationAuthor', text)} />
          </Grid>
          <Grid item>
            <DateInput onDateChange={handleDateChange} {...fieldProps('informationPublicationDate', text)} />
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
