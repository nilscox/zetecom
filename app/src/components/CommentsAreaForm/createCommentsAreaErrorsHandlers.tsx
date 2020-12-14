import { AxiosError } from 'axios';

import { CreateCommentsAreaFormState } from 'src/components/CommentsAreaForm/useCommentsAreaForm';
import { FormErrorsHandlers } from 'src/hooks/use-form-errors';

const createCommentsAreaErrorsHandlers: FormErrorsHandlers<AxiosError, CreateCommentsAreaFormState> = [
  {
    informationUrl: ({ response: { status, data } }) => {
      if (status === 400 && data.informationUrl?.minLength) {
        return "L'URL de l'information n'est pas assez longue";
      }

      if (status === 400 && data.informationUrl?.maxLength) {
        return "L'URL de l'information est trop longue";
      }

      if (status === 400 && data.informationUrl?.isUrl) {
        return "L'URL de l'information n'est pas valide";
      }
    },
    informationTitle: ({ response: { status, data } }) => {
      if (status === 400 && data.informationTitle?.minLength) {
        return "Le titre de l'information n'est pas assez long";
      }

      if (status === 400 && data.informationTitle?.maxLength) {
        return "Le titre de l'information est trop long";
      }
    },
    informationAuthor: ({ response: { status, data } }) => {
      if (status === 400 && data.informationAuthor?.isNotEmpty) {
        return "Veillez renseigner l'auteur de l'information";
      }

      if (status === 400 && data.informationAuthor?.maxLength) {
        return "Le nom de l'auteur est trop long";
      }
    },
    informationPublicationDate: ({ response: { status, data } }) => {
      if (status === 400 && data.informationPublicationDate?.isPast) {
        return 'La date de publication ne doit pas être dans le futur';
      }

      if (status === 400 && data.informationPublicationDate?.isDateString) {
        return 'Format invalide';
      }
    },
    imageUrl: ({ response: { status, data } }) => {
      if (status === 400 && data.imageUrl?.minLength) {
        return "L'URL de l'image n'est pas assez longue";
      }

      if (status === 400 && data.imageUrl?.maxLength) {
        return "L'URL de l'image est trop longue";
      }

      if (status === 400 && data.imageUrl?.isUrl) {
        return "L'URL de l'image n'est pas valide";
      }
    },
  },
  () => '',
];

export default createCommentsAreaErrorsHandlers;
