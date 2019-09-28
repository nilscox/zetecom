import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import Flex from 'src/components/common/Flex';

import Home from './Home';
import Usage from './Usage';
import Rules from './Rules';
import Motivations from './Motivations';
import FAQ from './FAQ';
import NotFound from './NotFound';

import Navigation from './components/Navigation';
import Header from './components/Header';
import useResponsive from './hooks/useResponsive';

import './pages.css';

const DividerDesktop: React.FC = () => <div style={{ borderRight: '1px solid #CCC', margin: '0 10px' }}/>;
const DividerMobile: React.FC = () => <div style={{ width: '100%', borderTop: '1px solid #CCC' }}/>;

const Pages: React.FC<RouteComponentProps> = ({ location }) => {
  const { choose, Choose } = useResponsive();

  return (
    <div className="page" style={{ margin: 'auto', padding: '0 10%', color: '#222' }}>

      <Header />

      <Flex flexDirection={choose({ mobile: 'column', desktop: 'row' })} style={{ minHeight: 250 }}>

        <Navigation location={location} />
        <Choose mobile={<DividerMobile />} desktop={<DividerDesktop />} />

        <main style={{ flex: 4, paddingLeft: 10 }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/utilisation" exact component={Usage} />
            <Route path="/charte" exact component={Rules} />
            <Route path="/motivations" exact component={Motivations} />
            <Route path="/faq" exact component={FAQ} />
            <Route component={NotFound} />
          </Switch>
        </main>

      </Flex>

    </div>
  );
};

export default Pages;
