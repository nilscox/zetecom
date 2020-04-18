FROM cypress/included:4.4.0

WORKDIR /e2e

COPY package.json /e2e
COPY yarn.lock /e2e
RUN yarn --production=false --frozen-lockfile

ADD cypress.json /e2e
ADD cypress /e2e/cypress
