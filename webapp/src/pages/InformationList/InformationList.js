import React from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../../MyContext';
import AddInformationForm from '../../components/AddInformationForm';
import Loading from '../../components/Loading';
import request from '../../services/request-service';
import './InformationList.css';

/**

InformationList props:
(none)

InformationList state:
- informations: Array<Information>

*/

const InformationItem = ({ information }) => (
  <Link to={'/information/' + information.slug}>
    <div className="info-item m-2 d-flex flex-row justify-content-start align-items-center">

      <img
        className="info-image img-thumbnail"
        src={information.image || '/assets/images/default-image.jpg'}
      />

      <div className="info-title mx-2">
        { information.title }
      </div>

    </div>
  </Link>
);

class InformationList extends React.Component {

  static contextType = MyContext;

  state = {
    informations: null,
  };

  async componentDidMount() {
    await request('/api/information/list', {}, {
      200: json => this.setState({ informations: json }),
      default: this.context.onError,
    });
  }

  render() {
    const { user } = this.context;
    const { informations } = this.state;

    return (
      <div className="informations-list">

      { user && <AddInformationForm /> }

      { this.state.informations ? this.state.informations.map(i => (
        <InformationItem key={i.slug} information={i} />
      )) : (
        <Loading />
      ) }

      </div>
    );
  }
}

export default InformationList;
