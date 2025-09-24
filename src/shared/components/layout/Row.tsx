import { SpacingToken } from '@/core/theme';
import { Box } from './Box';
import { BoxProps } from './types';

export interface RowProps extends Omit<BoxProps, 'flexDirection'> {
  gap?: SpacingToken;
  align?: BoxProps['alignItems'];
  justify?: BoxProps['justifyContent'];
}

export const Row: React.FC<RowProps> = ({
  gap,
  align = 'center',
  justify = 'flex-start',
  children,
  ...props
}) => {
  return (
    <Box flexDirection="row" alignItems={align} justifyContent={justify} gap={gap} {...props}>
      {children}
    </Box>
  );
};
