/* eslint-disable react/no-unescaped-entities */

import React, { useState } from 'react';

import './Beta.scss';
import Link from 'src/components/Link';
import Image from 'src/components/Image';

import logoDiscord from './images/logo-discord.png';
import imageEmail from './images/email.png';
import { withEnv } from 'src/utils/env';

const Beta: React.FC = withEnv(({ DISCORD_ID, CONTACT_EMAIL }) => {
  const [showQuestions, setShowQuestions] = useState(false);

  return (
    <>
      <Image src="https://i.imgflip.com/45st4i.jpg" className="we-need-you" alt="we need you" />

      <h2>Bêta</h2>

      <p>
        Nous, qui mettons en place Zétécom, avons besoin de vous ! Que vous soyez un homme, une femme, jeune, vieux, zététicien ou non, ou même géologue, <strong>votre avis nous intéresse</strong> !
      </p>

      <p>
        Pour mieux comprendre vos besoins, vos attentes, et savoir comment cet outil peut y répondre, nous devons récolter vos retours sur l'utilisation de la plateforme.
        Si vous souhaitez donner votre avis, devenez bêta-testeu.r.se ! Cela n'engage à rien et ne vous prendra qu'entre 10 minutes et... plus 🙂
      </p>

      <p>
        Une petite fiche donnant plus d'informations est disponible ici :
      </p>

      <div className="link-pdf">
        <Link openInNewTab href="/zetecom-beta.pdf">zetecom-beta.pdf</Link>
      </div>

      <p>
        À l'issue du premier test, un petit questionnaire de 5 questions (<Link openInNewTab href="https://nilscoxdev.typeform.com/to/jsLZdej6">accessible ici</Link>) vous sera proposé.
        Si vous voulez, vous pouvez <span role="button" onClick={() => setShowQuestions(true)}>voir ces questions</span> dès maintenant.
      </p>

      {showQuestions && (
        <ul>
          <li>Que pensez-vous de la plateforme, visuellement ? Arrivez-vous à vous repérer, à naviguer facilement ?</li>
          <li>Avez-vous réussi à créer un compte sur la plateforme ? À valider votre adresse email, et à vous connecter / déconnecter ?</li>
          <li>Avez-vous installé l'extension Chrome / Firefox ? Fonctionne-t-elle comme attendu ?</li>
          <li>Qu'avez-vous pensé de ce premier test ? Allez-vous continuer d'utiliser la plateforme pour la suite de la bêta ?</li>
          <li>Avez-vous d'autres points à remonter ?</li>
        </ul>
      )}

      <p>
        Nous sommes disponibles pour échanger par mail ou sur discord, et même pour discuter de vive voix via zoom / hangout ou "IRL" 🍺
      </p>

      <div className="contacts">

        {DISCORD_ID && (
          <Link href={`https://discord.gg/${DISCORD_ID}`} className="discord-link">
            <Image src={logoDiscord} alt="logo discord" />
            <strong>Zétécom</strong>
          </Link>
        )}

        {CONTACT_EMAIL && (
          <a href={`mailto:${CONTACT_EMAIL}`} className="email-link">
            <Image src={imageEmail} alt="email" />
            <strong>{CONTACT_EMAIL}</strong>
          </a>
        )}

      </div>
    </>
  )
});

export default Beta;
