These are some general coding guidelines that's best to follow. When working on a piece of code that does not follow
them, refactor it first.

Any suggestion or request for change is welcome.

---

**Every file should be readable without scrolling on a 2K screen.**

Try to keep every file under 80 lines. A little more can be acceptable, but don't push it.

---

**Never import modules from nested folders.**

All folders must have a public API. Concider anything that is not exposed as private, even if _it is possible_ to import
it. For example, do not

```tsx static
import LoadingIndicator from 'src/components/Button/LoadingIndicator';
import defaultAvatar from '../Avatar/default-avatar.png';
```

---

**Components should render as little as possible.**

Minimize every component's scope. If one can be broken into samller pieces, do it.

---

**Hooks should do as little as possible.**

Same goes for hooks, try to minimize their logic. Every hook should do one thing and do it well.

---

**Write unit tests for every meaningful logic.**

Every piece of code that encapsulate important buisness logic must be tested. For instance, a component that redirects
unauthenticated user must be tested. In countrary, unit tests for a Logo component or a react provider are not required.

---

**Avoid using index.tsx.**

Prefer repeating the folder's name instead, it's clearer and makes it easier to find files.

---

**Define prop values first, callbacks after and the css prop last.**

---

**All event handlers passed as props must start with `on`**
