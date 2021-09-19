import styled from '@emotion/styled';

import { Demo } from './demos';

const Guideline: React.FC<{ summary: string }> = ({ summary, children }) => (
  <>
    <strong>{summary}</strong>
    {children}
  </>
);

const Separator = styled.hr`
  margin: 32px 0;
  border: 0;
  border-top: 1px solid #ccc;
`;

export const guidelines: Demo = {
  render: () => (
    <>
      <p>
        These are some general coding guidelines that's best to follow. When working on a piece of code that does not
        follow them, refactor it first. Any suggestion or request for change is welcome.
      </p>

      <Separator />

      <Guideline summary="Every file should be readable without scrolling on a 2K screen.">
        <p>Try to keep every file under 80 lines. A little more can be acceptable, but don't push it.</p>
      </Guideline>

      <Separator />

      <Guideline summary="Never import modules from nested folders.">
        <p>
          All folders must have a public API. Consider anything that is not exposed as private, even if _it is possible_
          to import it.
        </p>

        <p>For example, do not</p>

        {/* prettier-ignore */}
        <pre>
{`import LoadingIndicator from 'src/components/Button/LoadingIndicator';
import defaultAvatar from '../Avatar/default-avatar.png';`}
        </pre>
      </Guideline>

      <Separator />

      <Guideline summary="Components should render as little as possible.">
        <p>Minimize every component's scope. If one can be broken into smaller pieces, do it.</p>
      </Guideline>

      <Separator />

      <Guideline summary="Hooks should do as little as possible.">
        <p>Same goes for hooks, try to minimize their logic. Every hook should do one thing and do it well.</p>
      </Guideline>

      <Separator />

      <Guideline summary="Write unit tests for every meaningful logic.">
        <p>
          Every piece of code that encapsulate important business logic must be tested. For instance, a component that
          redirects unauthenticated user must be tested. In the contrary, unit tests for a Logo component or a checkbox
          are not required.
        </p>
      </Guideline>

      <Separator />

      <Guideline summary="Avoid using index.tsx.">
        <p>Prefer repeating the folder's name instead, it's clearer and makes it easier to find files.</p>
      </Guideline>

      <Separator />

      <Guideline summary="Keep props that work together close from each other.">
        <p>Example:</p>

        {/* prettier-ignore */}
        <pre>
{`type SomeComponentProps = {
  color: string;
  setColor: (color: string) => void;
  loading: boolean;
  submitted: boolean;
  onSubmit: () => void;
};`}
        </pre>
      </Guideline>

      <Separator />

      <Guideline summary="All event handlers passed as props must start with `on`"></Guideline>
    </>
  ),
};
