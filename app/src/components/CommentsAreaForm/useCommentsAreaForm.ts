import { useEffect } from 'react';

import { StateErrors, useFormState } from 'react-use-form-state';

import { FieldsErrors } from 'src/hooks/use-form-errors';

export type CreateCommentsAreaFormState = {
  identifier?: string;
  informationUrl: string;
  informationTitle: string;
  informationAuthor: string;
  informationPublicationDate: string;
  imageUrl: string;
};

type FS = CreateCommentsAreaFormState;

const useCommentsAreaForm = (initialValues: Partial<FS>, fieldErrors: FieldsErrors<FS>) => {
  const formState = useFormState<FS, StateErrors<FS, React.ReactNode>>({
    identifier: '',
    informationUrl: '',
    informationTitle: '',
    informationAuthor: '',
    informationPublicationDate: '',
    imageUrl: '',
    ...initialValues,
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

  return formState;
};

export default useCommentsAreaForm;
