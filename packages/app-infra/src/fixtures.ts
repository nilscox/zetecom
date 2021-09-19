/* eslint-disable max-lines, max-len */
/* cSpell:disable */

import {
  commentAndReplies,
  createAuthenticatedUser,
  createComment,
  createCommentsArea,
  createInformation,
  createReactionsCount,
  createUser,
  ReactionType,
} from '@zetecom/app-core';

const date = (format: string): Date => {
  const year = Number(format.slice(0, 4));
  const month = Number(format.slice(5, 7));
  const day = Number(format.slice(8, 10));

  const hours = Number(format.slice(11, 13));
  const minutes = Number(format.slice(14, 16));

  return new Date(year, month - 1, day, hours, minutes);
};

export const dougForcett = createAuthenticatedUser({
  id: 'fixture-glguxr',
  nick: 'Doug Forcett',
  avatar: 'https://app.zetecom.fr/avatars/Doug%20Forcett-1611515421273.png',
  email: 'doug@forcett.com',
});

export const bopzor = createAuthenticatedUser({
  id: 'fixture-thf2gg',
  nick: 'bopzor',
  avatar: 'https://app.zetecom.fr/avatars/bopzor-1611512533782.png',
  email: 'bopzor@bopzor.me',
});

export const nilscox = createAuthenticatedUser({
  id: 'fixture-gvvl03',
  nick: 'nilscox',
  avatar: 'https://app.zetecom.fr/avatars/nilscox-1604955445585.png',
  email: 'nils@nils.cx',
});

export const tominou = createUser({
  id: 'fixture-04qziu',
  nick: 'Tominou',
  avatar: 'https://www.artmajeur.com/medias/standard/l/a/laff/artwork/11473223_img-20180909-194213.jpg',
});

export const jeanette = createUser({
  id: 'fixture-nlb2tx',
  nick: 'Jeanette',
  avatar: 'https://cdn.pixabay.com/photo/2014/12/22/00/07/tree-576847__480.png',
});

export const raspout = createUser({
  id: 'fixture-0jmjs7',
  nick: "Raspout'",
  avatar: 'http://public.nils.cx/~nils/raspout.jpg',
});

export const meliMelo = createUser({
  id: 'fixture-k64rm3',
  nick: 'Méli Mélo',
  avatar: 'https://www.pinclipart.com/picdir/big/550-5506141_free-free-penguin-clipart-download-free-clip-art.png',
});

export const kyleGass = createUser({
  id: 'fixture-0ib9ag',
  nick: 'KyleGass',
  avatar:
    'https://musicimage.xboxlive.com/catalog/video.contributor.25721e00-0200-11db-89ca-0019b92a3933/image?locale=fr-fr&target=circle',
});

export const critikal = createUser({
  id: 'fixture-01egep',
  nick: 'Cri tikal',
  avatar: 'https://img.20mn.fr/XMlCxb3dQj25OgQh6AJB4A/768x492_-44x23_agrandissement-billet-dollar-americain.jpg',
});

export const anonymous0896 = createUser({
  id: 'fixture-aq4yaa',
  nick: 'anonymous0896',
});

const jarod22 = createUser({
  nick: 'jarod22',
  avatar: 'https://images.clipartlogo.com/static/images/categories/cartoon2.jpg',
});

const jeanmichel = createUser({
  nick: 'Jeanmichel',
  avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Dog_head.jpg',
});

const paco = createUser({
  nick: 'paco',
  avatar: 'https://www.kindpng.com/picc/m/69-694698_cartoon-mushroom-clipart-library-clip-art-mushroom-hd.png',
});

const mrBlueSky = createUser({
  nick: 'mr blue sky',
  avatar: 'https://images-na.ssl-images-amazon.com/images/I/71F4UcsOjOL._SL1500_.jpg',
});

const quake = createUser({
  nick: 'Quake',
});

const oscarBelka = createUser({
  nick: 'Oscar Belka',
});

