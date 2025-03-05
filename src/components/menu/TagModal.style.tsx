import styled from '@emotion/native';

const S = {
  ModalOverlay: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `,

  ModalView: styled.View`
    width: 88%;
    padding: 20px;
    border-radius: 10px;
    background-color: #f5f5f5;
    align-items: center;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 5;
  `,

  InputRow: styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
    gap: 36px;
    justify-content: flex-start;
  `,

  TagButton: styled.TouchableOpacity<{isSelected: boolean}>`
    background-color: ${props =>
      props.isSelected ? props.theme.colors.primaryPressed : 'white'};
    border-radius: 8px;
    padding: 8px 12px;
    margin: 4px;
    border: 1px solid;
    border-color: ${props => (props.isSelected ? 'white' : '#E0E0E0')};
  `,

  TagText: styled.Text`
    font-size: 14px;
    font-weight: 700;
  `,

  AddButtonText: styled.Text`
    color: white;
    font-size: 14px;
  `,

  TagList: styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 16px;
  `,

  ButtonContainer: styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-top: 16px;
  `,

  ModalButton: styled.TouchableOpacity<{
    status?: 'error' | 'warning' | 'primary';
  }>`
    background-color: ${props => props.theme.colors[props.status || 'primary']};
    border-radius: 8px;
    padding: 10px 16px;
  `,

  ModalButtonText: styled.Text`
    color: #ffffff;
    font-size: 14px;
  `,
};

export default S;
