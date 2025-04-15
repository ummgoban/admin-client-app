import styled from '@emotion/native';

const S = {
  TouchableWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,
  TouchableButtonContainer: styled.TouchableOpacity``,
  NoticeText: styled.Text<{fontSize?: string; fontColor?: string}>`
    font-size: ${({fontSize}) => fontSize};
    line-height: ${({fontSize}) =>
      fontSize ? `${parseInt(fontSize, 10) + 4}px` : 'auto'};
    font-weight: 600;
    color: ${({fontColor}) => fontColor};
  `,
};

export default S;
