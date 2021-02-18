import React from 'react';

import styled from '@emotion/styled';

import MediaImage from 'src/components/domain/MediaImage/MediaImage';
import Button from 'src/components/elements/Button/Button';
import DateInput from 'src/components/elements/DateInput/DateInput';
import { spacing } from 'src/theme';

import CommentsAreaFormInput from './CommentsAreaFormInput/CommentsAreaFormInput';
import useCommentsAreaForm, { CommentsAreaFormState } from './hooks/useCommentsAreaForm';
import useMediaType from './hooks/useMediaType';

export type { CommentsAreaFormState } from './hooks/useCommentsAreaForm';

const Container = styled.div`
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
  clearFieldError: (field: keyof CommentsAreaFormState) => void;
  onCancel: () => void;
  onSubmit: (values: CommentsAreaFormState) => void;
};

const CommentsAreaForm: React.FC<CommentAreaFormProps> = ({
  initialValues,
  fieldErrors,
  clearFieldError,
  onCancel,
  onSubmit,
}) => {
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

  return (
    <Container>
      <Image media={media} />

      <Form onSubmit={handleSubmit}>
        <CommentsAreaFormInput placeholder="Titre de l'information" error={fieldErrors.title} {...text('title')} />

        <CommentsAreaFormInput placeholder="URL de l'information" error={fieldErrors.url} {...text('url')} />

        <Row>
          <CommentsAreaFormInput<typeof DateInput>
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
          <Button type="submit" disabled={Object.keys(fieldErrors).length > 0}>
            Demander l'ouverture
          </Button>
        </Buttons>
      </Form>
    </Container>
  );
};

export default CommentsAreaForm;
