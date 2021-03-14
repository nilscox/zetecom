import { Integration, IntegrationRuntime } from '../IntegrationHost';
import IFrame from '../IFrame';

import './styles/integration.scss';

const APP_URL = process.env.APP_URL as string;

export abstract class BaseIntegrationRuntime implements IntegrationRuntime {
  public commentsAreaId?: number;
  public iframe?: IFrame;

  constructor(public readonly integration: Integration) {}

  get identifier() {
    return this.integration.getIdentifier(location.href);
  }

  get element() {
    return this.integration.getElement();
  }

  get commentsAreaUrl() {
    if (this.commentsAreaId) {
      return `${APP_URL}/commentaires/${this.commentsAreaId}`;
    }
  }

  abstract mount(): void;
  abstract unmount(): void;

  abstract show(): void;

  protected scrollIntoViewOffset(el: HTMLElement) {
    const scrollIntoViewElement = document.createElement('div');

    scrollIntoViewElement.id = 'zc-scrollIntoView';

    scrollIntoViewElement.style.position = 'absolute';
    scrollIntoViewElement.style.top =
      el.getBoundingClientRect().top +
      (document.defaultView?.pageYOffset ?? 0) -
      (this.integration.scrollIntoViewOffset ?? 100) +
      'px';

    document.body.append(scrollIntoViewElement);
    scrollIntoViewElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.body.removeChild(scrollIntoViewElement);
  }
}
