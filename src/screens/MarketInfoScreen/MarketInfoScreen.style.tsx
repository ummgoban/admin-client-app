import styled from '@emotion/native';
import {Button} from 'react-native-paper';

export const HORIZONTAL_MARGIN = 16;
export const IMAGE_CARD_GAP = 8;

const Container = styled.View`
  flex: 1;
  margin: 0 16px;
`;

const ScrollView = styled.ScrollView``;

const TimeContainer = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;

const TimePickerButton = styled(Button)``;

const ImageCardGrid = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  gap: 8px;

  margin: 16px 0;
`;

const ImageCardPlusButton = styled(Button)`
  border: 1px solid #e0e0e0;

  width: 100%;

  margin: 16px 0;
`;

const ImageCard = styled.View<{width: number}>`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: ${props => props.width}px;
  height: 92px;

  box-sizing: border-box;

  border: 1px solid #e0e0e0;
`;

const Image = styled.Image`
  width: 100%;
  height: 92px;
`;

const DeleteButton = styled.TouchableOpacity`
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
`;

const S = {
  Container,
  ScrollView,
  TimeContainer,
  TimePickerButton,
  ImageCardGrid,
  ImageCardPlusButton,
  ImageCard,
  Image,
  DeleteButton,
};

export default S;
