import styled from '@emotion/native';
import C from './Common.style';

const S = {
  Container: styled.View`
    display: flex;
    margin: 32px 16px;
    gap: 16px;
  `,
  InfoTextRowWrapper: styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  InfoBoldText: styled(C.InfoBoldText)``,
  InfoText: styled(C.InfoText)``,
};

export default S;
