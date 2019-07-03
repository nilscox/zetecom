/* eslint-disable react/no-unescaped-entities, max-lines */

import React from 'react';
import { Link } from 'react-router-dom';

import env from '../utils/env';

import SubTitle from './components/SubTitle';
import Outline from './components/Outline';
import Section from './components/Section';
import Note from './components/Note';
import DownloadExtensionButton from './components/DownloadExtensionButton';

/*

- Introduction :
  - pitch du projet
  - télécharger l'extension
  - Screenshot (gif commentaires YouTube / CDV)

- Contextualisation de l'information sur internet
  - disponibilité / accessibilité de l'information
  - qualité de l'information
  - désinformation, fake news, fact checking
  - manque d'organisation

- Utilisation
  - Extension chrome : affichage de commentaires externes à YouTube embed sous la vidéo
  - Lire les réactions : nuancer l'information principale, mettre en perspective, comprendre des opinions différentes
  - Quick réaction : favoriser le référencement des réactions, mettre en avant les réactions les plus pertinentes
  - Rédiger des réactions : partager des sources, des idées, soulever des problématiques, poser des quesions, réactions
    nestéés
  - Modération : signaler les réactions

- Etat d'esprit du projet
  - communauté, charte, algo de référencement
  - open source
  - projet participatif
  - vision long terme, idées futures

--

  J'approuve : je trouve que cette réaction est pertinente et je suis d'accord avec le message
    elle apporte des éléments me convaincant
  Je réfute : je trouve que cette réaction est pertinente mais je ne suis pas d'accord avec le message
    la méthode utilisée me semble incorrecte ou biaisée
    j'ai une preuve du contraire
  Je suis septique : je trouve que cette réaction est pertinente
    elle n'apporte pas assez d'éléments pour me convaincre
    j'ai besoin de m'informer plus sur le sujet pour me faire une opinion
    elle évoque une problématique qui vaut la peine d'être discutée plus en profondeur

--

L'homme de paille
L'homme de fer
L'effet puits
L'effet forer

Biais de confirmation

*/

