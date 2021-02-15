```tsx
const markdown = `# Hello markdown!

This is an **awesome** example, which demonstrates _how easy it is_ to render some markdown.

The Mardown to HTML converter also enables to:

- highlight part of the text
- explicit a level of confidence^90

I love cheese, especially cheeseburger fondue. Monterey jack pecorino fondue mascarpone cheese on toast caerphilly goat rubber cheese macaroni cheese cheese and wine. Mozzarella emmental airedale hard cheese the big cheese taleggio camembert de normandie cheesy grin...

Mozzarella cheese and biscuits pepper jack. Smelly cheese babybel manchego bocconcini croque monsieur brie. Gouda feta red leicester halloumi cheesy feet babybel highlight. Raclette mascarpone.

> Note: if you like it, please subscribe!
`;

<Markdown markdown={markdown} highlight="highlight" />;
```
