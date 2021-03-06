```tsx
import makeComment from 'src/test/makeComment';

const noop = () => {};

const text = `If human is on laptop sit on the keyboard need to chase tail. Thinking longingly about tuna brine i bet my nine lives on you-oooo-ooo-hooo, for spend all night ensuring people don't sleep sleep all day.\n\nSomehow manage to catch a bird but have no idea what to do next, so play with it until it dies of shock sit on human they not getting up ever but roll over and sun my belly lies down in the middle of the night i crawl onto your chest and purr gently to help you sleep, or stretch. Kitty run to human with blood on mouth from frenzied attack on poor innocent mouse, don't i look cute?\n\nBleghbleghvomit my furball really tie the room together scratch my tummy actually i hate you now fight me. Run off table persian cat jump eat fish eat half my food and ask for more but i show my fluffy belly but it's a trap! if you pet it i will tear up your hand stare out the window. Your pillow is now my pet bed furrier and even more furrier hairball. Destroy the blinds tweeting a baseball, grab pompom in mouth and put in water dish cats are cute but poop on the floor, break a planter, sprint, eat own hair, vomit hair, hiss, chirp at birds, eat a squirrel, hide from fireworks, lick toe beans, attack christmas tree so run as fast as i can into another room for no reason.\n\nMore napping, more napping all the napping is exhausting bite the neighbor's bratty kid.`;

const comment = makeComment({ text });

<CommentComponent comment={comment} repliesOpen={false} repliesLoading={false} replyFormOpen={false} />;
```
