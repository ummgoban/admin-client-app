import styled from '@emotion/native';

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
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
`;

const InputRow = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  gap: 36px;
  justify-content: flex-start;
`;

const TagButton = styled.TouchableOpacity<{isSelected: boolean}>`
  background-color: ${props =>
    props.isSelected ? props.theme.colors.pressed : 'white'};
  border-radius: 8px;
  padding: 8px 12px;
  margin: 4px;
  border: 1px solid;
  border-color: ${props => (props.isSelected ? 'white' : '#E0E0E0')};
`;

const TagText = styled.Text`
  font-size: 14px;
  font-weight: 700;
`;

const AddButtonText = styled.Text`
  color: white;
  font-size: 14px;
`;

const TagList = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: 16px;
`;

const ModalButton = styled.TouchableOpacity<{
  status?: 'error' | 'warning' | 'primary';
}>`
  background-color: ${props => props.theme.colors[props.status || 'primary']};
  border-radius: 8px;
  padding: 10px 16px;
`;

const ModalButtonText = styled.Text`
  color: #ffffff;
  font-size: 14px;
`;

const S = {
  ModalOverlay,
  ModalView,
  InputRow,
  TagButton,
  TagText,
  AddButtonText,
  TagList,
  ButtonContainer,
  ModalButton,
  ModalButtonText,
};

export default S;
