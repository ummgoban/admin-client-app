import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';

async function handleSignInApple() {
  try {
    // Apple 로그인 요청 수행
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // Apple에서 반환한 id_token 출력
    const idToken = appleAuthRequestResponse.identityToken;
    console.log('id_token:', idToken);

    // 인증 상태 확인
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      console.log('User is authenticated');
    } else {
      console.log('User is not authenticated');
    }
  } catch (error) {
    console.error('Apple Sign-In Error:', error);
  }
}

function AppleLogin() {
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: '100%', // You must specify a width
        height: 45, // You must specify a height
      }}
      onPress={handleSignInApple}
    />
  );
}

export default AppleLogin;
