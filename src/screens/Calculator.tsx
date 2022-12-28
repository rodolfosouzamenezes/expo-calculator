import { Text, VStack } from "native-base";
import { Keyboard } from "../components/Keyboard";

export function Calculator() {
  return (
    <VStack flex={1} bg='background.900' alignItems='center' safeArea>
      <Text color='text.900' fontSize={12}>OOOOOOOOOOS</Text>

      <Keyboard />
    </VStack>
  )
}