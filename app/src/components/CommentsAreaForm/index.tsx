import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { InputInitializer } from 'react-use-form-state';

import Input, { InputProps } from 'src/components/Input';

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
  formState: ReturnType<typeof useCommentsAreaForm>;
  onSubmit: (form: CreateCommentsAreaFormState) => void;
};

const CommentsAreaForm: React.FC<CommentsAreaFormProps> = ({ className, formState, children, onSubmit }) => {
  const [form, { text }] = formState;
  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form.values);
  };

  const fieldProps = (
    name: keyof CreateCommentsAreaFormState,
    initializer: InputInitializer<CreateCommentsAreaFormState, InputProps>,
  ): InputProps => ({
    autoComplete: 'off',
    error: form.errors[name],
    ...initializer({ name, onChange: () => form.setFieldError(name, undefined) }),
  });

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
            <Input placeholder="Date de publication" {...fieldProps('informationPublicationDate', text)} />
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
