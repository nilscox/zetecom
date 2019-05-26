/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { Link } from 'react-router-dom';

import Title from './components/Title';
import SubTitle from './components/SubTitle';
import Outline from './components/Outline';
import Section from './components/Section';
import Note from './components/Note';
import DownloadExtensionButton from './components/DownloadExtensionButton';

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
        charte</Link>. En combinant nos cerveaux intélligement, on finira peut-être bien par s'entendre...
      </Outline>

      <Title>Utilisation</Title>

      <Section>
        <p>
          CDV est une plateforme vous proposant de réagir librement à l'information. Que ce soit un article sur
          internet, dans la presse, à la télé, ... Mais ça, c'est la vision à long terme. Pour le moment, il n'est
          possible de réagir qu'à certaines vidéos sur <a href="https://youtube.com">YouTube</a>, via une extension sur
          le navigateur <a href="https://google.com/chrome">Google Chrome</a>. Si le système fais ses preuves sur
          YouTube, alors il sera peut-être envisageable de le déployer à plus grande échelle.
        </p>
      </Section>

      <SubTitle>Extsension chrome</SubTitle>

      <Section>
        <p>
          Cette extension permet d'afficher une zone de commentaires venant de CDV sous les vidéos, en plus des
          commentaires de YouTube. En créant un compte, elle permet aussi de publier une "réaction", c'est à dire un
          commentaire sur CDV et de répondre aux réactions existantes. C'est parti ?
        </p>
      </Section>

      <DownloadExtensionButton url="">
        télécharger l'extension chrome
      </DownloadExtensionButton>

      <Section>
        <p>
          Une fois l'extension installée, rendez-vous sur <a href="https://youtube.com/watch?v=TG3l8N7f7kc">une vidéo
          YouTube ayant les commentaires de CDV activée</a>, et vous aurez la possibilité de lire les commentaires
          propres à CDV qui y sont associés. Pour afficher les réponses à une réaction, cliquez sur le nombre de
          réponses. Si vous vous inscrivez sur la plateforme, il vous sera possible d'effectuer deux type d'actions :
        </p>

        <ul>
          <li>ajouter une réaction, en réponse à une autre ou non</li>
          <li>donner votre avis sur une réaction, mais sans y répondre</li>
        </ul>

        <p>
          Pour créer un compte ou vous connecter à un compte existant, cliquez sur l'icône de l'extension en haut à
          droite du navigateur.
        </p>
      </Section>

      <SubTitle>Donner son avis</SubTitle>

      <Section>
        <p>
          Donner son avis sur une réaction permet à la plateforme de mieux la référencer lorsque les réactions sont
          triées par pertinence. Cet avis est totalement subjectif, et il vous est possible d'en changer (ou de le
          retirer) à tout moment. Plus une réaction a d'avis, et mieux elle est référencée. Les avis que vous pouvez
          donner sur une réaction sont :
        </p>

        <ul>
          <li>
            J'approuve : je trouve que cette réaction est pertinente et je suis d'accord avec le message
            <ul>
              <li>
                elle apporte des éléments me convaincant
              </li>
            </ul>
          </li>
          <li>
            Je réfute : je trouve que cette réaction est pertinente mais je ne suis pas d'accord avec le message
            <ul>
              <li>
                la méthode utilisée me semble incorrecte ou biaisée
              </li>
              <li>
                j'ai une preuve du contraire
              </li>
            </ul>
          </li>
          <li>
            Je suis septique : je trouve que cette réaction est pertinente
            <ul>
              <li>
                elle n'apporte pas assez d'éléments pour me convaincre
              </li>
              <li>
                j'ai besoin de m'informer plus sur le sujet pour me faire une opinion
              </li>
              <li>
                elle évoque une problématique qui vaut la peine d'être discutée plus en profondeur
              </li>
            </ul>
          </li>
        </ul>
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

    </div>
  );
};

export default Home;
