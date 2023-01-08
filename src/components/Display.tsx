import { Box, Text } from "native-base";
import { Keys } from "./Keyboard";

export interface IDisplayProps {
  expression : Keys[];
  result: string;
}

export function Display({ expression, result }: IDisplayProps) {
  const formatExpression = (unformattedExpression: Keys[]) => {
    let formattedExpression = unformattedExpression.join('')
    .replace(/\*/g, "x")
    .replace(/\//g, "÷")
    .replace(/\./g, ",");

    return formattedExpression;
  };

  const formattedResult = String(result).replace(/\./g, ",");
  const formattedExpression = formatExpression(expression);
  return (
    <Box w='full' h='2/5' padding='8' alignItems='flex-end' justifyContent='space-between'>
      <Text color='text.900' fontSize={38}>{formattedExpression || '0'}</Text>
      <Text color='text.800' fontSize={26}>{typeof result === 'number' ? formattedResult : ''}</Text>
    </Box>
  )
}