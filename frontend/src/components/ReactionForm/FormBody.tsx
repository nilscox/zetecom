import React, { forwardRef, useImperativeHandle, useState, SyntheticEvent } from 'react';

import { classList } from '../../utils/classList';
import { Reaction, ReactionLabel } from '../../types/Reaction';

import { FormText } from './FormText';
import { Loader } from '../Loader';

type FormBodyProps = {
  preloadedReaction?: Reaction;
  replyTo?: Reaction;
  isSubmitting: boolean;
  onSubmit: (label: ReactionLabel, quote: string | null, text: string) => void;
};

export const FormBody = forwardRef((props: FormBodyProps, ref: React.Ref<{}>) => {
  const { preloadedReaction: reaction, replyTo, isSubmitting, onSubmit } = props;

  const [text, setText] = useState(reaction ? reaction.text : null);
  const [quote, setQuote] = useState(reaction ? reaction.quote : null);
  const [label, setLabel] = useState(reaction ? reaction.label : null);

  const canSubmit = !!text && !!label && !isSubmitting;

  useImperativeHandle(ref, () => ({
    clear: () => {
      setText(null);
      setQuote(null);
      setLabel(null);
    },
  }));

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!canSubmit)
      return;

    onSubmit(label, quote, text);
  }

  return (
    <form onSubmit={handleSubmit} className="reaction-form-body">

      <textarea
        className="form-quote"
        rows={1}
        value={quote || ''}
        placeholder="Citation"
        disabled={isSubmitting}
        onChange={(e) => setQuote(e.target.value)}
      />

      <FormText
        replyTo={replyTo}
        text={text}
        setText={setText}
        disabled={isSubmitting}
      />

      <div className="form-footer">
        <div className="form-labels">
          { Object.keys(ReactionLabel)
            .map((key: string) => (
              <div
                key={key}
                className={classList('form-label', label === key && 'selected')}
                onClick={() => !isSubmitting && setLabel(key as any)}
              >
                { ReactionLabel[key as any] }
              </div>
            ))
          }
        </div>

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
