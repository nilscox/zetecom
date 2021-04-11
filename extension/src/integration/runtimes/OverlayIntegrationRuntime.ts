import { BaseIntegrationRuntime } from './BaseIntegrationRuntime';
import IFrame from '../IFrame';
import log from '../../utils/log';

import pin from './icons/pin.svg';
import open from './icons/open.svg';
import expand from './icons/expand.svg';
import shrink from './icons/shrink.svg';

export class OverlayIntegrationRuntime extends BaseIntegrationRuntime {
  private _pin = false;
  private _large = false;

  private overlayContainer = OverlayIntegrationRuntime.createElement('div', { id: 'zetecom' }, ['overlay-container']);

  private iframeContainer = OverlayIntegrationRuntime.createElement('div', { id: 'iframe-container' });
  private buttonsContainer = OverlayIntegrationRuntime.createElement('div', { id: 'overlay-buttons' });

  private overlayButton = OverlayIntegrationRuntime.createElement('button', { id: 'overlay-button' }, [
    'overlay-button',
    'visible',
  ]);

  private pinButton = OverlayIntegrationRuntime.createElement('button', { id: 'pin-overlay', title: 'Épingler' }, [
    'overlay-button',
  ]);

  private openAppButton = OverlayIntegrationRuntime.createElement(
    'button',
    { id: 'open-app', title: 'Ouvrir dans un nouvel onglet' },
    ['overlay-button'],
  );

  private largeOverlayButton = OverlayIntegrationRuntime.createElement(
    'button',
    { id: 'large-overlay', title: 'Agrandir' },
    ['overlay-button'],
  );

  private static createElement(type: string, attrs: Record<string, any> = {}, classes: string[] = []) {
    const el = document.createElement(type);

    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }

    for (const className of classes) {
      el.classList.add(className);
    }

    return el;
  }

  private set showOverlayButtons(show: boolean) {
    if (this.commentsAreaId === undefined) {
      return;
    }

    const method = show ? 'add' : 'remove';

    this.pinButton.classList[method]('visible');
    this.openAppButton.classList[method]('visible');
    this.largeOverlayButton.classList[method]('visible');
  }

  private get pin() {
    return this._pin;
  }

  private set pin(value: boolean) {
    if (this._pin === value || !this.commentsAreaId) {
      return;
    }

    this._pin = value;

    if (this._pin) {
      this.pinButton.title = 'Désépingler';
      this.pinButton.classList.add('pin-active');
      this.overlayContainer.removeEventListener('mouseleave', this.onOverlayMouseLeave);
    } else {
      this.pinButton.title = 'Épingler';
      this.pinButton.classList.remove('pin-active');
      this.overlayContainer.addEventListener('mouseleave', this.onOverlayMouseLeave);
    }
  }

  private get large() {
    return this._large;
  }

  private set large(value: boolean) {
    if (this._large === value) {
      return;
    }

    this._large = value;

    if (this._large) {
      this.largeOverlayButton.innerHTML = shrink;
      this.largeOverlayButton.title = 'Rétrécir';
      this.overlayContainer.style.width = '940px';
    } else {
      this.largeOverlayButton.innerHTML = expand;
      this.largeOverlayButton.title = 'Agrandir';
      this.overlayContainer.style.width = '';
    }

    // const listener = () => {
    //   this.iframe?.element.removeEventListener('transitionend', listener);
    //   this.iframe?.resize();
    // }

    // this.iframe?.element.addEventListener('transitionend', listener);

    setTimeout(() => this.iframe?.resize(), 125);
  }

  private onHideIframeTransitionEnd = () => {
    this.iframe?.element.removeEventListener('transitionend', this.onHideIframeTransitionEnd);
    this.overlayButton.addEventListener('mouseover', this.onOverlayButtonMouseOver);
  };

  private onOverlayMouseLeave = () => {
    this.overlayContainer.removeEventListener('mouseleave', this.onOverlayMouseLeave);
    this.iframe?.element.addEventListener('transitionend', this.onHideIframeTransitionEnd);

    this.iframeContainer.classList.remove('visible');

    this.large = false;
    this.showOverlayButtons = false;
  };

  private onShowIframeTransitionEnd = () => {
    this.iframe?.element.removeEventListener('transitionend', this.onShowIframeTransitionEnd);
    this.overlayContainer.addEventListener('mouseleave', this.onOverlayMouseLeave);
  };

  private onOverlayButtonMouseOver = () => {
    this.overlayButton.removeEventListener('mouseover', this.onOverlayButtonMouseOver);
    this.iframe?.element.addEventListener('transitionend', this.onShowIframeTransitionEnd);

    this.iframeContainer.classList.add('visible');

    this.showOverlayButtons = true;
  };

  mount() {
    const { identifier } = this;

    if (!identifier) {
      throw new Error('cannot get identifier');
    }

    log('creating iframe');
    this.iframe = new IFrame(this.integration.name, identifier);

    log('loading iframe resizer');
    this.iframe.loadIframeResizer();

    document.body.appendChild(this.overlayContainer);

    this.overlayContainer.appendChild(this.iframeContainer);
    this.overlayContainer.appendChild(this.buttonsContainer);

    this.iframeContainer.appendChild(this.iframe.element);

    this.buttonsContainer.appendChild(this.overlayButton);
    this.buttonsContainer.appendChild(this.pinButton);
    this.buttonsContainer.appendChild(this.openAppButton);
    this.buttonsContainer.appendChild(this.largeOverlayButton);

    this.pinButton.innerHTML = pin;
    this.pinButton.addEventListener('click', () => (this.pin = !this.pin));

    this.openAppButton.innerHTML = open;
    this.openAppButton.addEventListener('click', () => window.open(this.commentsAreaUrl, '_blank'));

    this.largeOverlayButton.innerHTML = expand;
    this.largeOverlayButton.addEventListener('click', () => (this.large = !this.large));

    this.overlayButton.addEventListener('mouseover', this.onOverlayButtonMouseOver);

    window.addEventListener('blur', () => {
      if (document.activeElement === this.iframe?.element) {
        this.pin = true;
      }
    });
  }

  unmount() {
    log('unmounting iframe');
    this.iframe?.unmount();
    document.body.removeChild(this.overlayContainer);
  }

  show() {
    if (!this.pin) {
      this.onOverlayButtonMouseOver();

      const listener = () => {
        this.iframe?.element.removeEventListener('transitionend', listener);
        this.pin = true;
      };

      this.iframe?.element.addEventListener('transitionend', listener);
    }
  }
}