export const radioactivitéCovid = createCommentsArea({
  id: 'fixture-m6i1yu',
  information: createInformation({
    id: 'fixture-jq8l1l',
    title: 'La COVID diminue la radioactivité',
    url: 'https://www.lemonde.fr/blog/huet/2021/10/14/la-covid-diminue-la-radioactivite',
    author: 'Sylvestre Huet',
    media: 'lemonde',
    publicationDate: date('2021-08-14'),
  }),
  comments: [
    createComment({
      id: 'fixture-m2k4rc',
      author: critikal,
      text: "Sur la figure 2, il y a des bandes et une ligne, mais aucune légende n'est donnée. Savez-vous à quoi correspondent ces valeurs ?",
      date: date('2021-08-14 17:58'),
      replies: [
        createComment({
          id: 'fixture-0gcf8i',
          author: meliMelo,
          text: "En effet la légende n'est pas donnée, mais il semble évident que les bandes représentent le nombres de personnes (effectifs suivi), et la ligne représente la dose collective reçue par les travailleurs chaque année, en homme-Sievert.",
          date: date('2021-08-14 19:16'),
          reactionsCount: createReactionsCount({ like: 1 }),
        }),
      ],
    }),
    createComment({
      id: 'fixture-p127d4',
      author: jeanette,
      text: '> Et ensuite la réduction des opérations de maintenance dans les industries nucléaires et notamment dans les centrales d’EDF pour faire face à la pandémie.\n\nHeu... il y a que moi que ça choque cette phrase ?',
      date: date('2021-08-15 09:23'),
      reactionsCount: createReactionsCount({ like: 1, approve: 3, dontUnderstand: 1 }),
      replies: [
        createComment({
          id: 'fixture-5zysxs',
          author: raspout,
          text: 'Clairement, si les personnes qui sont censées maintenir les centrales nucléaires sont restées confinées, ça fait un peu peur...',
          date: date('2021-08-15 17:00'),
        }),
        createComment({
          id: 'fixture-wu42db',
          author: jeanette,
          text: "Selon [cette source](https://kedge.edu/l-ecole/presse/communiques-de-presse/covid-19-entre-danger-et-ille-galite-edf-sous-traite-80-de-la-maintenance-de-ses-centrales), EDF sous-traite 80% de la maintenance de ses centrales nucléaires, et ils n'avait pas prévu de faire face à un confinement qui les obligerait à baisser les opérations de maintenance. Et en plus, c'est illégal selon cet article de sous traiter 80% de la maintenance du parc nucléaire français à autant d’intérimaires embauchés par des sous-traitants.",
          date: date('2021-08-15 17:28'),
          reactionsCount: createReactionsCount({ approve: 2, disagree: 1 }),
          replies: [
            createComment({
              id: 'fixture-w0hb86',
              author: kyleGass,
              text: "J'aimerais juste apporter un peu de nuance par rapport à cet article, sur deux points principalement.\n\nPremièrement, je trouve que ce n'est pas clairement explicité si on parle de l'activité globale d'EDF, de l'activité en terme de maintenance ou de la maintenance des centrales nucléaires. L'impact n'est pas le même selon de quoi on parle, c'est une différence importante.\nEt deuxièmement, il est dit à propose de l'auteur de l'article, Olivier SORIA, qu'il est intervenant dans de nombreuses conférences internationales et qu'il a écrit de nombreux livres, mais ça ne donne pas vraiment d'information sur à sa légitimité à parler des dangers liés à la gestion du covid par EDF. Je ne dis pas que ce qu'il dit est faux, mais juste qu'il peut y avoir un intérêt caché si son but est de descendre EDF...",
              date: date('2021-08-16 04:32'),
              reactionsCount: createReactionsCount({ like: 2, approve: 1, think: 2, disagree: 1 }),
              replies: [
                createComment({
                  id: 'fixture-3zfjb8',
                  author: nilscox,
                  date: date('2021-08-16 10:11'),
                  text: "> Je ne dis pas que ce qu'il dit est faux, mais juste qu'il peut y avoir un intérêt caché si son but est de descendre EDF...\n\nAttention au procès d'intention tout de même.",
                  reactionsCount: createReactionsCount({ approve: 2, dontUnderstand: 1 }),
                }),
              ],
            }),
            createComment({
              id: 'fixture-qcxyqb',
              author: tominou,
              text: "Sur le site de la Revue Générale du Nucléaire, on trouve [cet article](https://www.sfen.org/rgn/covid-19-production-electricite-maintenance-service-public-assure-france), beaucoup moins alarmiste que celui que tu cites. Il n'y est pas fait mention de sous-traitance, et la question de la maintenance des centrales n'a pas l'air préoccupant, bien que l'organisation des effectifs ait été adapté pour faire face à la crise.",
              date: date('2021-08-30 14:29'),
              reactionsCount: createReactionsCount({ like: 3, disagree: 1 }),
            }),
          ],
        }),
      ],
    }),
    createComment({
      id: 'fixture-ria644',
      author: kyleGass,
      text: "Je n'arrive pas bien à lire les images, elles sont toute petites et toutes pixelisées. Est-ce que quelqu'un sait comment les agrandir ?",
      date: date('2021-08-21 16:16'),
      reactionsCount: createReactionsCount({ approve: 2 }),
      replies: [
        createComment({
          id: 'fixture-xqeetf',
          author: anonymous0896,
          text: "La plupart des infographies sont tirées du site de l'irsn (cité en introduction), elles sont accessibles ici https://www.irsn.fr/FR/expertise/rapports_expertise/Documents/radioprotection/IRSN_Infographie-Exposition_travailleurs_2020.pdf.",
          date: date('2021-08-22 22:09'),
        }),
      ],
    }),
    createComment({
      id: 'fixture-d3oq8h',
      author: raspout,
      text: 'Le lien est cassé sur la phrase "Ce millisievert représente une fraction de la radioactivité à laquelle toute la population est exposée en dehors de toute activité professionnelle.". Savez-vous à quoi il pouvait faire référence ?',
      date: date('2021-09-01 13:02'),
      replies: [
        createComment({
          id: 'fixture-yywkvk',
          author: bopzor,
          text: 'https://www.irsn.fr/FR/Actualites_presse/Communiques_et_dossiers_de_presse/Documents/IRSN_Rapport%20EXPOP_def.pdf',
          date: date('2021-09-03 11:59'),
          reactionsCount: createReactionsCount({ approve: 1 }),
        }),
      ],
    }),
    createComment({
      id: 'fixture-uzwfnt',
      author: dougForcett,
      text: "Est-ce que quelqu'un a prit connaissance du rapport complet ?\nSi oui, trouvez-vous que l'article résume bien ce qui y est décrit ?",
      date: date('2021-09-06 19:34'),
    }),
    createComment({
      id: 'fixture-ty74ch',
      author: nilscox,
      text: 'Ce titre... 🤦',
      date: date('2021-09-18 15:15'),
      reactionsCount: createReactionsCount({ dontUnderstand: 1 }),
      replies: [
        createComment({
          id: 'fixture-e5cgb9',
          author: jeanette,
          text: "Désolée, mais je n'ai pas compris, quel est le problème avec le titre ?",
          date: date('2021-09-19 21:26'),
          replies: [
            createComment({
              id: 'fixture-4x0h1m',
              author: nilscox,
              text: "Il est trompeur : il laisse entendre que c'est le virus qui diminue la radioactivité, alors que c'est en réalité un effet indirect lié aux actions de protection prises par le gouvernement.",
              date: date('2021-09-19 22:44'),
              reactionsCount: createReactionsCount({ approve: 3 }),
            }),
          ],
        }),
      ],
    }),
  ],
});

