/* eslint-disable max-lines, react/no-unescaped-entities */

import React from 'react';

import Title from './components/Title';
import SubTitle from './components/SubTitle';
import Note from './components/Note';

/*

- 1. En tant que lecteur
  - 1.1. Je suis invité à lire les réactions des autres utilisateurs, en bonne intélligence.
  - 1.2. Je comprends et j'interprète le message avec recul et méthode.
  - 1.3. Je vérifie les sources.
  - 1.4. J'estime à quelle point je pense que la réaction est vraie et apporte du sens à mon opinion.
  - 1.5. Je signale une réaction qui ne respecte pas cette charte.

- 2. En tant que rédacteur
  - 2.1. Je formule mon message de manière claire et en allant droit au but.
  - 2.2. Je différencie une réaction factuelle d'une réaction d'opinion.
  - 2.3. J'apporte les sources nécessaires pour vérifier les faits énoncés.
  - 2.4. Je répond aux réactions des autres utilisateurs avec respect et courtoisie.
  - 2.5. Je peux éditer une réaction à condition que le sens original du message ne change pas.

*/

const Rule: React.FC = ({ children }) => (
  <h4 style={{ fontSize: '1.2rem', margin: 10, marginLeft: 50 }}><em>{ children }</em></h4>
);

const Rules: React.FC = () => {
  return (
    <>

      <Title id="charte">La charte de Réagir à l'information</Title>

      <SubTitle id="introduction">Introduction</SubTitle>

      <p>
        La charte présente une liste de règles qu'il est important de lire et de comprendre dans le but de donner un
        cadre aux discussions présentes sur Réagir à l'information. Ces règles sont simples, et présentées de manière à
        ce qu'elles soient comprises au mieux par l'ensemble des utilisateurs. Réservez une dizaine de minutes à leur
        lecture.
      </p>

      <p>
        Contrairement à des conditions générales d'utilisation, la charte n'établit pas de règles juridiques. Selon les
        situations, certaines règles peuvent avoir plus de sens que d'autres. C'est donc à vous de comprendre, du mieux
        possible, l'état d'esprit induit par la charte, en faisant preuve de bon sens.
      </p>

      <p>
        Dans un but d'amélioration continue, ces règles évoluent ! De temps en temps, il est possible que certaines
        règles de la charte soient mises à jour, dans le but de mieux correspondre avec les valeurs de la communauté.
        Lorsque cela arrive, un e-mail vous informant des dernières modifications vous est envoyé. De plus, chacun peut
        proposer des possibilités d'évolution (formulation, exemples, points manquants...).
      </p>

      <SubTitle id="1 En tant que lecteur">1. En tant que lecteur</SubTitle>

      <Rule>
        1.1. Je suis invité à lire les réactions des autres utilisateurs, en bonne intelligence
      </Rule>

      <Note>
        Chacun à son mot à dire, et vous serez sans doute intéressé de lire ce que les internautes pensent de
        l'information. Pour bien comprendre l'auteur d'une réaction, il est important de commencer par mettre de côté
        ses préjugés et a priori sur le sujet, dans le but d'éviter de comprendre une version biaisée du message. Il
        faut donc <em>suspendre son jugement</em> le temps de la lecture. Chacun a sa vision du monde, les mots utilisés
        ont peut-être un sens légèrement différent pour vous et pour l'auteur. Jouez le jeu, et tentez de comprendre le
        fond du message qu'il a voulu transmettre.
      </Note>

      <Rule>1.2. Je comprends et j'interprète le message avec recul et méthode</Rule>

      <Note>
        Après avoir lu une réaction en entier, vous vous posez peut-être des questions. Voire, vous n'êtes pas d'accord
        avec les faits ou arguments présentés. Tentez, du mieux possible, de comprendre les mots de l'auteur, dans le
        sens qu'il a voulu leur donner. À vous de réfléchir pour comprendre son point de vue, de manière neutre et
        objective, surtout si vous n'êtes pas d'accord avec le message. Il est normal que vous vous fassiez un avis
        lorsque vous lisez une réaction, mais il faut veiller cependant à éviter, autant que possible, que cela
        n'affecte votre compréhension des informations concernées.
      </Note>

      <Rule>1.3. Je vérifie les sources</Rule>

      <Note>
        En cliquant sur les liens des sources, il vous est possible de vérifier tous les propos d'une réaction
        factuelle. Une affirmation extraordinaire demande des preuves plus qu'ordinaires, dit-on. C'est aussi à vous,
        lecteurs, de vérifier que les informations qui sont avancées sont bien valides grâce aux sources apportées.
        Surtout si vous êtes prêt à remettre en question les informations sourcées.
      </Note>

      <Rule>1.4. J'estime à quel point je pense que la réaction est vraie et apporte du sens à mon opinion</Rule>

      <Note>
        Une fois le message compris et vérifié, vous pouvez vous forger votre propre opinion. Avec une dose raisonnable
        d'esprit critique, vous êtes en mesure d'estimer le poids que vous accordez au message. Attention cependant, à
        faire la différence entre une information factuelle (éventuellement sourcée), et une opinion. Un fait peut vous
        faire changer d'avis tant que vous n'êtes pas en mesure de l'infirmer, et si les sources sont solides. En
        revanche, une opinion est subjective et personnelle, et ne peut être vérifiée. Mais peut-être qu'un point de vue
        différent sur un sujet peut vous amener à réfléchir d'une façon que vous n'auriez pas considérée.
      </Note>

      <Rule>1.5. Je signale une réaction qui ne respecte pas cette charte</Rule>

      <Note>
        Il peut arriver qu'une réaction ne respecte pas la charte. Il vous est dans ce cas possible de la signaler,
        ou pas. Si vous pensez que l'auteur du message a involontairement commis une erreur, vous pouvez lui répondre
        directement. Dans le cas contraire, vous êtes encouragé à la signaler. Cela alertera les modérateurs, qui
        pourront entreprendre une action en fonction de la situation. À vous de faire preuve de bienveillance pour
        savoir comment agir.
      </Note>

      <SubTitle id="2 En tant que rédacteur">2. En tant que rédacteur</SubTitle>

      <Rule>2.1. Je formule mon message de manière claire et rigoureuse</Rule>

      <Note>
        Vous avez votre mot à dire ! Mais pour être sûr(e) que votre message soit correctement interprété par le reste
        de la communauté, il doit être précis dans les arguments qu'il avance, sans laisser la place au doute. Prenez le
        temps de le structurer si nécessaire, cela rendra votre propos plus clair s'il est complexe. Enfin, votre
        message doit avoir un sens par rapport au sujet auquel il s'adresse, ou à la réaction à laquelle il répond.
      </Note>

      <Rule>2.2. Je différencie une réaction factuelle d'une réaction d'opinion</Rule>

      <Note>
        Votre message peut énoncer un ou plusieurs faits, objectifs, ou bien faire part d'une opinion, subjective et
        personnelle. Il est important de faire la distinction entre ces deux types de messages et surtout d'éviter de
        faire passer vos opinions ou vos croyances pour des faits vérifiés. Volontairement ou non, d'ailleurs. Bien sûr,
        il vous est possible d'énoncer un fait puis d'y apporter votre opinion, si ces deux parties sont clairement
        explicitées.
      </Note>

      <Rule>2.3. J'apporte les sources nécessaires pour vérifier les faits énoncés</Rule>

      <Note>
        Dans le cas où votre réaction est factuelle, il est nécessaire d'y apporter les sources permettant de vérifier
        d'où viennent les faits que vous apportez. Si disponible, donnez un lien vers la ou les source(s) que vous
        citez, ou à défaut, un moyen permettant d'y accéder (la page d'un livre par exemple). Privilégiez les sources
        accessibles publiquement, pour qu'un maximum d'utilisateurs puissent les consulter.
      </Note>

      <Rule>2.4. Je réponds aux réactions des autres utilisateurs avec respect et courtoisie</Rule>

      <Note>
        Il vous est possible d'écrire un commentaire en réponse à un autre. Toutefois, si vous n'êtes pas d'accord avec
        une partie ou même l'intégralité du message auquel vous répondez, il est important d'expliquer clairement les
        points que vous remettez en question. Dans tous les cas, veillez à garder un ton calme et respectueux, car la
        colère et l'énervement ne feront qu'entraver votre crédibilité.
      </Note>

      <Rule>2.5. Je peux éditer une réaction à condition que le sens original du message ne change pas</Rule>

      <Note>
        Il arrive de vouloir éditer un message pour en modifier la forme, pour corriger une faute d'orthographe par
        exemple, ou bien reformuler pour que le propos soit mieux compris. En revanche, si votre réflexion évolue sur le
        fond, alors n'éditez pas votre message. Postez-en plutôt un nouveau, expliquant votre nouvelle pensée. Il est
        nécessaire de conserver le sens original des conversations pour comprendre l'évolution des échanges.
      </Note>

    </>
  );
};

export default Rules;
