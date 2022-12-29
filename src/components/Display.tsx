import { Box, Text } from "native-base";

export interface IDisplayProps {
  operation: string;
  result: number | null | undefined;
}

export function Display({ operation, result }: IDisplayProps) {
  return (
    <Box flex={1} w='full' padding='12' alignItems='flex-end' justifyContent='space-between'>
      <Text color='text.900' fontSize={38}>{operation}</Text>
      <Text color='text.800' fontSize={26}>{result || ''}</Text>
    </Box>
  )
}