export const vaccinsEffetsSecondaires = createCommentsArea({
  id: 'fixture-huk0bh',
  information: createInformation({
    id: 'fixture-ilux5t',
    url: 'https://www.francesoir.fr/societe-sante/covid-19-vaccin-analyse-benefice-risque-affectee',
    title: 'Covid-19 : Vaccin, analyse bénéfice/risque affectée par les effets secondaires qui arrivent',
    media: 'francesoir',
    publicationDate: date('2021-01-08'),
  }),
  comments: [
    createComment({
      id: 'fixture-7tb1ev',
      date: new Date('2021-01-24T18:37:51.168Z'),
      edited: new Date('2021-01-24T19:14:48.919Z'),
      author: bopzor,
      text: "De ce que j'en comprends, l'objectif de cet article^85 est de dire que la balance bénéfice/risque du vaccin COVID-19 Pfizer/BioNTech est à réévaluer (vers plus de risque).\n\nL'élément mis en avant ici me semble^95 être le témoignage de l'épouse d'un homme décédé 16 jours après la première injection.  \nJ'ai pu retrouver l'article original (en anglais) sur le [DailyMail.com](https://www.dailymail.co.uk/news/article-9119431/Miami-doctor-58-dies-three-weeks-receiving-Pfizer-Covid-19-vaccine.html), où l'on retrouve bien les éléments cités et traduits par FranceSoir.\n\nOn peut lire que l'épouse  \n> \"déclare qu’elle est certaine que sa mort a été déclenchée par le vaccin\",  \n\nainsi que :  \n> Mère d'un enfant, elle a aussi déclaré: « Dans mon esprit, sa mort était à 100% liée au vaccin. Il n'y a pas d'autre explication. »\n\nMais un témoignage n'est certainement pas une preuve !\nEn plus, il est indiqué que l'enquête est en cours, il est donc, de toute façon, trop tôt pour tirer des conclusions sur le lien entre la mort et le vaccin.\n\nRien ne me permet de dire que la balance bénéfice/risque en est affectée. Prudence donc, avec ce qu'on lit sur FranceSoir !",
      history: [
        {
          date: new Date('2021-01-24T18:37:51.168Z'),
          text: "L'objectif de cet article^90 est de dire que la balance bénéfice/risque du vaccin COVID-19 Pfizer / BioNTech est à réévaluer.\n\nL'élément mis en avant ici me semble^95 être le témoignage de l'épouse d'un homme décédé 16 jours après la première injection.  \nSur l'article qui vient du [DailyMail.com](http://www.dailymail.co.uk/news/article-9119431/Miami-doctor-58-dies-three-weeks-receiving-Pfizer-Covid-19-vaccine.html), on retrouve bien les éléments cité et traduits par FranceSoir.\n\nOn peut lire que l'épouse  \n> \"déclare qu’elle est certaine que sa mort a été déclnechée par le vaccin\",  \n\nainsi que :  \n> Mère d'un enfant, elle a aussi déclaré: « Dans mon esprit, sa mort était à 100% liée au vaccin. Il n'y a pas d'autre explication. »\n\nMais un témoignage n'est certainement pas une preuve !\nEn plus, il est indiqué que l'enquête est en cours, il est donc, de toute façon, trop tôt pour tirer des conclusions sur le lien entre la mort et le vaccin.\n\nRien ne me permet de dire que la balance bénéfice/risque en est affectée.",
        },
        {
          date: new Date('2021-01-24T19:05:42.133Z'),
          text: "De ce que j'en comprends, l'objectif de cet article^90 est de dire que la balance bénéfice/risque du vaccin COVID-19 Pfizer / BioNTech est à réévaluer.\n\nL'élément mis en avant ici me semble^95 être le témoignage de l'épouse d'un homme décédé 16 jours après la première injection.  \nJ'ai pu retrouver l'article original (en anglais) sur le [DailyMail.com](http://www.dailymail.co.uk/news/article-9119431/Miami-doctor-58-dies-three-weeks-receiving-Pfizer-Covid-19-vaccine.html), où l'on retrouve bien les éléments cités et traduits par FranceSoir.\n\nOn peut lire que l'épouse  \n> \"déclare qu’elle est certaine que sa mort a été déclnechée par le vaccin\",  \n\nainsi que :  \n> Mère d'un enfant, elle a aussi déclaré: « Dans mon esprit, sa mort était à 100% liée au vaccin. Il n'y a pas d'autre explication. »\n\nMais un témoignage n'est certainement pas une preuve !\nEn plus, il est indiqué que l'enquête est en cours, il est donc, de toute façon, trop tôt pour tirer des conclusions sur le lien entre la mort et le vaccin.\n\nRien ne me permet de dire que la balance bénéfice/risque en est affectée. Prudence donc , avec ce qu'on lit sur FranceSoir !",
        },
        {
          date: new Date('2021-01-24T19:14:48.919Z'),
          text: "De ce que j'en comprends, l'objectif de cet article^85 est de dire que la balance bénéfice/risque du vaccin COVID-19 Pfizer/BioNTech est à réévaluer (vers plus de risque).\n\nL'élément mis en avant ici me semble^95 être le témoignage de l'épouse d'un homme décédé 16 jours après la première injection.  \nJ'ai pu retrouver l'article original (en anglais) sur le [DailyMail.com](https://www.dailymail.co.uk/news/article-9119431/Miami-doctor-58-dies-three-weeks-receiving-Pfizer-Covid-19-vaccine.html), où l'on retrouve bien les éléments cités et traduits par FranceSoir.\n\nOn peut lire que l'épouse  \n> \"déclare qu’elle est certaine que sa mort a été déclenchée par le vaccin\",  \n\nainsi que :  \n> Mère d'un enfant, elle a aussi déclaré: « Dans mon esprit, sa mort était à 100% liée au vaccin. Il n'y a pas d'autre explication. »\n\nMais un témoignage n'est certainement pas une preuve !\nEn plus, il est indiqué que l'enquête est en cours, il est donc, de toute façon, trop tôt pour tirer des conclusions sur le lien entre la mort et le vaccin.\n\nRien ne me permet de dire que la balance bénéfice/risque en est affectée. Prudence donc, avec ce qu'on lit sur FranceSoir !",
        },
      ],
      reactionsCount: createReactionsCount({ approve: 2, think: 1 }),
      userReaction: ReactionType.think,
      subscribed: true,
      replies: [
        createComment({
          id: 'fixture-lmebed',
          date: new Date('2021-01-24T19:23:15.421Z'),
          author: nilscox,
          text: "Bien vu, merci pour le lien vers l'article. Notons tout de même que [selon lemonde](https://www.lemonde.fr/pixels/article/2017/02/09/le-daily-mail-n-est-plus-une-source-utilisable-sur-wikipedia_5077027_4408996.html), wikipedia ne fait plus confiance au DailyMail depuis 2017 !",
          reactionsCount: createReactionsCount({ like: 1 }),
          subscribed: true,
        }),
      ],
    }),
    createComment({
      id: 'fixture-v78qab',
      date: new Date('2021-01-24T19:10:45.530Z'),
      author: dougForcett,
      text: "> La société Pfizer enquêterait sur ce premier décès avec un lien présumé avec le vaccin.\n\nEn effet, selon [un article du times](https://www.nytimes.com/live/2021/01/13/world/covid19-coronavirus#the-death-of-a-miami-doctor-who-received-a-coronavirus-vaccine-is-being-investigated), Pfizer serait en train \"d'investiguer activement\" sur le décès de Gregory Michael, mais ils affirment aussi qu'il n'y aurait à ce jour aucune connexion avec le vaccin. A prendre avec des pincettes, donc.\n",
      replies: [
        createComment({
          author: meliMelo,
          text: 'Followup update! [Cet article](https://nypost.com/2021/04/08/natural-causes-now-blamed-for-doc-who-died-after-pfizer-vaccine/) parut le 8 avril indique que la mort de ce pauvre homme ne serait finalement pas lié au vaccin, mais à une complication de ses problèmes de santé.',
          date: date('2021-04-11 07:22'),
          reactionsCount: createReactionsCount({ approve: 5 }),
        }),
      ],
    }),
    createComment({
      id: 'fixture-1dqxaq',
      date: new Date('2021-01-24T18:17:22.118Z'),
      author: bopzor,
      text: '> La Suisse a décidé d’attendre d’avoir suffisamment de données sur les effets secondaires\n\nFaux. La Suisse a commencé à vacciner le 28 décembre 2020.\n[Au 19 janvier, l’OFSP évalue à 110’000 le nombre de personnes ayant reçu une première dose de vaccin.](https://www.heidi.news/sante/les-dix-questions-que-vous-vous-posez-sur-les-vaccins-covid-19-en-suisse)',
      reactionsCount: createReactionsCount({ approve: 3 }),
    }),
  ],
});

