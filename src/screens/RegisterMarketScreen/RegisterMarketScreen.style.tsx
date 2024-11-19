import styled from '@emotion/native';
import Postcode from '@actbase/react-daum-postcode';

const RegisterMarketContainer = styled.View`
  flex: 1;
  margin: 16px;
`;

const RegisterMarketInputContainer = styled.ScrollView`
  display: flex;
  flex-direction: column;

  gap: 20px;
`;
const ModalContainer = styled.View`
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.View`
  width: 100%;
  height: 100%;

  background-color: white;

  overflow: hidden;
`;
const StyledPostcode = styled(Postcode)`
  width: 100%;
  height: 100%;
`;

const S = {
  RegisterMarketContainer,
  RegisterMarketInputContainer,
  ModalContainer,
  ModalWrapper,
  StyledPostcode,
};

export default S;
