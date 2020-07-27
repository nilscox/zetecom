import React from 'react';

import { RouteComponentProps } from 'react-router-dom';

import Fallback from 'src/components/Fallback';
import { InformationProvider } from 'src/contexts/InformationContext';
import useAxios from 'src/hooks/use-axios';
import { Information, parseInformation } from 'src/types/Information';

import AsyncContent from '../../components/AsyncContent';
import InformationOverview from '../../components/InformationOverview';
import { Link } from '../../components/Link';
import Padding from '../../components/Padding';
import CommentsZone from '../integration/CommentsZone';

const useFetchInformation = (id: number) => {
  return useAxios<Information>(`/api/information/${id}`, parseInformation);
};

const InformationPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const informationId = Number(match.params.id);

  const [{ loading, data: information, error }] = useFetchInformation(informationId);

  if (error)
    throw error;

  return (
    <AsyncContent loading={loading}>
      {() => (
        <Fallback when={!information} fallback={<>oeuoeu</>}>
          {() => (
            <InformationProvider value={information}>

              <Padding bottom>
                <InformationOverview
                  information={information}
                  title={<Link color={false} openInNewTab href={information.url}>{ information.title }</Link>}
                />
              </Padding>

              <CommentsZone />

            </InformationProvider>
          )}
        </Fallback>
      )}
    </AsyncContent>
  );
};

export default InformationPage;
