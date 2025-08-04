import styled from '@emotion/native';
import {Button, Text} from 'react-native-paper';

export const HORIZONTAL_MARGIN = 16;
export const IMAGE_CARD_GAP = 8;

const S = {
  Container: styled.View`
    flex: 1;
  `,

  ScrollView: styled.ScrollView`
    padding: 16px;

    margin-bottom: 32px;
  `,

  InputContainer: styled.View`
    display: flex;
    flex-direction: column;

    gap: 8px;
  `,

  BusinessTimeInput: styled.View`
    padding: 12px 40px;
  `,

  TimeHeader: styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
    padding: 0 16px;
  `,

  DayHeaderText: styled(Text)`
    flex: 1;
    text-align: left;
    font-weight: bold;
    font-size: 14px;
  `,

  TimeHeaderText: styled(Text)`
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
  `,

  ClosedHeaderText: styled(Text)`
    flex: 1;
    text-align: right;
    font-weight: bold;
    font-size: 14px;
  `,

  TimeContainer: styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 4px;
    padding: 0 8px;
  `,

  DayText: styled(Text)`
    flex: 1;
    text-align: left;
  `,

  TimeRange: styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,

  ClosedCheckboxWrapper: styled.View`
    display: flex;
    flex: 1;
    align-items: flex-end;
  `,

  ClosedCheckboxContainer: styled.View`
    width: 36px;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    margin: 4px;
  `,

  TimePickerButton: styled(Button)``,

  ImageCardGrid: styled.View`
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

    height: 92px;
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

    display: flex;
    background-color: #fff;
    justify-content: center;
    align-items: center;
  `,
};

export default S;
