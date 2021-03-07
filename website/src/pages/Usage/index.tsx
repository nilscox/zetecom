import React from 'react';

import DownloadExtensions from 'src/components/DownloadExtensionsButtons';
import Link from 'src/components/Link';
import RouterLink from 'src/components/Link/RouterLink';
import Image from 'src/components/Image';

import imageLogin from './images/login.png';
import imageWriteComment from './images/write-comment.png';
import gifReport from './images/report.gif';
import imageModeration from './images/moderation.png';

import './Usage.scss';
import AppLink from 'src/components/Link/AppLink';
import { useEnvironment } from 'src/utils/env';

const Usage: React.FC = () => (
  <>

    <div className="step step-app" id="app">
      <div className="step-text">
        Les zones de commentaires Zétécom sont accessibe sur <strong>l'app</strong>, à l'adresse :
        <div className="app-link">
          <AppLink>{useEnvironment('APP_URL')}</AppLink>
        </div>
      </div>
        C'est ici que vous pouvez lire les messages, y répondre, voir la liste des zones de commentaires disponibles, voir l'historique de vos messages, etc.
      </div>
      <div className="step-secondary" style={{ maxWidth: 180 }}>
    </div>

    <div className="separator" />

    <div className="step step-extension" id="extension">
      <div className="step-text">
        Pour intégrer les zones de commentaires présentes sur l'app directement sur les sites que vous visitez, installez l'extension sur votre navigateur préféré.
        Lorsque l'icône de l'extension affiche un badge vert, cela signifie qu'une zone de commentaire est disponible sur la page.
        {/* Notez que ce n'est pas nécessaire pour utiliser la plateforme, l'extension ne fait qu'intégrer l'app. */}
      </div>
      <div className="step-secondary">
        <DownloadExtensions disposition="column" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-reactions" id="votes">
      <div className="step-text">
        Si vous trouvez un commentaire intéressant, vous pouvez l'annoter d'une réaction.
        Un algorithme va comptabiliser le nombre total d'annotations et de réponses, permettant ainsi de trier les commentaires par pertinence.
      </div>
      <div className="step-secondary">
        <div className="reaction">
          <div className="reaction-emoji">❤️</div>
          <div className="reaction-text">J'aime</div>
        </div>
        <div className="reaction">
          <div className="reaction-emoji">👍</div>
          <div className="reaction-text">Je suis plutôt d'accord</div>
        </div>
        <div className="reaction">
          <div className="reaction-emoji">🧠</div>
          <div className="reaction-text">Ça me fait réfléchir</div>
        </div>
        <div className="reaction">
          <div className="reaction-emoji">🤨</div>
          <div className="reaction-text">Je ne suis pas d'accord</div>
        </div>
        <div className="reaction">
          <div className="reaction-emoji">❓</div>
          <div className="reaction-text">Je ne comprends pas</div>
        </div>
      </div>
    </div>

    <div className="separator" />

    <div className="step step-signup" id="inscription">
      <div className="step-text">
        Pour participer aux échanges, il est nécessaire de disposer d'un compte sur la plateforme.
        Si ce n'est déjà fait, consacrez <strong>5 minutes</strong> à la lecture de <RouterLink to="/charte.html">la charte</RouterLink>, puis accédez à la page <AppLink href="/inscription">d'inscription</AppLink> pour créer votre compte.
      </div>
      <div className="step-secondary">
        <Image border src={imageLogin} alt="inscription" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-write-comment" id="regider-une-reaction">
      <div className="step-text">
        Vous avez votre mot à dire ? Publiez un nouveau commentaire !<br />
        Pour vous permettre de structurer vos propos, la rédaction d'un message est compatible avec la syntaxe <Link href="https://learnxinyminutes.com/docs/fr-fr/markdown-fr/">markdown</Link>, qui vous permet une mise en forme avec du texte en gras, des listes, des tableaux, etc.
      </div>
      <div className="step-secondary">
        <Image border src={imageWriteComment} alt="écrire un commentaire" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-report" id="signalement">
      <div className="step-text">
        Si un commentaire ne respecte pas la charte, vous pouvez choisir de notifier les modérateurs.
        Passez votre souris sur la date de publication du commentaire à signaler, cela fera apparaître un lien pour ouvrir une popup de signalement.
      </div>
      <div className="step-secondary">
        <Image border src={gifReport} alt="signaler un commentaire" />
      </div>
    </div>

    <div className="separator" />

    <div className="step step-moderation" id="moderation">
      <div className="step-text">
        La modération des échanges est assurée par des membres volontaires de la communauté.
        Si vous souhaitez en faire partie, <RouterLink to="/faq.html#contact">contactez nous</RouterLink> pour en discuter directement.
      </div>
      <div className="step-secondary">
        <Image src={imageModeration} style={{ opacity: 0.7 }} alt="moderation" />
      </div>
    </div>

  </>
);

export default Usage;
