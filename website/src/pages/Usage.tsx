import React from 'react';

import DownloadExtensions from 'src/components/DownloadExtensions';
import Link from 'src/components/Link';
import Image from 'src/components/Image';

import gifExtension from 'src/images/youtube-ri.gif';
import imagePopupLogin from 'src/images/popup-login.png';
import gifWriteReaction from 'src/images/write-reaction.gif';
import gifReport from 'src/images/report.gif';
import imageModeration from 'src/images/moderation.png';

import './Usage.scss';

const Usage: React.FC = () => (
  <>

    <div className="step step-install" id="extension">
      <div className="step-text">
        Pour commencer, installez l'extension sur votre navigateur préféré en cliquant sur le bouton correspondant.
        Cela permettra l'intégration des zones de commentaires sur les sites d'information.
      </div>
      <div className="step-secondary">
        <DownloadExtensions disposition="column" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-read-reactions" id="lire-les-reactions">
      <div className="step-text">
        Lorsque l'icône de l'extension affiche un badge vert, cela signifie qu'une zone de commentaires a été ajoutée sur la page.
        Vous la trouverez généralement sous l'article (ou la vidéo). Ça y est, vous pouvez déjà lire les messages et leurs réponses !
      </div>
      <div className="step-secondary">
        <Image border src={gifExtension} alt="zone de commentaire" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-signup" id="inscription">
      <div className="step-text">
        Pour participer aux échanges, il est nécessaire de disposer d'un compte sur l'extension.
        Dans un premier temps, consacrez <strong>5 minutes</strong> à la lecture de <Link href="/charte.html">la charte</Link>. Il est impératif que chaque membre de la communauté garde ces règles en tête.
        Puis, cliquez sur l'icône de l'extension en haut à droite de votre navigateur pour vous inscrire.
      </div>
      <div className="step-secondary">
        <Image border src={imagePopupLogin} alt="inscription" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-write-reaction" id="regider-une-reaction">
      <div className="step-text">
        Vous avez votre mot à dire ? Publiez une nouvelle réaction !
        Mais avant cela, pensez à rechercher parmi les réactions existantes, car le sujet que vous allez aborder est peut-être déjà en train d'être discuté.
        Pour mettre en valeur vos propos, la syntaxe <Link openInNewTab href="https://learnxinyminutes.com/docs/fr-fr/markdown-fr/">markdown</Link> vous permet de mettre en forme votre message avec des liens, des listes, des tableaux, etc.
      </div>
      <div className="step-secondary">
        <Image border src={gifWriteReaction} alt="écrire une réaction" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-quick-reactions" id="votes">
      <div className="step-text">
        Si vous trouvez une réaction pertinente, il vous est possible de la mettre en avant en l'annotant d'un 👍, 👎 ou 🧐.
        Un algorithme va comptabiliser le nombre total d'annotations et de réponses pour vous présenter les réactions les plus impactantes en premier lorsqu'elles sont triées par pertinence.
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
          <div className="quick-reaction-text">je n'ai <strong>pas d'avis tranché</strong>, mais le message me fait réfléchir</div>
        </div>
      </div>
    </div>

    <div className="separator" />

    <div className="step step-report" id="signalement">
      <div className="step-text">
        Si une réaction ne respecte pas la charte, il est important de notifier les modérateurs.
        Passez votre souris sur la date de publication de la réaction à signaler, cela fera apparaître un lien pour ouvrir une popup de signalement.
      </div>
      <div className="step-secondary">
        <Image border src={gifReport} alt="signaler une réaction" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-join-moderators" id="moderation">
      <div className="step-text">
        La modération des échanges est assurée par des membres volontaires de la communauté.
        Si vous souhaitez en faire partie, <Link href="/faq.html#contact">contactez nous</Link> en expliquant les raisons qui motivent ce choix, nous en discuterons directement.
      </div>
      <div className="step-secondary">
        <Image src={imageModeration} style={{ opacity: 0.7 }} alt="moderation" />
      </div>
    </div>

  </>
);

export default Usage;
