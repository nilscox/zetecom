import React from 'react';
import { jsx, css } from '@emotion/core';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

import { userLogout } from 'Redux/actions';

import { Button } from 'Components';
// import { UserAvatar } from 'Components';

const mapStateToProps = state => ({
  user: state.user,
  loadingLogout: state.loading.userLogout,
});

const mapDispatchToProps = dispatch => ({
  onSignout: () => dispatch(userLogout()),
});

const Profile = ({ user, loadingLogout, onSignout }) => {
  if (!user)
    return <Redirect to="/auth/login" />;

  return (
    <div className="position-relative">

      <Button
        onClick={onSignout}
        css={styles.buttonSignout}
        className="btn btn-secondary"
        loading={loadingLogout}
      >
        Déconnexion
      </Button>

      <h2 className="text-center my-4">Mon profil</h2>

      <div className="container w-75 mr-auto">
        <div className="row py-1">
          Email: { user.email }
        </div>
        <div className="row py-1">
          Pseudo: { user.nick }
        </div>
        <div className="row py-1">
          { /* Date d'inscription: { dateformat(new Date(user.signupDate), 'dd/mm/yyyy') } */ }
        </div>
        <div className="row py-1">
          { /* Avatar: <UserAvatar user={user} /> */ }
        </div>
      </div>

    </div>
  );

};

const styles = {
  buttonSignout: css({
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
