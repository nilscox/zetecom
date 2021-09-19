These are some general coding guidelines that's best to follow. When working on a piece of code that does not follow
them, refactor it first.

Any suggestion or request for change is welcome.

---

**Every file should be readable without scrolling on a 2K screen.**

Try to keep every file under 80 lines. A little more can be acceptable, but don't push it.

---

**Never import modules from nested folders.**

All folders must have a public API. Consider anything that is not exposed as private, even if _it is possible_ to import
it. For example, do not

```tsx static
import LoadingIndicator from 'src/components/Button/LoadingIndicator';
import defaultAvatar from '../Avatar/default-avatar.png';
```

---

**Components should render as little as possible.**

Minimize every component's scope. If one can be broken into smaller pieces, do it.

---

**Hooks should do as little as possible.**

Same goes for hooks, try to minimize their logic. Every hook should do one thing and do it well.

---

**Write unit tests for every meaningful logic.**

Every piece of code that encapsulate important business logic must be tested. For instance, a component that redirects
unauthenticated user must be tested. In the contrary, unit tests for a Logo component or a checkbox are not required.

---

**Avoid using index.tsx.**

Prefer repeating the folder's name instead, it's clearer and makes it easier to find files.

---

**Keep props that work together close from each other.**

Example:

```tsx static
type SomeComponentProps = {
  color: string;
  setColor: (color: string) => void;
  loading: boolean;
  submitted: boolean;
  onSubmit: () => void;
};
```

---

**All event handlers passed as props must start with `on`.**
