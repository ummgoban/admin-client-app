import {Platform} from 'react-native';

export function generateCssOf(
  css: Partial<{[key in typeof Platform.OS]: string}>,
): string | undefined {
  const currentPlatform = Platform.OS;

  return css[currentPlatform];
}
