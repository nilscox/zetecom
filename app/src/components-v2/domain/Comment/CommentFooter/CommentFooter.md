```tsx
const reactionsCounts = {
  like: 6,
  approve: 10,
  makesMeThink: 23,
  disagree: 0,
  dontUnderstand: 4,
};

const [userReaction, setUserReaction] = React.useState(null);
const [repliesOpen, setRepliesOpen] = React.useState(false);
const [isSubscribed, setIsSubscribed] = React.useState(false);
const [loadingReplies, setLoadingReplies] = React.useState(false);

React.useEffect(() => {
  if (repliesOpen) {
    setLoadingReplies(true);
    const timeout = setTimeout(() => setLoadingReplies(false), 1000);
    return () => clearTimeout(timeout);
  }
}, [repliesOpen]);

<CommentFooter
  userReaction={userReaction}
  reactionsCounts={reactionsCounts}
  repliesLoading={loadingReplies}
  repliesOpen={repliesOpen}
  repliesCount={42}
  replyFormOpen={false}
  isSubscribed={isSubscribed}
  onUserReactionChange={type => setUserReaction(type !== userReaction ? type : null)}
  onToggleReplies={() => setRepliesOpen(!repliesOpen)}
  onOpenReplyForm={() => {}}
  onToggleSubscription={() => setIsSubscribed(!isSubscribed)}
/>;
```
