```tsx
import makeComment from 'src/test/makeComment';
import makeUser from 'src/test/makeUser';

const reactionsCount = {
  like: 5,
  approve: 4,
  think: 3,
  disagree: 2,
  dontUnderstand: 1,
};

const user = makeUser({ nick: 'Myself' });
const author = makeUser({ nick: 'Nicolas Tesla' });
const comment = makeComment({ text: 'Some random comment', reactionsCount, repliesCount: 2, author });

const [replies, setReplies] = React.useState(null);
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

const getReplies = commentId => {
  if (commentId === comment.id) {
    return replies;
  }

  return [];
};

const fetchReplies = () => {
  if (replies === null) {
    setRepliesLoading(true);
  }
};

const handleEdit = (commentId, text) => {
  console.log(`edit comment ${commentId}: "${text}"`);
};

const handleReply = (commentId, text) => {
  console.log(`reply to comment ${commentId}: "${text}"`);
};

const handleReport = commentId => {
  console.log(`report comment ${commentId}`);
};

const handleToggleSubscription = commentId => {
  console.log(`toggle subscrption ${commentId}`);
};

const handleUserReactionChange = (commentId, type) => {
  console.log(`user reaction change ${commentId}: type`);
};

<Comment
  user={user}
  comment={comment}
  repliesLoading={repliesLoading}
  onEdit={handleEdit}
  onReply={handleReply}
  onReport={handleReport}
  onToggleSubscription={handleToggleSubscription}
  onUserReactionChange={handleUserReactionChange}
  fetchReplies={fetchReplies}
  getReplies={getReplies}
/>;
```
