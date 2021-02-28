import React, { ComponentProps, forwardRef, useImperativeHandle } from 'react';

import styled from '@emotion/styled';

import MediaImage from 'src/components/domain/MediaImage/MediaImage';
import Button from 'src/components/elements/Button/Button';
import DateInput from 'src/components/elements/DateInput/DateInput';
import { color, spacing } from 'src/theme';

import CommentsAreaFormInput from './CommentsAreaFormInput/CommentsAreaFormInput';
import useCommentsAreaForm, { CommentsAreaFormState } from './hooks/useCommentsAreaForm';
import useMediaType from './hooks/useMediaType';

export type { CommentsAreaFormState } from './hooks/useCommentsAreaForm';

const Container = styled.div`
  margin-bottom: ${spacing(2)};
  border-bottom: 1px solid ${color('border')};
  padding-bottom: ${spacing(2)};
  display: flex;
  flex-direction: row;
`;

const Image = styled(MediaImage)`
  margin-right: ${spacing(2)};
`;

const Form = styled.form`
  flex: 1;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  & > * {
    margin-right: ${spacing(4)};
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  & > * {
    margin: ${spacing(0, 2)};
  }
`;

export type CommentAreaFormProps = {
  initialValues?: CommentsAreaFormState;
  fieldErrors: Partial<Record<keyof CommentsAreaFormState, React.ReactNode>>;
  isSubmitting: boolean;
  clearFieldError: (field: keyof CommentsAreaFormState) => void;
  onCancel: () => void;
  onSubmit: (values: CommentsAreaFormState) => void;
};

export type CommentsAreaFormRef = {
  reset: () => void;
};

const CommentsAreaForm = forwardRef<CommentsAreaFormRef, CommentAreaFormProps>((props, ref) => {
  const { initialValues, fieldErrors, isSubmitting, clearFieldError, onCancel, onSubmit } = props;

  const [formState, { text }] = useCommentsAreaForm(initialValues, clearFieldError);
  const media = useMediaType(formState.values.url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState.values);
  };

  const handleDateChange = (value: string) => {
    clearFieldError('publicationDate');
    formState.setField('publicationDate', value);
  };

  useImperativeHandle(ref, () => ({
    reset: () => formState.reset(),
  }));

  const hasErrors = Object.values(fieldErrors).filter(Boolean).length > 0;

  return (
    <Container>
      <Image media={media} />

      <Form onSubmit={handleSubmit}>
        <CommentsAreaFormInput placeholder="Titre de l'information" error={fieldErrors.title} {...text('title')} />

        <CommentsAreaFormInput required placeholder="URL de l'information" error={fieldErrors.url} {...text('url')} />

        <Row>
          <CommentsAreaFormInput<ComponentProps<typeof DateInput>>
            as={DateInput}
            placeholder="Date de publication"
            error={fieldErrors.publicationDate}
            onDateChange={handleDateChange}
            {...text('publicationDate')}
          />

          <CommentsAreaFormInput placeholder="Auteur" error={fieldErrors.author} {...text('author')} />
        </Row>

        <Buttons>
          <Button type="button" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" disabled={hasErrors} loading={isSubmitting}>
            Demander l'ouverture
          </Button>
        </Buttons>
      </Form>
    </Container>
  );
});

CommentsAreaForm.displayName = 'CommentsAreaForm';

export default CommentsAreaForm;
