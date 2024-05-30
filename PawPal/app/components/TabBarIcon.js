import Ionicons from '@expo/vector-icons/Ionicons';

export function TabBarIcon({ style, ...rest }) {
  return <Ionicons size={28} style={[{ paddingBottom: 10 }, style]} {...rest} />;
}
