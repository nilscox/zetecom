/* eslint-disable react/no-unescaped-entities */

import React from 'react';

import Title from './components/Title';
import SubTitle from './components/SubTitle';
import Note from './components/Note';

const Rule: React.FC = ({ children }) => (
  <h4 style={{ fontSize: '1.2rem', margin: 10, marginLeft: 50 }}><em>{ children }</em></h4>
);

const Rules: React.FC = () => {
  return (
    <div
      id="Rules"
      className="page"
    >

      <Title>La charte de CDV</Title>

      <SubTitle>Introduction</SubTitle>

      <p>
        La charte présente une liste de règles qu'il est important de lire et de comprendre dans le but de donner un
        cadre aux disscutions présentes sur CDV. Ces règles sont simples, et présentées de manière à ce qu'elle soit
        comprises au mieux par l'ensemble des utilisateurs.
      </p>

      <p>
        Ces règles ne sont pas des CGU.
      </p>

      <p>
        Ces règles ne sont pas définies une fois pour toutes.
      </p>

      <SubTitle>1. En tant que lecteur</SubTitle>

      <Rule>
        1.1. Je suis invité à lire les réactions des autres utilisateurs de CDV, en bonne intélligence.
      </Rule>

      <Note>
        Les utilisateurs de CDV ont des choses à dire, et vous serez sans doute intéressé de les lire pour comprendre
        leur intérêt par rapport à l'information. Pour bien comprendre l'auteur d'une réaction, il est important de
        commencer par mettre de côté ses préjugés et apprioris sur le sujet, dans le but d'éviter de comprendre une
        version biaisée du message. Il faut donc *suspendre son jugement* le temps de la lecture. Chacun a sa vision du
        monde, les mots utilisés ont peut-être un sens légèrement différents pour vous et pour l'auteur. Jouez le jeu,
        et tentez de comprendre le fond du message qu'il a voulu transmettre en rédigant la réaction.
      </Note>

      <Rule>1.2. Je comprends et j'interprête le message avec recul et méthode.</Rule>

      <Note>
        Après avoir lu une réaction en entier, vous vous posez peut-être des questions. Voire, vous n'êtes pas d'accord
        avec les faits ou arguments présentés. Tentez, du mieux possible, de comprendre les mots de l'auteur, dans le
        sens qu'il a voulu leur donner. A vous de réfléchir pour comprendre son point de vue, de manière neutre et
        objective, surtout si vous n'êtes pas d'accord avec le message. Il est normal que vous vous fassiez un avis
        lorsque vous lisez une réaction, mais il faut cependant rester vigilent à éviter, du mieux possible, que cela
        impacte votre compréhension des informations apportées.
      </Note>

      <Rule>1.3. Je vérifie les sources.</Rule>

      <Note>
        En cliquant sur les liens des sources, il vous est possible de vérifier tous les propos d'une réactions (si
        celle-ci respecte la charte). Une affirmation extraordinaire demande des preuves plus qu'ordinaires, dis-t-on.
        C'est à vous, lecteurs, de vérifier que les informations qui sont avancées sont bien valides grâce aux sources
        apportées. Surtout si vous êtes prêt à remettre en question les informations sourcées.
      </Note>

      <Rule>1.4. J'estime à quelle point je pense que la réaction est vraie et apporte du sens à mon jugement.</Rule>

      <Note>
        Une fois le message compris et vérifié, vous pouvez vous forger votre propre opinion. En accordant une dose
        raisonable de rigeure à la méthode avec laquelle vous raisonnez par rapport aux information apportées par une
        réaction, vous êtes en mesure d'estimer le poids que vous accordez au message. Attention cependant, à faire la
        différence entre une information factuelle (éventuellement sourcée), et une opinion. Une information peut vous
        faire changer d'avis sur un sujet si vous ne parvenez pas à l'infirmer, ou si les sources sont solides. En
        revanche, une opinion est personelle, et ne peut être vérifiée. Mais peut-être qu'un point de vue différent sur
        un sujet peut vous amener à réfléchir d'une façon que vous n'auriez pas concidéré.
      </Note>

      <Rule>1.5. Je signale une réaction qui ne respecte pas cette charte.</Rule>

      <Note>
        Il peut arriver qu'une réaction ne respecte pas cette charte. Dans ce cas, deux cas de figures sont possibles :
        la signaler, ou pas. Si vous pensez que l'auteur du message a involontairement commis une erreur, vous pouvez
        lui répondre directement, pas besoin de la signaler. Dans le cas contraire, vous êtes encouragé à la signaler.
        Cela alertera les modérateurs, qui pourront entreprendre une action en fonction de la situation. A vous de faire
        preuve de bienveillance pour savoir comment agir.
      </Note>

      <SubTitle>2. En tant que rédacteur</SubTitle>

      <p>*Work in progress...*</p>

    </div>
  );
};

export default Rules;
