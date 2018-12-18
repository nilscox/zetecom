import { jsx, css } from '@emotion/core';

const Footer = () => (
  <footer css={styles.footer} className="my-3">
    Created with &hearts; by <a css={styles.link} href="https://github.com/nilscox" target="_blank">NilsCox</a>
    &nbsp;&bull;&nbsp;
    Powered by <a css={styles.link} href="https://expressjs.com">Express</a> and <a css={styles.link} href="https://reactjs.org/">React</a>
    &nbsp;&bull;&nbsp;
    All right reserved to the community.
  </footer>
);

const styles = {

  footer: css({
    fontSize: '11px',
    color: '#999999',
    textAlign: 'center',
  }),

  link: css({
    color: 'inherit',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  }),

};

export default Footer;
