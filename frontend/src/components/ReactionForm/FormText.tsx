import React, { useState } from 'react';
import showdown from 'showdown';

import { classList } from '../../utils/classList';
import { Reaction } from '../../types/Reaction';

type FormTextProps = {
  replyTo?: Reaction;
  text: string | null;
  disabled: boolean;
  setText: (text: string) => void;
};

export const FormText = (props: FormTextProps) => {
  const { replyTo, text, disabled, setText } = props;
  const [preview, setPreview] = useState(false);

  const getTextareaPlaceholder = () => {
    if (replyTo)
      return `Répondre à ${replyTo.author.nick}`;

    return 'Composez votre message...';
  };

  const getContent = () => {
    if (preview) {
      const converter = new showdown.Converter();
      const html = converter.makeHtml(text);

      return (
        <div
          className="form-text-preview markdown-github"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    return (
      <textarea
        className="form-text-content"
        rows={4}
        value={text || ''}
        placeholder={getTextareaPlaceholder()}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
      />
    );
  };

  return (
    <div className="form-text-wrapper">

      <div className="form-edit-mode">
        <div className="form-mode-filler-left" />
        <div
          className={classList('form-mode-edit', !preview && 'active')}
          onClick={() => setPreview(false)}
        >
          Éditer
        </div>
        <div
          className={classList('form-mode-preview', preview && 'active')}
          onClick={() => setPreview(true)}
        >
          Aperçu
        </div>
        <div className="form-mode-filler" />
      </div>

      <div className="form-inner-content">
        { getContent() }
      </div>

    </div>

  );
};
