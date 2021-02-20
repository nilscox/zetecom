import styled from '@emotion/styled';

import { fontSize, fontWeight, spacing } from 'src/theme';

const PopupTitle = styled.div`
  margin: ${spacing(4, 0)};
  font-size: ${fontSize('xlarge')};
  font-weight: ${fontWeight('bold')};
`;

export default PopupTitle;
