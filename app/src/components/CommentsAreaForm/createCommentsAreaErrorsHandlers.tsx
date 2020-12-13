import { AxiosError } from 'axios';

import { CreateCommentsAreaFormState } from 'src/components/CommentsAreaForm/useCommentsAreaForm';
import { FormErrorsHandlers } from 'src/hooks/use-form-errors';

const createCommentsAreaErrorsHandlers: FormErrorsHandlers<AxiosError, CreateCommentsAreaFormState> = [
  {
    informationUrl: ({ response: { status, data } }) => {
      if (status === 400 && data.informationUrl?.isNotEmpty) {
        return "Veillez renseigner l'url de l'information";
      }
    },
    informationTitle: ({ response: { status, data } }) => {
      if (status === 400 && data.informationTitle?.isNotEmpty) {
        return "Veillez renseigner le titre de l'information";
      }
    },
    informationAuthor: ({ response: { status, data } }) => {
      if (status === 400 && data.informationAuthor?.isNotEmpty) {
        return "Veillez renseigner l'auteur de l'information";
      }
    },
    informationPublicationDate: ({ response: { status, data } }) => {
      if (status === 400 && data.informationPublicationDate?.isDateString) {
        return 'Format invalide';
      }
    },
  },
  () => '',
];

export default createCommentsAreaErrorsHandlers;
