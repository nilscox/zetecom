import React from 'react';

import './Beta.scss';
import Link from 'src/components/Link';

const Beta: React.FC = () => (
  <>
    <h2>Oyé oyé !</h2>

    <p>
      Nous, qui mettons en place le projet Zétécom, avons besoin de vous ! Que vous soyez un homme, une femme, jeune, vieux, zététicien ou non, ou même géologue, votre avis nous intéresse !
    </p>

    <p>
      Cela fait quelque temps que nous consacrons notre énergie à mettre en place cet outil, et nous avons maintenant besoin de retours et de tests pour parfaire le système. Si vous n'êtes pas venu ici dans le but de nous donner un petit coup de pouce, alors la suite de cette page ne vous intéressera probablement pas.
    </p>

    <h3>Zétécom, on en est où ?</h3>

    <p>
      Actuellement, une toute première version de l'addon Firefox et de l'extension Chrome sont développés et fonctionnels (ou en tout cas, on aimerait qu'ils le soient). Mais les inscriptions ne sont pas encore ouvertes publiquement, il n'y a donc pour l'instant pas de communauté active qui fait vivre le projet.
    </p>

    <h3>Ce que nous cherchons</h3>

    <p>
      Notre objectif est de proposer un outil qui pourra servir à une communauté en quête d'esprit critique sur internet. Pour cela, nous cherchons à recueillir des retours de futurs utilisateurs, pour mieux comprendre leurs intérêts, leurs attentes, et ce que ce produit pourra leur apporter.
    </p>

    <p>
      Si vous êtes prêt à consacrer quelques minutes (ou plus !) de votre temps, vos feedbacks nous seront très bénéfiques.
    </p>

    <h3>Deux versions : test et production</h3>

    {/* Le projet suit un cycle de développement rapide, qui permet de tester et de délivrer de nouvelles fonctionnalités en continu. */}
    <p>
      Il existe deux versions de l'extension  :
    </p>

    <ul>
      <li>une version "production" : c'est la version officielle</li>
      <li>une version "staging" (ou de "test") : utilisée pour tester les évolutions avant de les rendre disponibles sur la version de production</li>
    </ul>

    <p style={{ marginTop: 24 }}>
      Celle à utiliser pour tester l'extension est la version staging, disponible sur <Link openInNewTab href="https://staging.zetecom.fr">https://staging.zetecom.fr</Link>. Sur cette version :
    </p>

    <ul className="nobullet">
      <li>Il n'est bien sûr pas nécessaire de respecter la charte.</li>
      <li>Aucun email n'est envoyé (pas de validation d'adresse email par exemple).</li>
      <li>Les commentaires existants sont majoritairement repris de la zone de commentaires originale.</li>
      <li>Des zones de commentaires de test sont ouvertes sur certaines pages seulement :</li>
    </ul>

    <ul className="nobullet">
      <li><a href="https://img.youtube.com/vi/LB2sVSD5LhM/0.jpg">Sciences, Média & Foutaises (TenL#81)</a></li>
      <li><a href="https://img.lemde.fr/2020/04/05/0/0/1024/682/688/0/60/0/59bd152_JXxyTT9Py3J-R4jEx4-EW20I.jpg">Coronavirus : le risque est d’entrer dans « une nouvelle ère de surveillance numérique invasive »</a></li>
    </ul>

    <h3>Quels points aborder ?</h3>

    <p>
      Tout ! Dites-nous tout ce que vous pensez : les choses cool, les points d'améliorations, les bugs, vos idées...<br />
      Plus spécifiquement, voici quelques points sur lesquels des retours seront grandement appréciés :
    </p>

    <ul>
      <li>L'extension, son utilisation sur la version de test (création de compte, envoi de message, signalement...)</li>
      <li>Le site web, la façon dont il présente le projet, les mots utilisés, mais aussi sa forme, son apparence</li>
      <li>Le projet de manière générale, le contexte dans lequel il se place et les solutions qu'il tente d'apporter</li>
    </ul>

    <h3>Merci !</h3>

    <p style={{ marginTop: 24 }}>
      Un grand merci à vous qui choisissez de nous prêter main forte dans cette aventure. Nous espérons de tout cœur que nos efforts porterons leurs fruits !  Nous sommes disponibles pour lire vos retours par message <Link openInNewTab href="https://twitter.com/NilsCox">sur twitter</Link>, <Link openInNewTab href="mailto:contact@zetecom.fr">par mail</Link>, ou même pour en parler de vive voix via Skype ou "IRL" :)
    </p>

    <p style={{ marginBottom: 24 }}>
      Pour info, cette page n'est pas référencée. Elle n'est pas destinée à être publiée publiquement (sur un poste facebook par exemple). En revanche, si vous pensez à des proches que cette initiative peut intéresser, n'hésitez pas à en parler et à leur partager !
    </p>

    <p>
      Au fait, c'est qui "nous" ?<br />
      Nous sommes deux : je suis Nils, 27 ans, développeur web, je suis à l'initiative du projet. Mais je ne suis pas seul : Violaine, 28 ans, est elle aussi développeuse web et elle me donne un bon coup de main. Nous habitons ensemble à Aix-en-Provence.
    </p>
  </>
);

export default Beta;