export const leBiaisEtLeBruit = createCommentsArea({
  id: 'fixture-oc3zd1',
  information: createInformation({
    id: 'fixture-6x9i55',
    author: 'Hygiène Mentale',
    title: 'Ep34 Le Biais et le Bruit',
    url: 'https://skeptikon.fr/w/o6e8Z6UTLF7VCjFKKjA28M',
    publicationDate: new Date(2021, 7, 12),
    media: 'skeptikon',
  }),
  comments: [
    createComment({
      id: 'fixture-leBiaisEtLeBruit',
      author: nilscox,
      text: '## Tous les commentaires de cette page viennent de la zone de commentaires YouTube\n\nHistoire de se rendre compte de ce que ça peut donner sur Zétécom :)\n\nLien de la vidéo sur YouTube : https://www.youtube.com/watch?v=VKsekCHBuHI',
      date: date('2021-10-16 12:00'),
      reactionsCount: createReactionsCount({ approve: 42 }),
    }),
    createComment({
      id: 'fixture-t28h7t',
      author: paco,
      text: "Episode de grande qualité une fois de plus, à l'heure où la communauté sceptique est maintenant installée et doit apprendre à avaler (un peu) ses propres médocs. Ça fait du bien de se poser 5min pour se remettre un peu en question. Merci M.Christophe Michel !",
      date: date('2021-10-16 12:01'),
    }),
    createComment({
      id: 'fixture-cp8z58',
      author: mrBlueSky,
      text: "On aurait aussi pu ajouter, en fin de vidéo, que le fait que les autorités cherchent à résoudre ce qu'elles considérant comme un problème (indépendamment du fait qu'elles aussi pourraient avoir des biais), après avoir passé plus d'un an à détruire leur propre crédibilité est en soi un problème (parce qu'à chaque décision exagérée, comme à chaque revirement sur des éléments présentés auparavant comme définitifs, les gens révisent peurs a priori bayésiens sur la source de ces recommandations, sur les autorités donc). Quand les recommandations des gouvernements ressemblent plus à une partie de \"Jacadi\" qu'à des conseils prudents, raisonnables et stables, il ne faut pas s'étonner que les gens se mettent à penser que \"ça aussi, ça changera\" ou que \"là encore, ils racontent des sornettes\".\n\nEt ça joue énormément dans la décision de franchir le pas et de rejoindre les vaccino-sceptiques (qui ne sont ni marginaux en nombre, ni composés des seuls antivax, d'ailleurs).",
      date: date('2021-10-16 12:02'),
      replies: [
        createComment({
          id: 'fixture-4t5379',
          author: quake,
          text: "Sauf que je ne pense pas qu'ils est volontairement \"passé plus d'un an à détruire leur propre crédibilité\". Ils ont plus probablement dû prendre des décisions radicales face une situation totalement inédites et non préparée. Forcément, et heureusement, leur vision a évolué avec la crise.\n\nJe pense que le problème vient plutôt du fait que les gens ont obéis aveuglement sans jamais comprendre pourquoi c'était important.",
          date: date('2021-10-16 12:03'),
          replies: [
            createComment({
              id: 'fixture-ews6li',
              author: paco,
              text: "Ils ne l'ont sans doute pas fait délibérément, mais c'est le résultat objectif de leur action. Ils étaient en position de prendre des décisions, de faire des choix, et non seulement certains de ces choix int été mauvais, mais lesdits choix ont été défendus avec la même âpreté que les autres, sans admettre avoir fait d'erreur ni avoir appris desdites erreurs (en sociologie des organisations, la principale caractéristique d'une bureaucratie est qu'elle est incapable d'apprendre).\n\nDu coup, face à une source d'informations qui s'est avérée objectivement pas meilleure qu'un bruit blanc, beaucoup de gens ont décidé de ne plus écouter ce qu'ils ont classé dans les sources de bruit et non dans les sources de signal.",
              date: date('2021-10-16 12:04'),
            }),
          ],
        }),
        createComment({
          id: 'fixture-y9hhqf',
          author: jeanmichel,
          text: 'Les complotistes on 30 ans d avance sur les clowns soit disant sceptiques ...\nVous vivez dans un monde de naïfs qui plus est aveuglés par une science souvent déviante \nVous êtes des charlatans inaptes a retenir ce que la science a permis au tabac et aux engrais et qui se reproduira pour la vaccination ....\nDes journalistes comme Serge monnast écrivaient en 95 2000 le scénario de 2020 \nMême Attali dans ces livres de 1998 2000 décrivait mot pour mot ce qui était prévu pour lui en 2020 sur le covid ...\nVous êtes des charlatans de l info ,des négationnistes de celle ci et des preuves incontestables de cette mascarade covid',
          date: date('2021-10-16 12:05'),
          replies: [
            createComment({
              id: 'fixture-y6dx2t',
              author: jarod22,
              text: 'Bonjour, Ce n\'est pas en  donnant des insultes, des références plus que controversé et aucune preuve que tu pourra débattre. Mon conseil est que tu devrais prendre "soins" de ton interlocuteur, vérifie tes sources et ne prend pas que les élément qui t\'"intéresse. Et tu devrais avoir des échanges beaucoup plus intéressant dans la vie."',
              date: date('2021-10-16 12:06'),
              replies: [
                createComment({
                  id: 'fixture-ynuc6t',
                  author: jeanmichel,
                  text: '🥱🥱🥱\nUn crétin zététichien naïf reste un crétin zététichien naïf quelque soit les sources invoquées ....\nCertains cherchent encore le pangolin et la chauve souris en lisant, en mangeant, le LANCET et ses études de stars du porno ....',
                  date: date('2021-10-16 12:07'),
                }),
                createComment({
                  id: 'fixture-qijywf',
                  author: jeanmichel,
                  text: 'tu en es là preuve vivante en critiquant les personnes que j ai  cité auparavant  leurs travaux et écrits ainsi que l exemple du tabac et des engrais\nTu es un charlatan ....',
                  date: date('2021-10-16 12:08'),
                }),
                createComment({
                  id: 'fixture-r3026o',
                  author: jeanmichel,
                  text: 'Bref ma puce garde tes conseils d incompétent ..j ai aucune leçon de logique ou de recherche a recevoir de ta part et j ai pas attendu que ton gourou m explique les bruits et les biais  externes et internes  pour me forger un jugement éclairé....',
                  date: date('2021-10-16 12:09'),
                  replies: [
                    createComment({
                      id: 'fixture-gr4gwd',
                      author: jarod22,
                      text: 'moi je te donnais juste un conseil. Je n est pas critiquer les personnes que tu avait Cité, mais je t est dit de lire tout ce qu il on dit et écrit et pas ne prendre juste la partie qui t intéresse. Et surtout je ne t est en aucun moment insulté. Donc si tu veux débattre respecté moi!',
                      date: date('2021-10-16 12:10'),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    createComment({
      id: 'fixture-3tqdn9',
      author: jeanette,
      text: 'Merci pour cette nouvelle vidéo !!\n\nConcernant "la sagesse des foules" ou "l\'appel à la popularité". Je ne sais pas pourquoi, mais je sens que quelques personnes vont y voir un rapprochement avec la politique ou les sondages =)\nC\'est pourquoi, je souhaiterais ajouter que "la sagesse des foules" ne marche que pour les faits, et non pour les opinons. Si on demande à une foules de mesurer une distance, ça marche ; alors que si on leurs demande quel est la meilleure décision dans un cadre donnée, ça ne marche plus !\n\nC\'est d’ailleurs un outil que j\'utilise personnellement au quotidien. "Est-ce-que cette information est un fait ou une opinion? Est-ce-que ce que je pense sur ce sujet est un fait ou une opinion ?" Ça m\'est très utile pour éviter les mauvaises interprétations lorsque j\'écoute les informations (la matinale de France Inter) tous les jours. =)',
      date: date('2021-10-16 12:11'),
    }),
    createComment({
      id: 'fixture-i5bhlr',
      author: oscarBelka,
      text: "12:30 j'ai fait exactement le même choix que toi! Et franchement je crois pas être le seul: la raison les deux impacts tout à gauche.\n13:17 le problème c'est que la sagesse des foules ne fonctionne que si les gens donnent leurs avis séparément avant de suivre celui de la majorité, si chacun commence par suivre selon de la majorité ça déconne. Il faut donc faire une nuance entre un ad populum valide et un ad populum invalide, qui ne vient seulement d'un biais partagé (enfin en un sens si, mais au moins est-il plus facile à identifier que d'autres).",
      date: date('2021-10-16 12:12'),
      replies: [
        createComment({
          id: 'fixture-dl25zl',
          author: jarod22,
          text: "12:30 Intéressant, j'avais déjà oublié l'existence des impacts à gauche.",
          date: date('2021-10-16 12:13'),
        }),
        createComment({
          id: 'fixture-cn0z1j',
          author: anonymous0896,
          text: "C'est amusant, de mon côté pour les impacts de gauche j'ai \"réduit leur poids dans la balance\" puisqu'ils me semblaient totalement ratés. Un peu comme si l'imprécision était une courbe exponentielle : + on se plante (par exemple parce qu'on eternue en tirant), moins l'impact a un quelconque rapport avec la cible de base.\n\nEt merci pour la précision sur l'ad populjm invalide. Maintenant que tu le dis c'est logique : le bruit des premiers participants devient un biais pour les suivants.",
          date: date('2021-10-16 12:14'),
        }),
        createComment({
          id: 'fixture-4k5wsi',
          author: meliMelo,
          text: "oui, j'avais tiqué aussi (EDIT: sagesse des foules VS astroturfing). \nSi une grande majorité des gens se met à penser selon la sagesse des foules, alors la petite minorité initiale servant de base au jugement, sera exploitée comme le jugement par cette grande majorité. Je m'explique :\n\nEn clair, 50 personnes émettent un avis indépendant. \nLa 51ème se base sur les 50 précédentes pour émettre le sien. \nEt on continue jusqu'à la millième personne.\n\nVous, 1001ème personne, estimez que les 1000 autres personnes ne sont pas idiotes en général, et émettez votre avis sur la base de ces 1000 autres avis, qui en plus se retrouvent avec très peu de bruit (par construction).\n\nEt bien votre 1001ème avis ne sera en réalité fondé que sur l'avis de 5% des 1000 avis précédents. (et on passe de l'ad populum à l'argument d'autorité)\n(EDIT: c'est aussi le principe exploité par l'astroturfing)",
          date: date('2021-10-16 12:15'),
        }),
      ],
    }),
    createComment({
      author: anonymous0896,
      text: "Excellente vidéo !\n28:16 :Petite coquille dans l'extrait du livre de Wagner Egger, lorsqu'il date le travail d'Emile Durkheim (à propos de la notion d'anomie) en 1967, alors que celui est décédé en 1917.\nEncore bravo pour ton travail !",
      date: date('2021-10-16 12:16'),
      reactionsCount: createReactionsCount({ like: 3 }),
    }),
    createComment({
      author: createUser({ nick: "L'ami du bon goût" }),
      text: "Merci beaucoup! Ça fait plaisir =) j'ai souvent du mal à faire comprendre aux gens la différence que (moi) je perçois entre la stupidité (manque d'intelligence) et la naïveté, j'essaie toujours d'avoir un regard bienveillant sur les personnes qui font des erreurs, mais j'ai parfois l'impression que ceux qui ne \"tombent pas dans la croyance\" (enfin qui croient de pas être \"influençables\") sont aussi emprunt d'un sentiment de supériorité, ça les rassure de se dire qu'ils sont plus malin que les autres, qu'on ne peut pas les manipuler, les tromper etc... et c'est très difficile de leur expliquer qu'on est tous des humains plus ou moins biaisés\n\nBref, merci encore, c'est un super taff, comme d'hab =)",
      date: date('2021-10-16 12:17'),
      reactionsCount: createReactionsCount({ think: 1 }),
    }),
    createComment({
      author: createUser({ nick: 'Perdita' }),
      text: "Encore une vidéo fascinante, bravo !\nLe parallèle tiré à la fin sur le complotisme semble particulièrement judicieux. Il met en évidence le cercle vicieux dont nous sommes tous prisonniers, en un permanent jeu de ping pong entre biais internes et externes.\nS'il faut prendre le cercle vicieux par un bout arbitraire, commençons par un biais interne : l'anxiété soulagée par les théories fallacieuses. Leurs explications faciles et séduisantes sont ensuite relayées à l'externe par les chambre à echo, puis renforcées par le biais interne de confirmation, à son tour instrumentalisé à l'externe par des discours sciemment clientélistes.\nLes technologies du 21ème siècle facilitent d'autant plus cette porosité entre biais internes et externes. Et notre culture commune tend à ignorer totalement le bruit, fondamentalement injuste et partial, qui est devenu un tabou inadmissible. Or il est toujours plus confortable de contester l'existence de ce qu'on refuse de reconnaître... encore un autre biais interne ?",
      date: date('2021-10-16 12:18'),
      reactionsCount: createReactionsCount({ like: 1, approve: 4 }),
    }),
    createComment({
      author: createUser({ nick: 'Pongo' }),
      text: 'Cette vidéo va beaucoup m\'aider à accepter des choses qui génèrent en moi beaucoup trop d\'émotion, et sans doute trop de jugement qui contiennent le mot "con" ou "conne". Merci pour ça.',
      date: date('2021-10-16 12:19'),
    }),
    createComment({
      author: createUser({ nick: 'Horace' }),
      text: "Tiens, j'aime beaucoup ton propos sur \"déplorer la connerie des gens\". Je suis prof et j'entends beaucoup trop cette lâcheté mentale de la part des collègues ou de l'institution : c'est terrible, les gamins sont de plus en plus mauvais, de moins en moins curieux intellectuellement… moui… ou bien on peut s'interroger sur les causes externes de cet état de fait (si c'en est un et pas un biais de perception chez les profs – \"tout était mieux avant\" !)",
      date: date('2021-10-16 12:20'),
      reactionsCount: createReactionsCount({ like: 3 }),
      replies: [
        createComment({
          author: createUser({ nick: 'Jasper' }),
          text: "On chouine sur la baisse du niveau des élève depuis des siècles, je me demande si Platon morigénait pas contre cet état de fait. Je suppose que les profs ont tout simplement oublié leurs propres difficultés d'apprentissage...",
          date: date('2021-10-16 12:21'),
          replies: [
            createComment({
              author: createUser({ nick: 'Horace' }),
              text: "à mon avis c'est un combo \"c'était mieux avant\" / les profs sont des anciens bons élèves qui n'étaient pas attentifs aux difficultés de leurs camarades / l'éducation ne fait que se démocratiser encore et toujours davantage donc forcément quand 90% de la population a le bac tu vois un peu plus de diversité dans les backgrounds et dans les appétances scolaires qu'à l'époque où c'était 60%. Tout résumer à \"les jeunes sont de plus en plus cons\", quel manque de réflexion ! Fort heureusement tous les collègues ne tiennent pas ce discours.",
              date: date('2021-10-16 12:22'),
            }),
          ],
        }),
      ],
    }),
  ],
});

export const alzheimer = createCommentsArea({
  id: 'fixture-oo8uke',
  information: createInformation({
    id: 'fixture-zbwxyc',
    title: 'Alzheimer : le basilic peut-il aider à combattre la maladie ?',
    url: 'https://www.science-et-vie.com/corps-et-sante/alzheimer-le-basilic-peut-il-aider-a-combattre-la-maladie-64909',
    publicationDate: new Date(2021, 7, 15),
    media: 'scienceetvie',
  }),
});

export const intelligenceArtificielle = createCommentsArea({
  id: 'fixture-byw8ta',
  information: createInformation({
    id: 'fixture-d9uio1',
    title: 'Des chercheurs ont-ils développé une intelligence artificielle trop dangereuse pour être mise en service ?',
    url: 'https://www.liberation.fr/checknews/2019/02/20/des-chercheurs-ont-ils-developpe-une-intelligence-artificielle-trop-dangereuse-pour-etre-mise-en-ser_1710332/',
    publicationDate: new Date(2019, 1, 20),
    media: 'liberation',
    author: 'Olivier Monod',
  }),
});

export const médecinesAlternatives = createCommentsArea({
  id: 'fixture-3w5rpx',
  information: createInformation({
    id: 'fixture-x6he8w',
    title: "L'appel de 124 professionnels de la santé contre les «médecines alternatives»",
    url: 'https://sante.lefigaro.fr/article/l-appel-de-124-professionnels-de-la-sante-contre-les-medecines-alternatives-/',
    media: 'lefigaro',
    publicationDate: new Date(2018, 2, 18),
  }),
});

export const commentsAreas = [
  radioactivitéCovid,
  leBiaisEtLeBruit,
  alzheimer,
  vaccinsEffetsSecondaires,
  intelligenceArtificielle,
  médecinesAlternatives,
];

for (const commentsArea of commentsAreas) {
  const allComments = commentsArea.comments.flatMap(commentAndReplies);

  commentsArea.commentsCount = allComments.length;

  for (const comment of allComments) {
    comment.repliesCount = commentAndReplies(comment).length - 1;
  }
}
