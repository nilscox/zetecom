import React from 'react';

import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { CommentsAreaFormState } from 'src/components/domain/CommentsAreaForm/CommentAreaForm';
import { useTrackEvent } from 'src/contexts/trackingContext';
import track from 'src/domain/track';
import { HandleError } from 'src/hooks/useFormErrors';
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
      isNotEmpty: ['author', "Veillez renseigner l'auteur de l'information"],
      maxLength: ['author', "Le nom de l'auteur est trop long"],
    },
    informationPublicationDate: {
      isPast: ['publicationDate', 'La date de publication ne doit pas être dans le futur'],
      isDateString: ['publicationDate', 'Format invalide'],
    },
  },
};

const stripEmptyValuesReducer = (obj: Record<string, unknown>, [k, v]: [string, unknown]) => {
  if (v !== '') {
    obj[k as keyof CommentsAreaFormState] = v;
  }

  return obj;
};

const requestOrCreateCommentsArea = async (type: 'request' | 'creation', values: CommentsAreaFormState) => {
  const body = Object.entries({
    informationUrl: values.url,
    informationTitle: values.title,
    informationAuthor: values.author,
    informationPublicationDate: values.publicationDate,
  }).reduce(stripEmptyValuesReducer, {} as Partial<CommentsAreaFormState>);

  const response = await axios.post<CommentsArea>(`/api/comments-area${type === 'request' ? '/request' : ''}`, body);

  return response.data;
};

const useCommentsAreaForm = (
  type: 'request' | 'creation',
  reset: () => void,
  onSuccess: (commentsArea: CommentsArea) => void,
  onError: HandleError,
) => {
  const trackEvent = useTrackEvent();

  const { mutate, isLoading: loading } = useMutation(
    (values: CommentsAreaFormState) => requestOrCreateCommentsArea(type, values),
    {
      onSuccess: commentsArea => {
        if (type === 'request') {
          toast.success(
            <>
              Votre demande d'ouverture a bien été prise en compte, elle est maintenant en attente de traitement par les
              modérateurs
            </>,
          );

          trackEvent(track.commentsAreaRequested('App'));
        } else if (type === 'creation') {
          trackEvent(track.createCommentsArea());
        }

        reset();
        onSuccess(commentsArea);
      },
      onError: (error: AxiosError) => {
        const [formError, fieldErrors, unhandledError] = getFormErrors(error, handlers);

        onError(formError, fieldErrors);

        if (unhandledError) {
          // eslint-disable-next-line no-console
          console.warn('unhandled comments area form error', unhandledError);

          toast.error(
            <>
              Tout ne s'est pas passé comme prévu...
              <br />
              Réessayez plus tard !
            </>,
          );
        }
      },
    },
  );

  return [mutate, { loading }] as const;
};

export default useCommentsAreaForm;
