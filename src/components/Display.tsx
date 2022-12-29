import { Box, Text } from "native-base";

export interface IDisplayProps {
  expression : string;
  result: number | null | undefined;
}

export function Display({ expression, result }: IDisplayProps) {
  const formatExpression = (unformattedExpression: string) => {
    let formattedExpression = unformattedExpression.replace(/\*/g, "x").replace(/\//g, "÷");

    return formattedExpression;
  };

  const formattedExpression = formatExpression(expression);

  

  return (
    <Box flex={1} w='full' padding='12' alignItems='flex-end' justifyContent='space-between'>
      <Text color='text.900' fontSize={38}>{formattedExpression || '0'}</Text>
      <Text color='text.800' fontSize={26}>{result || ''}</Text>
    </Box>
  )
}