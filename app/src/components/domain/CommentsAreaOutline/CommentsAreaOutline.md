```tsx
const commentsArea = {
  id: 1,
  information: {
    media: 'skeptikon',
    url: 'https://fake.news/info/articles/4269-est-on-vraiment-ici_211220212.html',
    title: 'Est-on vraiment ici, sur terre, ou sommes-nous dans une gigantesque simulation ?',
    author: 'Michel Jean',
    publicationDate: new Date(),
  },
  commentsCount: 192,
};

<CommentsAreaOutline commentsArea={commentsArea} link="commentsArea" />;
```
