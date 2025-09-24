interface SpacingProps {
  m?: SpacingToken;
  p?: SpacingToken;
  mt?: SpacingToken;
  mb?: SpacingToken;
  ml?: SpacingToken;
  mr?: SpacingToken;
  pt?: SpacingToken;
  pb?: SpacingToken;
  pl?: SpacingToken;
  pr?: SpacingToken;
  px?: SpacingToken;
  py?: SpacingToken;
  mx?: SpacingToken;
  my?: SpacingToken;
}

interface FlexProps {
  flex?: number;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
}

export interface BoxProps extends SpacingProps, FlexProps {
  children?: React.ReactNode;
  bg?: ColorToken;
  width?: number | string;
  height?: number | string;
  borderRadius?: RadiusToken;
  borderWidth?: BorderToken;
  borderColor?: ColorToken;
  gap?: SpacingToken;
}