const Home: React.FC = () => {
  return (
    <div
      id="Home"
      className="page"
    >

      <Outline>
        <Link to="/"><em>Chercheurs de vérité</em></Link> est une plateforme <strong>libre</strong> de réaction à
        l'information, dont le but est de proposer un <strong>espace d'échange collaboratif</strong> et bienveillant,
        mais réglementé, visant à faire <strong>avancer la connaissance</strong> via le partage des points de vus de
        chaque utilisateur.<br />
        Ici, chacun est libre d'exposer une idée, d'apporter une source, de donner son opinion ou bien de poser des
        questions, du moment que son message apporte quelque chose au débat et qu'il respecte <Link to="/charte">la
        charte</Link>. En combinant nos cerveaux intelligement, on finira peut-être bien par s'entendre...
      </Outline>

      <Section>

        <div style={{
          width: 400,
          float: 'right',
          border: '1px solid #CCC',
          marginLeft: 20,
          marginBottom: 20,
        }}>
          <img src="/assets/images/youtube-cdv.gif" style={{ width: 400 }} />
        </div>

        <p>
          CDV est une plateforme vous proposant de réagir librement à l'information. Que ce soit un article sur
          internet, dans la presse, à la télé, ... Mais ça, c'est la vision à long terme. Pour le moment, il n'est
          possible de réagir qu'à certaines vidéos sur <a href="https://youtube.com">YouTube</a>, via une extension sur
          le navigateur <a href="https://google.com/chrome">Google Chrome</a>. Cette extension ajoute directement sous
          la vidéo, un bouton vous permettant de choisir d'afficher les commentaires YouTube originaux, ou bien les
          commentaires de CDV à la place. Si le système fais ses preuves sur YouTube, alors il sera peut-être
          envisageable de le déployer à plus grande échelle....
        </p>

        <DownloadExtensionButton url={`https://chrome.google.com/webstore/detail/${env.CHROME_EXTENSION_ID}`}>
          télécharger l'extension chrome
        </DownloadExtensionButton>

        <p>
          Sur internet, il règne une foultitude d'informations dont la qualité peut varier du tout au tout. Et
          particulièrement sur YouTube, on trouve aussi bien des reportages très qualitatif sur le monde, l'espace, les
          dernières découvertes scientifiques, que des vidéos relatant de fausses informations, ou incitant à croire à
          des théories du complot. Et innévitablement, l'espace d'échanges prévu pour discuter convivialement sous la
          vidéo se retrouve facilement innondé de commentaires dont le but n'est pas de donner son opinion sur le sujet,
          alors que des réflexions tout à fait pertinentes se retrouvent noyées. Et c'est normal ! La zone de
          commentaire YouTube n'est pas vraiment prévue pour ça.
        </p>

        <p>
          CDV a été imaginé dans le but de rassembler une communauté de personnes qui se mettent d'accord pour respecter
          un ensemble de règles, dans une approche septique, qui permettent de donner un cadre clair aux réflexions
          pouvant émerger en réaction aux informations sur internet. Les "réactions" (les commentaires sur CDV) peuvent
          être rédigées en réponse à d'autres et les plus impactantes étant mises en avant, comme sur reddit pour les
          connaisseurs. Prêt(e) à tenter l'exprérience ? Jetez un oeil à <Link to="/charte">la charte</Link> ;)
        </p>

        <div style={{ clear: 'right' }} />

      </Section>

      <Section title="Utilisation">

        <SubTitle>Extension chrome</SubTitle>

        <p>
          Le principe est simple : l'extension chrome permet d'intégrer une zone de commentaires propre à CDV
          directement à l'intérieur d'une page web sur internet. Si une page que vous visitez se retrouve modifiée pour
          ajouter une zone réactions venant de CDV, l'icone de l'extension passe en vert. *screenshot*
        </p>

        <p>
          Cette zone de réactions est uniquement alimenté par la communauté de CDV, et respectent donc la charte. Ce
          qui laisse la place aux échanges d'idées dans un cadre bienveillant et respectueux, mais se passera des
          affirmations sans preuves, des blagues et autres trolls. Pour participer aux conversations, il vous est
          possible de créer un compte en cliquant sur l'icône de l'extension, en haut à droite de votre navigateur.
        </p>

        <SubTitle>Intéragir avec la communauté</SubTitle>

        <p>
          Deux types d'actions sont possible pour participer aux échanges sur CDV :
        </p>

        <ul>
          <li>Aprouver ou réfuter une réaction existante</li>
          <li>Rédiger une nouvelle réaction</li>
        </ul>

        <p>
          Certaines réactions vont apporter des précisions, vous faire réfléchir, peut-être même vous faire
          changer d'avis ! Si beaucoup d'utilisateurs trouvent une même réaction pertinente, il semble naturel de
          la mettre en avant. Il vous est ainsi possible (en étant connecté(e)), d'annoter une réaction existante d'un
          "J'aprouve", "Je réfute" ou bien "Je suis septique...". Un algorithme (pas celui de YouTube) va comptabiliser
          le nombre total d'anotations pour vous présenter les réactions les mieux référencer quand vous choisissez de
          les trier par pertinence.
        </p>

        <Note>
          Attention ! Réfuter une réaction ne va pas faire baisser son référencement. Au contraire, elle va même être
          un peu mieux référencée, car vous y avez accordé de l'importance, même si vous n'êtes pas d'accord avec le
          message. Au passage, l'algorithme évolue constament, dans le but d'améliorer son fonctionnement ; si vous êtes
          intéressé(e) pour apporter votre grain de sel, contactez l'équipe de CDV ;).
        </Note>

      </Section>

      <Note>Work in progress...</Note>

{/*
      <SubTitle>Donner son avis</SubTitle>

      <Section>
        <p>
          Donner son avis sur une réaction permet à la plateforme de mieux la référencer lorsque les réactions sont
          triées par pertinence. Cet avis est totalement subjectif, et il vous est possible d'en changer (ou de le
          retirer) à tout moment. Plus une réaction a d'avis, et mieux elle est référencée. Les avis que vous pouvez
          donner sur une réaction sont :
        </p>
      </Section>

      <Note>
        Attention ! Ce n'est pas parce que vous réfutez une réaction qu'elle sera moins bien référencée. Au contraire,
        une réaction est jugée plus pertinente si elle a un grand nombre d'avis.
      </Note>

      <SubTitle>Rédiger une réaction</SubTitle>

      <Section>
        <p>
          Pour rédiger une réaction, rendez-vous sur une vidéo YouTube ayant les commentaires de CDV activée. Pour le
          moment, il n'est pas possible d'activer les commentaires de CDV sur une vidéo autrement qu'
          <a href="mailto:cdv@nils.cx">en passant par un administrateur de la plateforme</a>.
        </p>
      </Section>

      <Section>
        <p>
          Une réaction se compose de 2 parties :
        </p>

        <ul>
          <li>une citation (optionelle), permettant de réagir à une partie précise de la vidéo ;</li>
          <li>un message, le commentaire à proprement parlé ;</li>
        </ul>

        <p>
          Personne n'étant à l'abri d'une erreur, vous pouvez à tout moment modifier le texte d'une réaction. Attention
          cependant à ne pas changer le sens du message ! Autrement, les réactions en réponse à votre message ne seront
          potentiellement plus en harmonie avec le nouveau sens de votre message. Lorsque vous éditez une réaction, une
          étoile apparaît à côté de la date de publication, et il sera toujours possible de consulter l'historique des
          modifications en cliquant sur cette date.
        </p>

        <p>
          Enfin, après qu'une réaction ait été publiée, il n'est pas possible de l'effacer. Vous avez partagé un message
          à une certaine date, si votre pensée évolue ultérieurement, le message que vous aviez rédigé avant de changer
          d'avis doit rester le même, dans le but de conserver l'évolution du débat et des réponses à votre réaction
          initiale.
        </p>
      </Section>
*/}
    </div>
  );
};

export default Home;
