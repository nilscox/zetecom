import React from 'react';

import DownloadExtension from 'src/components/DownloadExtensionButton';
import Link from 'src/components/Link';
import Image from 'src/components/Image';

import gifReadReactions from 'src/images/read-reactions.gif';
import imagePopupLogin from 'src/images/popup-login.png';
import imageWriteReaction from 'src/images/write-reaction.png';
import imageReport from 'src/images/report.png';
import imageModeration from 'src/images/moderation.png';

import './Usage.scss';

const Usage: React.FC = () => (
  <>

    <div className="step step-install">
      <div className="step-text">
        Pour commencer, installez l'extension chrome en cliquant sur le bouton, puis sur "ajouter à chrome". Cela
        permettra à votre navigateur d'intégrer les zones de commentaires sur les sites d'information.
      </div>
      <div className="step-secondary">
        <DownloadExtension>Installer l'extension</DownloadExtension>
      </div>
    </div>

    <div className="separator" />

    <div className="step step-read-reactions">
      <div className="step-text">
        Lorsque l'icône de l'extension affiche un badge vert, cela signifie qu'une zone de commentaires a été ajoutée
        sur la page. Vous la trouverez généralement sous l'article (ou la vidéo). Ça y est, vous pouvez déjà lire les
        réactions et leurs réponses !
      </div>
      <div className="step-secondary">
        <Image border src={gifReadReactions} alt="réactions" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-signup">
      <div className="step-text">
        Pour participer aux échanges, il est nécessaire de disposer d'un compte sur l'extension. Dans un premier temps,
        consacrez <strong>une dizaine de minutes</strong> à la lecture de <Link href="/charte.html">la charte</Link>,
        car il est impératif que chaque membre de la communauté garde ces règles en tête. Puis, cliquez sur l'icône de
        l'extension en haut à droite de votre navigateur pour vous inscrire.
      </div>
      <div className="step-secondary">
        <Image border src={imagePopupLogin} alt="login" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-write-reaction">
      <div className="step-text">
        Vous avez votre mot à dire ? Publiez une nouvelle réaction ! Cela peut être directement sous l'information, en
        réponse à une autre, ou dans une thématique. Pensez à rechercher parmi les réactions existantes avant de
        publier, pour éviter les doublons. Enfin, vous pouvez mettre en forme votre message avec des liens, des listes,
        des tableaux, etc. via la syntaxe{' '}
        <Link href="https://learnxinyminutes.com/docs/fr-fr/markdown-fr/">markdown</Link>.
      </div>
      <div className="step-secondary">
        <Image border src={imageWriteReaction} alt="écrire une réaction" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-quick-reactions">
      <div className="step-text">
        Si vous trouvez une réaction pertinente, il vous est possible de la mettre en avant en l'annotant d'un 👍, 👎
        ou 🧐. Un algorithme va comptabiliser le nombre total d'annotations et de réponses pour vous présenter les
        réactions les plus impactantes lorsque vous les trierez par pertinence.
      </div>
      <div className="step-secondary">
        <div className="quick-reaction">
          <div className="quick-reaction-emoji">👍</div>
          <div className="quick-reaction-text">je suis <strong>d'accord</strong> avec le message</div>
        </div>
        <div className="quick-reaction">
          <div className="quick-reaction-emoji">👎</div>
          <div className="quick-reaction-text">je ne suis <strong>pas d'accord</strong> avec le message</div>
        </div>
        <div className="quick-reaction">
          <div className="quick-reaction-emoji">🧐</div>
          <div className="quick-reaction-text">je n'ai <strong>pas d'avis tranché</strong>, mais je trouve le message intéressant</div>
        </div>
      </div>
    </div>

    <div className="separator" />

    <div className="step step-report">
      <div className="step-text">
        Si une réaction ne respecte pas la charte, il est important de notifier les modérateurs. Passez votre souris sur
        la date de publication de la réaction à signaler, cela fera apparaître un lien pour ouvrir une popup de
        signalement.
      </div>
      <div className="step-secondary">
        <Image border src={imageReport} alt="signaler une réaction" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-join-moderators">
      <div className="step-text">
        La modération des échanges est assurée par des membres volontaires de la communauté. Si vous souhaitez en faire
        partie, <Link href="/faq.html#contact">contactez nous</Link> en expliquant les raisons qui motivent ce choix,
        nous en discuterons directement.
      </div>
      <div className="step-secondary">
        <Image src={imageModeration} style={{ opacity: 0.7 }} alt="moderation" />
      </div>
    </div>

  </>
);

export default Usage;
