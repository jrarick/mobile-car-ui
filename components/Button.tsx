import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle: object;
  buttonTextStyle: object;
}

const Button = (props: ButtonProps) => {
  const { title, onPress, buttonStyle, buttonTextStyle } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
    >
      <Text style={buttonTextStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;