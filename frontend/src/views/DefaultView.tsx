import React, { useContext, useEffect, useState } from 'react';

import { Subject } from 'src/types/Subject';
import { SortType } from 'src/types/SortType';
import { classList } from 'src/utils/classList';
import { ReactionSortTypeProvider } from 'src/utils/ReactionSortTypeContext';
import InformationContext from 'src/utils/InformationContext';
import { fetchSubjects } from 'src/api/subjects';
import { SubjectsList } from 'src/components/subjects/SubjectsList';
import { Loader } from 'src/components/Loader';

import './DefaultView.css';

type DefaultViewProps = {
  setAsMain: (subject: Subject) => void;
};

const DefaultView = (props: DefaultViewProps) => {
  const information = useContext(InformationContext);
  const [subjects, setSubjects] = useState<Subject[]>(undefined);
  const [fetchingSubjects, setFetchingSubjects] = useState(true);
  const [sort, setSort] = useState(localStorage.getItem('sort') as SortType);

  const sortItems = [
    { type: SortType.DATE_ASC, label: 'Date (asc)' },
    { type: SortType.DATE_DESC, label: 'Date (desc)' },
    { type: SortType.RELEVANCE, label: 'Pertinence' },
  ];

  useEffect(() => {
    setFetchingSubjects(true);

    fetchSubjects(information.id, sort)
      .then(subjects => {
        if (subjects)
          setSubjects(subjects);

        setFetchingSubjects(false);
      });
  }, [information, sort]);

  const onSort = (newSort: SortType) => {
    if (newSort === sort)
      return;

    localStorage.setItem('sort', newSort);
    setSort(newSort);
  };

  if (!sort)
    onSort(SortType.DATE_DESC);

  if (fetchingSubjects)
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

      <div className="subject-form">
        { /* TODO */ }
      </div>

      <SubjectsList display="FULL" subjects={subjects} />

    </div>
  );
};

export { DefaultView };
