import styled from '@emotion/native';
import {ScrollView} from 'react-native-gesture-handler';

const S = {
  ModalOverlay: styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  `,

  ModalView: styled.View`
    width: 100%;

    background-color: white;
  `,

  ModalScrollView: styled(ScrollView)`
    width: 100%;
    height: 100%;
  `,
  ModalCloseButton: styled.TouchableOpacity`
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1;
  `,
  ModalViewInner: styled.View`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;
  `,

  ModalImageWrapper: styled.TouchableOpacity``,

  ModalImage: styled.Image`
    width: 120px;
    height: 120px;
    margin: 8px;
  `,
  InputRow: styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
    gap: 16px;
    justify-content: flex-start;
  `,
  InputLabel: styled.Text`
    color: #222222;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    width: 88px;
  `,
  DiscountRateLabel: styled.Text`
    color: red;
    height: 32px;
    width: 180px;
  `,
  TextInputContainer: styled.TextInput`
    width: 180px;
    padding-horizontal: 8px;
    background-color: white;
    margin-bottom: 12px;
    height: 48px;
  `,
  StatusButtonContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,

  StatusButton: styled.TouchableOpacity<{isActive: boolean}>`
    width: 60px;
    height: 32px;
    border-radius: 5px;
    margin-right: 5px;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: ${props =>
      props.isActive ? props.theme.colors.primary : '#E0E0E0'};
  `,
  StatusButtonText: styled.Text`
    font-weight: bold;
  `,
  ButtonContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;
    padding-top: 12px;
  `,

  ModalButton: styled.TouchableOpacity<{
    status?: 'error' | 'warning' | 'primary';
  }>`
    padding: 10px;
    border-radius: 8px;
    margin-top: 20px;
    margin-bottom: 20px;

    background-color: ${props => props.theme.colors[props.status || 'primary']};
  `,
  ModalButtonText: styled.Text`
    color: white;
  `,

  TagsFlexWrap: styled.View`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    flex: 1;
  `,
  TagButtonWrapper: styled.View`
    background-color: #e0e0e0;
    display: flex;
    flex-direction: row;
    gap: 4px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 12px;
  `,
  XIcon: styled.Image`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 24px;
    right: 24px;
  `,

  TagRemoveButton: styled.TouchableOpacity``,
};

export default S;
