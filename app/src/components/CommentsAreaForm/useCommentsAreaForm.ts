import { useEffect } from 'react';

import { StateErrors, useFormState } from 'react-use-form-state';

import { FieldsErrors } from 'src/hooks/use-form-errors';

export type CreateCommentsAreaFormState = {
  informationUrl: string;
  informationTitle: string;
  informationAuthor: string;
  informationPublicationDate: string;
  integrationIdentifier?: string;
  imageUrl: string;
};

type FS = CreateCommentsAreaFormState;

const useCommentsAreaForm = (initialValues: Partial<FS>, fieldErrors: FieldsErrors<FS>) => {
  const formState = useFormState<FS, StateErrors<FS, React.ReactNode>>({
    integrationIdentifier: initialValues.integrationIdentifier || '',
    informationUrl: initialValues.informationUrl || '',
    informationTitle: initialValues.informationTitle || '',
    informationAuthor: initialValues.informationAuthor || '',
    informationPublicationDate: initialValues.informationPublicationDate || '',
    imageUrl: initialValues.imageUrl || '',
  });

  const [form] = formState;

  useEffect(() => {
    for (const [key, value] of Object.entries(fieldErrors)) {
      form.setFieldError(key as keyof FS, value);
    }
  }, [fieldErrors, form]);

  useEffect(() => {
    if (form.values.imageUrl !== '') {
      return;
    }

    const match = /youtube\.com\/watch\?v=(.*)/.exec(form.values.informationUrl);

    if (match) {
      form.setField('imageUrl', 'https://i.ytimg.com/vi/' + match[1] + '/hqdefault.jpg');
    }
  }, [form, form.values.informationUrl]);

  const placeholders: Record<keyof CreateCommentsAreaFormState, string> = {
    integrationIdentifier: '',
    informationUrl: "URL de l'information",
    informationTitle: "Titre de l'information",
    informationAuthor: "Auteur de l'information",
    informationPublicationDate: 'Date de publication',
    imageUrl: "URL de l'image",
  };

  return [...formState, placeholders] as const;
};

export default useCommentsAreaForm;
