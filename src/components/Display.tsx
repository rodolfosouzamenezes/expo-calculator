import { Box, Text } from "native-base";
import { Keys } from "./Keyboard";

export interface IDisplayProps {
  expression : Keys[];
  result: string;
}

export function Display({ expression, result }: IDisplayProps) {
  const formatExpression = (unformattedExpression: Keys[]) => {
    let formattedExpression = unformattedExpression.join('').replace(/\*/g, "x").replace(/\//g, "÷");

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