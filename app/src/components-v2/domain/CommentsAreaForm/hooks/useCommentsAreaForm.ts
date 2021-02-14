import { useFormState } from 'react-use-form-state';

export type CommentsAreaFormState = {
  url: string;
  title: string;
  author: string;
  publicationDate: string;
  identifier?: string;
};

const defaultValues: CommentsAreaFormState = {
  url: '',
  title: '',
  author: '',
  publicationDate: '',
};

const useCommentsAreaForm = (
  initialValues: CommentsAreaFormState | undefined,
  clearFieldError: (name: keyof CommentsAreaFormState) => void,
) => {
  return useFormState<CommentsAreaFormState>(
    {
      ...defaultValues,
      ...initialValues,
    },
    {
      onChange: ({ target: { name } }) => clearFieldError(name as keyof CommentsAreaFormState),
    },
  );
};

export default useCommentsAreaForm;
