import React, { forwardRef, useImperativeHandle, useState, SyntheticEvent } from 'react';

import { Reaction } from 'src/types/Reaction';
import { Loader } from 'src/components/Loader';

import { FormText } from './FormText';

type FormBodyProps = {
  preloadedReaction?: Reaction;
  replyTo?: Reaction;
  isSubmitting: boolean;
  onSubmit: (quote: string | null, text: string) => void;
};

// eslint-disable-next-line react/display-name
export const FormBody = forwardRef((props: FormBodyProps, ref: React.Ref<{}>) => {
  const { preloadedReaction: reaction, replyTo, isSubmitting, onSubmit } = props;

  const [text, setText] = useState(reaction ? reaction.text : null);
  const [quote, setQuote] = useState(reaction ? reaction.quote : null);

  const canSubmit = !!text && !isSubmitting;

  useImperativeHandle(ref, () => ({
    clear: () => {
      setText(null);
      setQuote(null);
    },
  }));

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!canSubmit)
      return;

    onSubmit(quote, text);
  };

  return (
    <form onSubmit={handleSubmit} className="reaction-form-body">

      <textarea
        className="form-quote"
        rows={1}
        value={quote || ''}
        placeholder="Citation (optionnelle)"
        disabled={!!reaction || isSubmitting}
        onChange={(e) => setQuote(e.target.value)}
      />

      <FormText
        replyTo={replyTo}
        text={text}
        setText={setText}
        disabled={isSubmitting}
      />

      <div className="form-footer">

        <div className="form-footer-filler"></div>

        <button
          className="form-submit"
          disabled={!canSubmit}
          type="submit"
        >
          { isSubmitting ? <Loader size="small" /> : 'Envoyer' }
        </button>
      </div>

    </form>
  );
});
