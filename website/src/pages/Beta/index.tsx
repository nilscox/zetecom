import React, { useState } from 'react';

import './Beta.scss';
import Link from 'src/components/Link';
import Image from 'src/components/Image';
import { useEnvironment } from 'src/index';
import DownloadExtensionsButtons from 'src/components/DownloadExtensionsButtons';

import hereWeAre from './images/here-we-are-infography.png';
import logoFacebook from './images/logo-facebook.png';
import logoTwitter from './images/logo-twitter.png';
import imageEmail from './images/email.png';

const SeeMore: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        height: open ? 'auto' : 200,
        overflow: 'hidden',
      }}
      onClick={() => setOpen(true)}
    >
      { !open && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(#FFF6, #FFFC 30%, #FFFF)',
            textAlign: 'center',
            paddingTop: 60,
            textTransform: 'uppercase',
            fontSize: '2.2em',
            fontWeight: 'bold',
            color: '#446A',
            fontFamily: 'Noticia Text',
            cursor: 'pointer',
          }}
        >
          <span style={{ textShadow: '-4px 4px #0002' }}>En savoir plus</span>
        </div>
      ) }
      { children }
    </div>
  );
};


const Beta: React.FC = () => (
  <>
    <Image src="https://i.imgflip.com/45st4i.jpg" className="we-need-you" alt="we need you" style={{ marginLeft: 80 }}></Image>

    <h2>Rejoindre la bêta</h2>

    <p>
      Nous, qui mettons en place le projet Zétécom, avons besoin de vous ! Que vous soyez un homme, une femme, jeune, vieux, zététicien ou non, ou même géologue, <strong>votre avis nous intéresse</strong> !
    </p>

    <p>
      Car pour mieux comprendre vos besoins et développer un outil qui vous sera <em>vraiment</em> utile, nous avons besoin de récolter vos retours sur le projet et sur l'utilisation de l'extension. Il y a sans aucuns doutes encore quelques détails qui peuvent être améliorés, quelques bugs qu'il faut corriger, voire quelques fonctionnalités qu'il serait intéressant d'ajouter.
    </p>

    <p>
      Les inscriptions sur la plateforme ne sont pour l'instant ouvertes qu'aux « bêta-testeurs », qui ont accès en avant-première à un environnement permettant de tester l'extension. Pour participer à la bêta, rien de plus simple ! Il suffit d'installer l'extension Chrome ou Firefox "<strong>Zétécom (staging)</strong>", accessible ici :
    </p>

    <DownloadExtensionsButtons staging disposition="row" />

    <SeeMore>
      <More />
    </SeeMore>
  </>
);

