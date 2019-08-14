import React, { useCallback, useState } from 'react';
import moment from 'moment';

import { Subject } from 'src/types/Subject';
import { useTheme } from 'src/utils/Theme';

import Flex from 'src/components/common/Flex';
import Text from 'src/components/common/Text';

type SubjectHeaderProps = {
  subject: Subject;
  transparent?: boolean;
  onClick?: () => void;
  onViewReactions?: () => void;
};

const SubjectHeader: React.FC<SubjectHeaderProps> = ({
  subject: {
    subject,
    author,
    date,
    reactionsCount,
  },
  transparent,
  onClick,
  onViewReactions,
}) => {
  const [hover, setHover] = useState(false);
  const {
    sizes: { small, medium, big },
    colors,
    borderRadius,
  } = useTheme();

  const onReactionsCountClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!onViewReactions)
      return;

    e.preventDefault();
    onViewReactions();
  }, [onViewReactions]);

  return (
    <Flex
      py={medium}
      px={big}
      flexDirection="row"
      alignItems="center"
      style={{
        backgroundColor: (!transparent || hover) && colors.backgroundLight,
        borderBottom: `1px solid ${colors.borderLight}`,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        cursor: onClick && 'pointer',
        position: 'relative',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >

      <div style={{ maxWidth: '100%' }}>

        <div>
          <Text oneline bold size="big">{ subject }</Text>
        </div>
        <div>
          <Text variant="note" size="small">Par <b>{ author.nick }</b>, le { moment(date).format('DD.MM.YYYY') }</Text>
        </div>

        <Flex
          mr={medium}
          flexDirection="row"
          alignItems="center"
          style={{ position: 'absolute', top: medium, right: 0 }}
          onClick={onReactionsCountClick}
        >
          <Text color="textLight" style={{ marginRight: small }}>
            { reactionsCount }
          </Text>
          <img src="/assets/images/comment.png" style={{ width: 20, height: 20, opacity: 0.8 }} />
        </Flex>

      </div>

    </Flex>
  );
};

export default SubjectHeader;
