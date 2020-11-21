import React from 'react';
import ReactDOM from 'react-dom';

import logo from '../images/logo.png';
import image from './image.png';

import 'fontsource-noticia-text/latin-400.css';
import 'fontsource-noticia-text/latin-700.css';

import 'fontsource-montserrat/latin-400.css';
import 'fontsource-montserrat/latin-600.css';

import './HowToBeta.scss'

const Header: React.FC = () => (
  <div className="header">
    <img src={logo} className="logo" />

    <div className="title-container">
      <div className="title">Zétécom</div>
      <div className="beta">BÊTA</div>
    </div>

    <div className="subtitle-container">
      <div className="subtitle subtitle-top">L'information</div>
      <div className="subtitle">avec esprit critique</div>
    </div>

    <h1 className="beta-title">
      Test de la plateforme
    </h1>
  </div>
);

const HowToBeta: React.FC = () => (
  <div className="page">

    <Header />

    <h2>I - Introduction</h2>

    <p>
      Internet, c'est génial. Mais internet, ça vient aussi avec pas mal de problèmes, surtout en matière d'information.
      Fake news, bulles de filtres, publicité déguisée, place de l'opinion dans les débats scientifiques, théories du complot, etc. Ce ne sont pas les exemples qui manquent.
    </p>

    <p>
      Comment améliorer notre rapport à l'information ?
    </p>

    <p>
      Une piste accessible à tous est simplement d'en parler, d'expliquer d'une part ce que l'on pense et les raisons pour lesquelles on pense cela, et de comprendre d'autre part les raisons pour lesquelles certain.e.s ont un avis différent.
      Si nous sommes en plus capables de raisonner avec méthode, alors les échanges seront d'autant plus pertinents et nos opinions se baseront sur des fondations solides.
    </p>

    <p>
      Zétécom, c'est une initiative qui a pour but de favoriser ce type de discussions sur internet, en proposant des espaces d'échanges cadrés par une charte.
      Le projet est né il y a peu de temps, nous cherchons donc des personnes motivées pour participer à son lancement via une phase "bêta".
      Cela nous permettra de mieux comprendre les besoins et attentes des consommateurs de l'information, pour leur permettre de tirer un maximum de bénéfices de la plateforme.
    </p>

    <h3>Plus précisément, c'est quoi Zétécom ?</h3>

    <p>
      Zétécom, c'est un site web qui permet à ses utilisateurs de discuter de l'informations présente sur internet, via des zones de commentaires.
      Que ce soit en réaction à un article de journal, une page de blog, une vidéo YouTube ou un autre média, l'objectif est de permettre à tous de commenter n'importe quel contenu sur la toile.
    </p>

    <img src={image} style={{ float: 'right', width: 260, margin: 12, marginBottom: 0 }} />

    <p>
      Un point central du projet est <a href="https://zetecom.fr/charte.html">sa charte</a>, un ensemble de quelques règles simples construites dans le but d'apporter un cadre bienveillant et collaboratifs aux échanges.
      Elle demande par exemple de rester objectif
      face aux faits, d'apporter des sources lorsque c'est nécessaire,
      d'appliquer un curseur de vraissemblances à ses propres croyances, ou encore de faire preuve de charité interprêtative.
    </p>

    <p>
      Les zones de commentaires apportent également d'autres avantages : il est par exemple possible de rechercher parmi les messages, de les trier par pertinence, de rédiger avec une mise en forme simple ou encore de pouvoir consulter l'historique des éditions d'un commentaire.
      Le projet apporte aussi la possibilité d'ouvrir une discussion là ou ce n'est pas possible, ou lorsque la zone de commentaires originale est fermée.
    </p>

    <p>
      Mais bien souvent, les utilisateurs ont <em>la flemme</em> de chercher la zone de commentaires associée à l'information qu'ils viennent de consulter.
      Pour leur faciliter la vie, une extension chrome / firefox permet d'intégrer ces commentaires directement sur la page où se trouve l'information.
      Par exemple, elle ajoute deux onglets sous les vidéos YouTube, permettant de switcher entre les commentaires YouTube et Zétécom.
    </p>

    <div style={{ clear: 'both' }} />

    <h2>II - Test de la plateforme</h2>

    <p>
      Pour le moment, il n'y a pas encore de communauté active qui fait vivre le projet.
       Nous cherchons à rencontrer des personnes motivées, prêtes à consacrer un peu de leur temps pour réfléchir à ce que l'on peut construire ensemble.
    </p>

    <p>
      L'objectif de cette phase bêta est de mettre la plateforme à l'épreuve d'une utilisation réelle, et de commencer à alimenter les zones de commentaires avant de communiquer à plus large échelle.
      Une participation n'est attendue que ce celles et ceux qui sont intéressés par cette initiative, et qui souhaitent faire grandir le projet en rejoignant les premiers membres.
    </p>

    <p>Le test lui-même se déroule en plusieurs étapes : découverte libre, test de chaque fonctionnalité et test de l'extension.</p>

    <p>Quelques remarques / conseils avant de commencer :</p>

    <ul>
      <li>Toutes les questions / étapes de ce test sont facultatives, ne vous sentez pas obligé.e de répondre à tout.</li>
      <li>Prenez le temps de lire le site <a href="zetecom.fr">https://zetecom.fr</a>, qui donne plus de détails sur le projet, son utilisation et ses motivations.</li>
      <li>Notez les comportements étranges et les potentiels bugs : vous avez fait l'action A, vous vous attendiez à B, et il s'est passé C.</li>
      <li>N'hésitez pas à donner des exemples pour illustrer vos retours, ça nous aidera à mieux comprendre votre intention.</li>
      <li>Choisissez à quel point vous voulez et vous pouvez vous investir, ça peut aller de regarder rapidement et écrire quelques mots à devenir ambassadeur du projet sur le plus long terme.</li>
    </ul>

    <p>
      Nous savons d'ors et déjà que certaines choses ne sont pas très jolies, peu ergonomiques voire qui ne sont pas tout à fait fonctionnelles.
      Nous nous attendons à ce que ces points soient remontés, n'ayez donc aucune crainte à donner vos impressions en toute transparence.
      Encore une fois, le but de ce test est avant tout de mettre la platforme à l'épreuve pour en sortir des axes d'amélioration.
    </p>

    <h3>Staging vs production</h3>

    <p>
      Pour tester les nouvelles fonctionnalités avant de les rendre disponibles dans le produit, il existe une copie de la plateforme que nous appellons la version "staging" (équivalent d'une version "bêta", "sandbox" ou encore "pre-release").
      Cet environnement vous permet de faire des tests sans altérer version "officielle" (que nous apelleons l'environnement de "production").
    </p>

    <p>
      Notez que quelques différences existent entre ces deux versions (ou environnements, c'est pareil). Sur la staging :
    </p>

    <ul>
      <li>Il n'est pas nécessaire de respecter la charte</li>
      <li>Aucun e-mail n'est envoyé (pas de validation d'adresse e-mail par exemple)</li>
      <li>Vous pouvez installer les deux extensions simultanément, mais n'en gardez qu'une seule d'activée</li>
      <li>Les commentaires sur la vidéo "Sciences, Média &amp; Foutaises" de la Tronche en Biais ne viennent pas d'utilisateurs réels (ils sont copiés de YouTube pour mieux se rendre compte de ce à quoi ressemble une zone de commentaires avec du contenu)</li>
    </ul>

    <p>
      En plus de tester sur la version staging, vous êtes vivement encouragés à utiliser la version de production pour ouvrir de nouvelles zones de commentaires et y amorcer des discussions passionnantes !
    </p>

    {/* <div className="page-break" /> */}

    <h3>Liens vers la plateforme</h3>

    <div className="links">
      <div className="links-production">
        <div className="env">Production</div>
        <p>
          L'app : <a href="app.zetecom.fr">https://app.zetecom.fr</a><br />
          Extension Chrome : <a href="https://chrome.google.com/webstore/detail/pnppgdnmhjaoafcadennndpcdoglilcn">Zétécom</a><br />
          Extension Firefox : <a href="https://addons.mozilla.org/fr/firefox/addon/z%C3%A9t%C3%A9com/">Zétécom</a><br />
        </p>
      </div>
      <div style={{ width: 24 }} />
      <div className="links-staging">
        <div className="env">Staging</div>
        <p>
          L'app staging : <a href="app-staging.zetecom.fr">https://app-staging.zetecom.fr</a><br />
          Extension Chrome : <a href="https://chrome.google.com/webstore/detail/edambkfkaecimgjffpkahneidcddclbn">Zétécom (staging)</a><br />
          Extension Firefox : <a href="https://staging.zetecom.fr/extension/zetecom-extension-staging-0.6.2.xpi">Zétécom (staging)</a><br />
        </p>
      </div>
    </div>

    <h3>1. Découverte libre</h3>

    <p>
      Accédez à l'app à l'adresse <a href="app-staging.zetecom.fr">https://app-staging.zetecom.fr</a>, et naviguez à votre guise !
    </p>

    <p>
      Fouillez un peu partout, explorez, créez un compte, commentez, et prenez notes de vos premières impressions.
      Peut-être que vous trouverez l'interface agréable, que telle partie fait "un peu vide", qu'un bout de texte ne vous semble pas utile ou devrait ressortir plus, que la mise en page est trop dense, ou pas assez, que vous arrivez à naviguer facilement, qu'une formulation gagnerait à être retravaillée, etc., et notez tout ça quelque part.
    </p>

    <h3>2. Tests en profondeur</h3>

    <p>
      Une fois que vous avez à peu près fait le tour de l'app, repassons plus en détail et de manière exhaustive sur chaque fonctionnalité, sans oublier de noter les points qui méritent d'être discutés.
      Nous ne rentrons volontairement pas trop dans les détails sur comment faire, dans le but de vous laisser chercher (mais si vous cherchez trop, il y a certainement un problème...).
      Si vous souhaitez aussi tester les fonctionnalités de modération, n'hésitez pas à nous demander les autorisations.
    </p>

    <p>
      Sur Zétécom, il est possible de :
    </p>

    <div className="features">

      <div className="features-presignup">
        <em>Sans être inscrit au préalable</em>
        <ul>
          <li>Voir les zones de commentaires ouvertes</li>
          <li>Rechercher parmi les zones de commentaires</li>
          <li>Lire les commentaires et les réponses</li>
          <li>Rechercher parmi les commentaires</li>
          <li>Trier les commentaires par date ou par pertinence</li>
          <li>S'inscrire</li>
        </ul>
      </div>

      <div className="features-postsignup">
        <em>Après inscription</em>
        <ul>
          <li>Se connecter et se déconnecter</li>
          <li>Rédiger, mettre en forme et éditer un commentaire</li>
          <li>Annoter un commentaire d'une réaction</li>
          <li>Voir l'historique des éditions d'un commentaire</li>
          <li>Voir la liste de ses propres commentaires</li>
          <li>S'abonner à un commentaire</li>
          <li>Signaler un commentaire</li>
        </ul>
      </div>

    </div>

    <h3>3. Test de l'extension</h3>

    <p>
      Le but de cette dernière étape est de tester l'extension staging, pour vérifier qu'elle affiche correctement les zones de commentaires sur les pages d'autres sites web.
      Après installation, accédez à une page sur laquelle une zone de commentaires est ouverte, vous devriez la trouver quelque part sur la page.
      Si tout se passe bien, l'icône de l'extension devrait afficher un badge vert pour indiquer sa présence.
    </p>

    <p>
      Rendez-vous ensuite sur une vidéo YouTube ou un article du Monde où la zone de commentaires n'est pas encore ouverte, et demandez son ouverture.
      Et enfin, vérifiez que vous pouvez vous connecter / déconnecter via l'extension, en cliquant sur son icône en haut à droite de votre navigateur.
      Pour rappel, l'extension staging n'envoit pas d'e-mail, vous ne pouvez donc pas changer votre mot de passe.
    </p>

    <p>
      Comme pour le reste, notez vos impressions et vos remarques concernant l'utilisation de l'extension.
    </p>

    <h2>III - Retours</h2>

    <h3>Impression générale</h3>

    <p>
      Vous devriez maintenant avoir une bonne vision de ce que propose Zétécom.
      Prenez un moment pour réfléchir à ce que vous avez compris de la plateforme, ce qui vous plaît, ce qui vous plairait encore plus, les points à améliorer, les challenges qu'il faudra relever, etc.
    </p>

    <p>
      Mais ne vous limitez pas seulement à la plateforme elle-même, vous aurez peut-être des remarques concernant :
    </p>

    <ul>
      <li><em>le projet</em> de manière générale, le contexte dans lequel il se place et les solutions qu'il apporte</li>
      <li><em>le site web</em>, la façon dont il présente le projet, le ton et les formulations utilisés, mais aussi sa forme, son apparence</li>
      <li><em>la charte</em>, la pertinence et la formulation des règles</li>
    </ul>

    <h3>Questions spécifiques</h3>

    <p>
      En plus de vos retours libres, voici quelques points sur lesquels il y a matière à réfléchir.
    </p>

    <p>
      1. Il est possible d'annoter les commentaires d'une réaction : "je suis d'accord", "je ne suis pas d'accord" ou "je n'ai pas d'avis tranché".
      Peut-on trouver plus pertinent ?
    </p>

    <p>
      2. L'ouverture d'une nouvelle zone de commentaires est soumise à validation par un modérateur.
      Est-ce vraiment nécessaire ?
    </p>

    <p>
      3. Pour le moment, chaque zone de commentaires est liée à un article ou une vidéo sur internet.
      Serait-il intéressant de laisser la possibilité d'ouvrir un sujet de discussion non rattaché à une page spécifique ?
    </p>

    <p>
      4. Les commentaires sont organisés sous forme de thread, ce qui apporte la possibilité de répondre de manière imbriquées.
      L'expérience serait-elle meilleure avec une architecture différente ?
    </p>

    <p>
      5. Lorsqu'un message est signalé, les modérateurs sont en mesure d'effectuer plusieurs actions : ne rien faire, contacter l'auteur du commentaire signalé ou supprimer le commentaire.
      D'autres actions permettraient-elles une modération plus efficace ?
    </p>

    <p>
      6. Les notifications permettent d'alerter les utilisateurs lorsqu'un évenement se produit, mais pour l'instant, seulement les réponses aux messages auxquels l'utilisateur s'est abonné déclenchent une notification.
      Y a-t-il d'autres évenements qui mériteraient de notifier l'utilisateur ?
    </p>

    <p>
      7. Selon vous, l'extension répond-elle à un réel besoin ?
    </p>

    <p>
      8. Quelles autres fonctionnalités permettraient de mieux répondre aux problèmatiques liées à notre consomation de l'information ?
    </p>

    <p>
      9. Seriez-vous intéressé.e pour utiliser la plateforme s'il y avait déjà une communauté active ?
    </p>

    <p>
      10. Qu'avez vous pensé de ce test de plateforme ? Peut-on l'améliorer ?
    </p>

    {/* <h2>IV - Informations complémentaires</h2> */}

    <h3>Critères de réussite</h3>

    <p>
      Cette phase de bêta durera jusqu'au 31 janvier 2021. A cette date, notre objectif est d'avoir comptabilitsé un minimum de 50 inscriptions sur la plateforme (en production), et collecté des retours ayant aboutis à de futurs actions d'au moins 25 personnes.
    </p>

    <h3>Contacts</h3>

    <p>
      Vous pouvez envoyer vos retours par e-mail, à l'adresse <a href="mailto:contact@zetecom.fr">contact@zetecom.fr</a>, et si vous souhaitez échanger en direct, entre bêta-testeurs et avec nous, un groupe discord est là pour ça : <a href="https://discord.com/huwfqra">https://discord.com/huwfqra</a>.
    </p>

    <p>
      D'ailleurs, qui sont les personnes qui mettent en place Zétécom ?
      Nous sommes deux : Nils, 27 ans, développeur web et à l'initiative du projet, et Violaine, 28 ans, développeuse web également. Nous habitons ensemble à Aix-en-Provence.
    </p>

    <h3>Merci !</h3>

    <p>
      Un grand merci à vous qui choisissez de nous prêter main forte dans cette aventure.
      Nous espérons de tout cœur que nos efforts porterons leurs fruits, et que Zétécom vous permettra de mettre en perspective ce que disent les médias !
    </p>

  </div>
);

ReactDOM.render(<HowToBeta />, document.getElementById('app'));