const More: React.FC = () => (
  <>
    <p>
      Cela fait quelque temps que nous consacrons notre énergie à mettre en place cet outil, et nous avons maintenant besoin de retours et de tests pour affiner le système. Si vous n'êtes pas venu ici dans le but de nous donner un petit coup de pouce, alors la suite de cette page ne vous intéressera probablement pas. 🙂
    </p>

    <p>
      Au passage, si vous pensez à des proches que cette initiative peut intéresser ou qui sont suceptible de pouvoir nous aider, n'hésitez pas à en parler et à leur partager cette page !
    </p>

    <div style={{ clear: 'right' }} />

    <h3>Zétécom, on en est où ?</h3>

    <p>
      Actuellement, une toute première version de l'extension est développée et fonctionnelle, mais les inscriptions ne sont pas encore ouvertes publiquement : il n'y a donc pas encore de communauté active qui fait vivre le projet.
      Une image vaut souvent mieux que mille mots :
    </p>

    <a href={hereWeAre}>
      <Image src={hereWeAre} alt="on en est là" className="hereWeAre" />
    </a>

    <p>
      Notre objectif est de proposer un outil qui pourra servir à une communauté en quête d'esprit critique sur internet. Pour cela, nous cherchons à recueillir des retours de futurs utilisateurs, pour mieux comprendre leurs intérêts, leurs attentes, et ce que ce produit pourra leur apporter.
    </p>

    <p>
      Si vous souhaitez participer à la phase de bêta, voici les quelques petites choses à savoir pour tester efficassement le produit.
    </p>

    <h3>Deux versions : test et production</h3>

    <p>
      Il existe deux versions de l'extension  :
    </p>

    <ul>
      <li>une version "production" : c'est la version officielle, accessible sur <Link href="/">la page d'acceuil du site</Link></li>
      <li>une version "staging" (ou de "test") : pour tester les évolutions avant de les rendre disponibles sur la version de production</li>
    </ul>

    <p style={{ marginTop: 24 }}>
      Celle à utiliser pour tester l'extension est la version staging, disponible en haut de cette page.
    </p>

    <p>
      <strong>Sur version staging :</strong>
    </p>

    <ul className="nobullet">
      <li>Il n'est bien sûr pas nécessaire de respecter la charte.</li>
      <li>Aucun email n'est envoyé (pas de validation d'adresse email par exemple).</li>
      <li>Les commentaires existants sont majoritairement repris de la zone de commentaires originale.</li>
      <li>Des zones de commentaires de test sont ouvertes sur certaines pages seulement :</li>
    </ul>

    <ul className="comments-zones-links">
      <li>YouTube : <a href="https://www.youtube.com/watch?v=LB2sVSD5LhM">Sciences, Média & Foutaises (TenL#81)</a> (la Tronche en Biais)</li>
      <li>LeMonde.fr : <a href="https://www.lemonde.fr/pixels/article/2020/04/05/coronavirus-le-risque-est-d-entrer-dans-une-nouvelle-ere-de-surveillance-numerique-invasive_6035640_4408996.html">Coronavirus : le risque est d’entrer dans « une nouvelle ère de surveillance numérique invasive »</a></li>
    </ul>

    <small>Nous pourrons ouvrir des zones de commentaires sur d'autres pages à la demande.</small>

    <h3>Quels points aborder ?</h3>

    <p>
      Vous êtes bien sur libre de nous dire tout ce que vous pensez du projet : ce qui vous plait, mais aussi (et surtout !) les axes d'amélioration. Voici par exemple quelques points sur lesquels il y a matière à réfléchir :
    </p>

    <ul>
      <li><strong>L'extension</strong>, son utilisation et son ergonomie (création de compte, publication de commentaires, signalement...)</li>
      <li><strong>Le site web</strong>, la façon dont il présente le projet, les mots utilisés, mais aussi sa forme, son apparence</li>
      <li><strong>La charte</strong>, la pertinence et la formulation des règles</li>
      <li><strong>Le projet</strong> de manière générale, le contexte dans lequel il se place et les solutions qu'il apporte</li>
    </ul>

    <h3>Merci !</h3>

    <p style={{ marginTop: 24 }}>
      Un grand merci à vous qui choisissez de nous prêter main forte dans cette aventure. Nous espérons de tout cœur que nos efforts porterons leurs fruits ; que vous pourrez, via Zétécom, entretenir des discussions enrichissantes avec des personnes à l'écoute, sans caindre de vous faire troller !
    </p>

    <p>
      Nous sommes disponibles pour échanger par message sur twitter, par mail, ou même pour en parler de vive voix via Skype ou "IRL" 😁
    </p>

    <div className="contacts">

      {useEnvironment('TWITTER_ACCOUNT') && (
        <Link openInNewTab href={`https://twitter.com/${useEnvironment('TWITTER_ACCOUNT')}`} className="twitter-link">
          <Image src={logoTwitter} alt="logo twitter" />
          <strong>@{useEnvironment('TWITTER_ACCOUNT')}</strong>
        </Link>
      )}

      {useEnvironment('FACEBOOK_PAGE') && (
        <Link openInNewTab href={`https://facebook.com/${useEnvironment('FACEBOOK_PAGE')}`} className="facebook-link">
          <Image src={logoFacebook} alt="logo facebook" />
          <strong>{useEnvironment('FACEBOOK_PAGE')}</strong>
        </Link>
      )}

      {useEnvironment('CONTACT_EMAIL') && (
        <a href={`mailto:${useEnvironment('CONTACT_EMAIL')}`} className="email-link">
          <Image src={imageEmail} alt="email" />
          <strong>{useEnvironment('CONTACT_EMAIL')}</strong>
        </a>
      )}

    </div>

    <p>
      Au fait, c'est qui "nous" ?<br />
      Nous sommes deux : je suis Nils, 27 ans, développeur web, je suis à l'initiative du projet. Mais je ne suis pas seul : Violaine, 28 ans, est elle aussi développeuse web et elle me donne un bon coup de main. Nous habitons ensemble à Aix-en-Provence.
    </p>
  </>
);

export default Beta;
