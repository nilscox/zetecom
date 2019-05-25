import React, { useContext, useEffect, useState } from 'react';

import { classList } from '../utils/classList';
import { ReactionSortTypeProvider } from '../utils/ReactionSortTypeContext';
import { Reaction } from '../types/Reaction';
import { ReactionSortType } from '../types/ReactionSortType';
import { fetchRootReactions } from '../api/reaction';
import InformationContext from '../utils/InformationContext';
import { ReactionsList } from '../components/ReactionsList';
import { ReactionForm } from '../components/ReactionForm/ReactionForm';
import { Loader } from '../components/Loader';

import './DefaultView.css';

type DefaultViewProps = {
  setAsMain: (reaction: Reaction) => void;
};

const DefaultView = (props: DefaultViewProps) => {
  const information = useContext(InformationContext);
  const [rootReactions, setRootReactions] = useState<Reaction[]>(undefined);
  const [fetchingRootReactions, setFetchingRootReactions] = useState(true);
  const [sort, setSort] = useState(localStorage.getItem('sort') as ReactionSortType);

  const sortItems = [
    { type: ReactionSortType.DATE_ASC, label: 'Date (asc)' },
    { type: ReactionSortType.DATE_DESC, label: 'Date (desc)' },
    { type: ReactionSortType.RELEVANCE, label: 'Pertinence' },
  ];

  useEffect(() => {
    setFetchingRootReactions(true);

    fetchRootReactions(information.id, sort)
      .then(reactions => {
        if (reactions)
          setRootReactions(reactions);

        setFetchingRootReactions(false);
      });
  }, [information, sort]);

  const onSort = (newSort: ReactionSortType) => {
    if (newSort === sort)
      return;

    localStorage.setItem('sort', newSort);
    setSort(newSort);
  };

  if (!sort)
    onSort(ReactionSortType.DATE_DESC);

  if (fetchingRootReactions)
    return <Loader size="big" />;

  return (
    <div>

      <div className="reactions-sort-by">

        <div className="sort-by-label">Trier par :</div>

        { sortItems.map(({ type, label }) => (
          <div
            key={type}
            className={classList(
              'sort-by',
              `sort-by--${type}`,
              sort === type && 'sort-by-active',
            )}
            onClick={() => onSort(type)}
          >
            { label }
          </div>
        )) }

      </div>

      <div className="root-reaction-form">
        <ReactionForm
          onSubmitted={(reaction: Reaction) => setRootReactions([reaction, ...rootReactions])}
        />
      </div>

      <ReactionSortTypeProvider value={sort}>
        <ReactionsList
          reactions={rootReactions}
          setAsMain={props.setAsMain}
        />
      </ReactionSortTypeProvider>

    </div>
  );
};

export { DefaultView };
