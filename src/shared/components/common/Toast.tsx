import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { ColorToken } from '@/core/theme';
import { Text } from '../ui';

type ToastProps = {
  text1: string;
  text2?: string;
  bgColor: string;
  textColor: ColorToken;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

function Toast({ text1, text2, bgColor, textColor, icon }: ToastProps) {
  return (
    <View style={[styles.container, { borderColor: bgColor }]}>
      {icon ? (
        <View style={[styles.icon, { backgroundColor: bgColor, borderRadius: 8 }]}>
          <MaterialCommunityIcons name={icon} size={14} color={textColor} />
        </View>
      ) : null}

      <View style={styles.toastContent}>
        <Text variant="heading" color={textColor}>
          {text1}
        </Text>

        {text2 ? (
          <Text variant="body" color={textColor}>
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white[100],
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  icon: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastContent: {
    flex: 1,
    marginLeft: 10,
  },
}));

export const ToastConfig = (theme: any) => {
  return {
    success: (props: any) => (
      <Toast
        bgColor={theme.colors.success[100]}
        textColor={theme.colors.success[300]}
        icon="Check"
        {...props}
      />
    ),
    warning: (props: any) => (
      <Toast
        bgColor={theme.colors.warning[100]}
        textColor={theme.colors.warning[300]}
        icon="Warning"
        {...props}
      />
    ),
    error: (props: any) => (
      <Toast
        bgColor={theme.colors.danger[100]}
        textColor={theme.colors.danger[300]}
        icon="X"
        {...props}
      />
    ),
  };
};
