import styled from '@emotion/native';
import {Text} from 'react-native-paper';

const Label = styled(Text)`
  color: #222222;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  width: 88px;
`;

const RequiredStar = styled(Text)`
  color: #ec666c;
`;

const S = {Label, RequiredStar};

export default S;
