```tsx
import makeComment from 'src/test/makeComment';
import makeUser from 'src/test/makeUser';

const user = makeUser({ nick: 'Myself' });
const author = makeUser({ nick: 'Nicolas Tesla' });

const comment = makeComment({
  text: 'Some random comment',
  repliesCount: 2,
  reactionsCount: {
    like: 5,
    approve: 4,
    think: 3,
    disagree: 2,
    dontUnderstand: 1,
  },
  author,
});

const [replies, setReplies] = React.useState();
const [repliesLoading, setRepliesLoading] = React.useState(false);

React.useEffect(() => {
  if (repliesLoading) {
    const timeout = setTimeout(() => {
      setRepliesLoading(false);
      setReplies([
        makeComment({ id: 2, author: makeUser({ nick: 'Alan Turin' }), text: 'reply 1', repliesCount: 0 }),
        makeComment({ id: 3, author: makeUser({ nick: 'Karl Popper' }), text: 'reply 2', repliesCount: 0 }),
      ]);
    }, 1000);

    return () => clearTimeout(timeout);
  }
}, [repliesLoading]);

const fetchReplies = () => {
  if (replies === undefined) {
    setRepliesLoading(true);
  }
};

const handleEdit = text => {
  console.log(`edit comment: "${text}"`);
};

const handleReply = text => {
  console.log(`reply to comment: "${text}"`);
};

const handleReport = () => {
  console.log(`report comment`);
};

const handleToggleSubscription = () => {
  console.log(`toggle subscrption`);
};

const handleUserReactionChange = type => {
  console.log(`user reaction change: ${type}`);
};

// this should be defined in the global scope, rather than inside this "component" created by styleguidist
const CommentContainer = props => (
  <Comment
    CommentContainer={CommentContainer}
    user={user}
    comment={props.comment}
    replies={props.comment === comment ? replies : undefined}
    repliesLoading={repliesLoading}
    submittingEdition={false}
    submittingReply={false}
    onEdit={handleEdit}
    onReport={handleReport}
    onUserReactionChange={handleUserReactionChange}
    onToggleSubscription={handleToggleSubscription}
    onReply={handleReply}
    fetchReplies={fetchReplies}
  />
);

<CommentContainer comment={comment} />;
```
