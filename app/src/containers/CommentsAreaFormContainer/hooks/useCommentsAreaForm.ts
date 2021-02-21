import { useEffect } from 'react';

import { AxiosError } from 'axios';

import { CommentsAreaFormState } from 'src/components/domain/CommentsAreaForm/CommentAreaForm';
import useAxios from 'src/hooks/useAxios';
import useFormErrors from 'src/hooks/useFormErrors';
import { CommentsArea } from 'src/types/CommentsArea';
import getFormErrors, { FormErrorHandlers } from 'src/utils/getFormErrors';

const handlers: FormErrorHandlers = {
  400: {
    informationUrl: {
      minLength: ['url', "L'URL de l'information n'est pas assez longue"],
      maxLength: ['url', "L'URL de l'information est trop longue"],
      isUrl: ['url', "L'URL de l'information n'est pas valide"],
    },
    informationTitle: {
      minLength: ['title', "Le titre de l'information n'est pas assez long"],
      maxLength: ['title', "Le titre de l'information est trop long"],
    },
    informationAuthor: {
      isNotEmpty: ['informationAuthor', "Veillez renseigner l'auteur de l'information"],
      maxLength: ['author', "Le nom de l'auteur est trop long"],
    },
    informationPublicationDate: {
      isPast: ['publicationDate', 'La date de publication ne doit pas être dans le futur'],
      isDateString: ['publicationDate', 'Format invalide'],
    },
  },
};

const useCommentsAreaForm = (
  type: 'request' | 'creation',
  reset: () => void,
  onSuccess: (commentsArea: CommentsArea) => void,
  onError: (error: AxiosError) => void,
) => {
  const [commentsArea, { loading, error, status }, execute] = useAxios<CommentsArea>(
    { method: 'POST', url: `/api/comments-area${type === 'request' ? '/request' : ''}` },
    { manual: true },
  );

  useEffect(() => {
    if (status(201) && commentsArea) {
      onSuccess(commentsArea);
      reset();
    }
  }, [status, commentsArea, onSuccess, reset]);

  const [{ fieldErrors }, { handleError, clearFieldError }] = useFormErrors();

  useEffect(() => {
    if (!error) {
      return;
    }

    const [formError, fieldErrors, unhandledError] = getFormErrors(error, handlers);

    handleError(formError, fieldErrors);

    if (unhandledError) {
      onError(unhandledError);
    }
  }, [error, handleError, onError]);

  const handleSubmit = (values: CommentsAreaFormState) => {
    execute({
      data: {
        informationUrl: values.url,
        informationTitle: values.title,
        informationAuthor: values.author,
        informationPublicationDate: values.publicationDate,
        identifier: undefined,
      },
    });
  };

  return [{ loading, fieldErrors, clearFieldError }, handleSubmit] as const;
};

export default useCommentsAreaForm;
