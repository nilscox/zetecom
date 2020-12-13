import React, { useEffect } from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useFormState } from 'react-use-form-state';

import Input from 'src/components/Input';

import { ClearFieldError, FieldsErrors } from '../../hooks/use-form-errors';
import { CommentsAreaRequest } from '../../types/CommentsArea';

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

export type CreateCommentsAreaFormState = {
  informationUrl: string;
  informationTitle: string;
  informationAuthor: string;
  informationPublicationDate: string;
  imageUrl: string;
};

type CommentsAreaFormProps = {
  className?: string;
  initialValues?: CommentsAreaRequest;
  fieldErrors?: FieldsErrors<CreateCommentsAreaFormState>;
  clearFieldError?: ClearFieldError<CreateCommentsAreaFormState>;
  onSubmit: (form: CreateCommentsAreaFormState) => void;
};

const CommentsAreaForm: React.FC<CommentsAreaFormProps> = ({
  className,
  children,
  initialValues,
  fieldErrors,
  clearFieldError,
  onSubmit,
}) => {
  const [form, { text, date }] = useFormState<CreateCommentsAreaFormState>(
    {
      informationUrl: '',
      informationTitle: '',
      informationAuthor: '',
      informationPublicationDate: '',
      imageUrl: '',
      ...initialValues,
    },
    {
      onChange: ({ target: { name } }) => clearFieldError?.(name as keyof CreateCommentsAreaFormState),
    },
  );

  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form.values);
  };

  useEffect(() => {
    if (form.values.imageUrl !== '') {
      return;
    }

    const match = /youtube\.com\/watch\?v=(.*)/.exec(form.values.informationUrl);

    if (match) {
      form.setField('imageUrl', 'https://i.ytimg.com/vi/' + match[1] + '/hqdefault.jpg');
    }
  }, [form, form.values.informationUrl]);

  return (
    <Grid component="form" container className={clsx(classes.description, className)} onSubmit={handleSubmit}>
      <Grid item className={classes.left}>
        <img src={form.values.imageUrl || defaultCommentsAreaImage} className={classes.image} />
      </Grid>

      <Grid item container direction="column" className={classes.right}>
        <Input
          autoComplete="off"
          placeholder="Titre de l'information"
          error={fieldErrors?.informationTitle}
          {...text('informationTitle')}
        />
        <Input
          required
          autoComplete="off"
          placeholder="URL de l'information *"
          error={fieldErrors?.informationUrl}
          {...text('informationUrl')}
        />
        <Input autoComplete="off" placeholder="URL de l'image" error={fieldErrors?.imageUrl} {...text('imageUrl')} />
        <Grid item container>
          <Grid item className={classes.authorInput}>
            <Input
              autoComplete="off"
              placeholder="Auteur"
              error={fieldErrors?.informationAuthor}
              {...text('informationAuthor')}
            />
          </Grid>
          <Input
            autoComplete="off"
            placeholder="Date de publication"
            error={fieldErrors?.informationPublicationDate}
            {...text('informationPublicationDate')}
          />
        </Grid>

        <Grid item container justify="flex-end">
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommentsAreaForm;
