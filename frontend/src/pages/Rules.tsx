/* eslint-disable react/no-unescaped-entities */

import React from 'react';

import Title from './components/Title';
import SubTitle from './components/SubTitle';
import Note from './components/Note';

/*

- 1. En tant que lecteur
  - 1.1. Je suis invité à lire les réactions des autres utilisateurs de CDV, en bonne intélligence.
  - 1.2. Je comprends et j'interprête le message avec recul et méthode.
  - 1.3. Je vérifie les sources.
  - 1.4. J'estime à quelle point je pense que la réaction est vraie et apporte du sens à mon jugement.
  - 1.5. Je signale une réaction qui ne respecte pas cette charte.

- 2. En tant que rédacteur
  - 2.1. Je formule mon message de manière claire et en allant droit au but.
  - 2.2. Je différencie une réaction factuelle d'une réaciton d'opinion.
  - 2.3. J'apporte les sources nécéssaires pour vérifier les faits énoncés.
  - 2.4. Je répond aux réactions des autres utilisateurs avec respect et courtoisie.
  - 2.5. Je peux éditer une réaction à condition que le sens original du message ne change pas.

*/

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
        cadre aux discussions présentes sur CDV. Ces règles sont simples, et présentées de manière à ce qu'elles soient
        comprises au mieux par l'ensemble des utilisateurs. Réservez une dizaine de minutes à leur lecture.
      </p>

      <p>
        Contrairement à des conditions générales d'utilisation, la charte n'établie pas de règles juridiques. Selon les
        situations, certaines règles peuvent avoir plus de sens plus que d'autres. C'est donc à vous de comprendre, du
        mieux possible, l'état d'esprit induit par la charte, en faisant preuve d'un peu de charité interprêtative.
      </p>

      <p>
        Dans un but d'amélioration continue, ces règles évoluent ! De temps en temps, il est possible que certaines
        règles de la charte soient mises à jour, dans le but de mieux correspondre avec les valeurs de CDV. Lorsque
        cela arrive, un email vous informant des dernières modifications vous est envoyé. De plus, chacun peut proposer
        des possibilités d'évolution (formulation, exemples, points manquants...).
      </p>

      <SubTitle>1. En tant que lecteur</SubTitle>

      <Rule>
        1.1. Je suis invité à lire les réactions des autres utilisateurs de CDV, en bonne intélligence.
      </Rule>

      <Note>
        Les utilisateurs de CDV ont des choses à dire, et vous serez sans doute intéressé de les lire. Pour bien
        comprendre l'auteur d'une réaction, il est important de commencer par mettre de côté ses préjugés et apprioris
        sur le sujet, dans le but d'éviter de comprendre une version biaisée du message. Il faut donc *suspendre son
        jugement* le temps de la lecture. Chacun a sa vision du monde, les mots utilisés ont peut-être un sens
        légèrement différents pour vous et pour l'auteur. Jouez le jeu, et tentez de comprendre le fond du message qu'il
        a voulu transmettre en rédigant la réaction.
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
        En cliquant sur les liens des sources, il vous est possible de vérifier tous les propos d'une réaction factuelle
        (si celle-ci respecte la charte). Une affirmation extraordinaire demande des preuves plus qu'ordinaires,
        dis-t-on. C'est à vous, lecteurs, de vérifier que les informations qui sont avancées sont bien valides grâce aux
        sources apportées. Surtout si vous êtes prêt à remettre en question les informations sourcées.
      </Note>

      <Rule>1.4. J'estime à quelle point je pense que la réaction est vraie et apporte du sens à mon jugement.</Rule>

      <Note>
        Une fois le message compris et vérifié, vous pouvez vous forger votre propre opinion. En accordant une dose
        raisonable de rigeure à la méthode avec laquelle vous raisonnez par rapport aux information apportées par une
        réaction, vous êtes en mesure d'estimer le poids que vous accordez au message. Attention cependant, à faire la
        différence entre une information factuelle (éventuellement sourcée), et une opinion. Un fait peut vous faire
        changer d'avis sur un sujet si vous ne parvenez pas à l'infirmer, ou si les sources sont solides. En revanche,
        une opinion est subjective et personelle, et ne peut être vérifiée. Mais peut-être qu'un point de vue différent
        sur un sujet peut vous amener à réfléchir d'une façon que vous n'auriez pas concidéré.
      </Note>

      <Rule>1.5. Je signale une réaction qui ne respecte pas cette charte.</Rule>

      <Note>
        Il peut arriver qu'une réaction ne respecte pas cette charte. Il vous est dans ce cas possibles de la signaler,
        ou pas. Si vous pensez que l'auteur du message a involontairement commis une erreur, vous pouvez lui répondre
        directement, pas besoin de la signaler. Dans le cas contraire, vous êtes encouragé à la signaler. Cela alertera
        les modérateurs, qui pourront entreprendre une action en fonction de la situation. A vous de faire
        preuve de bienveillance pour savoir comment agir.
      </Note>

      <SubTitle>2. En tant que rédacteur</SubTitle>

      <Rule>2.1. Je formule mon message de manière claire et en allant droit au but.</Rule>

      <Note>
        Vous avez votre mot à dire ! Et c'est très bien, CDV est fait pour ça. Votre message doit cependant être
        pertinent par rapport à l'information, ou bien par rapport à la réaction à laquelle il répond. Dans le but
        d'être bien compris par les autres utilisateurs, commencez par cerner votre propos, pour être en mesure
        de l'expliquer de manière simple et ordonée. Pour pouvoir s'y retrouver, il vaut mieux éviter de traiter d'un
        sujet qui est déjà disscuté dans un autre fil de réactions. Pensez à lire avant de poster !
      </Note>

      <Rule>2.2. Je différencie une réaction factuelle d'une réaction d'opinion.</Rule>

      <Note>
        Votre message peut énnoncer un ou plusieurs faits, objectifs, ou bien faire part d'une opinion, subjective et
        sujette à interprêtation. Il est important de faire la distinction entre ces deux types de messages et sourtout
        d'éviter de faire passer votre opinion pour un fait. Il vous est possible de donner un fait, puis d'y apporter
        votre opinion, si ces deux parties sont explicitées.
      </Note>

      <Rule>2.3. J'apporte les sources nécéssaires pour vérifier les faits énoncés.</Rule>

      <Note>
        Dans le cas ou votre réaction est factuelle, il est nécessaire d'y apporter les sources permettant de vérifier
        que les fais que vous énoncés sont exacts. Si disponible, donnez un lien vers la source que vous citez, ou à
        défaut, un moyen permettant d'y accéder. Privilégiez les sources accessibles publiquement, pour qu'un maximum
        d'utilisateurs puissent les consulter.
      </Note>

      <Rule>2.4. Je répond aux réactions des autres utilisateurs avec respect et courtoisie.</Rule>

      <Note>
        Il vous est possible d'écrire un commentaire en réponse à un autre, pour y apporter de nouveaux éléments, donner
        votre point de vue, poser une question, ou encore apporter une source. Toutefois, si vous n'êtes pas d'accord
        avec une partie ou tout le message auquel vous répondez, il est important d'expliquer clairement les points que
        vous remettez en question. Si cela vous sempble pertinent, il vous est possible de citer la partie du message
        concernée.
      </Note>

      <Rule>2.5. Je peux éditer une réaction à condition que le sens original du message ne change pas.</Rule>

      <Note>
        Il arrive de vouloir éditer un message pour en modifier la forme, par exemple pour corriger une faute
        d'orthographe ou bien changer une formulation pour que le propos soit mieux compris. En revanche, si votre
        réflexion évolue par rapport à votre réaction initiale, n'éditez pas votre message, mais postez-en un nouveau,
        expliquant leurs différences. Votre opinion première continue d'avoir du sens pour d'autres utilisateurs. Il est
        nécéssaire de conserver le sens original des conversations pour comprendre l'évolution des échanges.
      </Note>

    </div>
  );
};

export default Rules;
