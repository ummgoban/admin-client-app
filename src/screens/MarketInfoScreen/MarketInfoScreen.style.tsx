import styled from '@emotion/native';
import {Button} from 'react-native-paper';

export const HORIZONTAL_MARGIN = 16;
export const IMAGE_CARD_GAP = 8;

const S = {
  Container: styled.View`
    flex: 1;
    margin: 0 16px;
  `,
  ScrollView: styled.ScrollView``,

  TimeContainer: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,

  TimePickerButton: styled(Button)``,

  ImageCardGrid: styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    gap: 8px;

    margin: 16px 0;
  `,

  ImageCardPlusButton: styled(Button)`
    border: 1px solid #e0e0e0;

    width: 100%;

    margin: 16px 0;
  `,
  ImageCard: styled.View<{width: number}>`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: ${props => props.width}px;
    height: 92px;

    box-sizing: border-box;

    border: 1px solid #e0e0e0;
  `,

  Image: styled.Image`
    width: 100%;
    height: 92px;
  `,

  DeleteButton: styled.TouchableOpacity`
    position: absolute;
    top: 8px;
    right: 8px;

    width: 32px;
    height: 32px;

    border-radius: 16px;

    background-color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export default S;
