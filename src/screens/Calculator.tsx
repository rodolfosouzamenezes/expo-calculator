import { VStack } from "native-base";
import { Display } from "../components/Display";
import { Keyboard } from "../components/Keyboard";

export function Calculator() {
  return (
    <VStack flex={1} bg='background.900' alignItems='center' safeArea>
      <Display operation="10+5" result={15} />
      <Keyboard />
    </VStack>
  )
}