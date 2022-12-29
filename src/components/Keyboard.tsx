import { HStack, VStack } from "native-base";
import { Button } from "./Button";

export type Operations = number | 'C' | '%' | '/' | '*' | '-' | '+' | '⌫' | '=' | '.' | '(';
export interface IKeyboardProps {
  handleButtonPress: (value: Operations) => void;
}

export function Keyboard({ handleButtonPress }: IKeyboardProps) {
  return (
    <VStack pt={4} borderTopColor='background.800' borderTopWidth={2}>
      <HStack justifyContent='space-evenly' w='full' mb={4}>
        <Button type='clear' text='C' onPress={() => handleButtonPress('C')} />
        <Button type='operator' text='%' onPress={() => handleButtonPress('%')} />
        <Button type='operator' text='÷' onPress={() => handleButtonPress('/')} />
        <Button type='operator' text='x' onPress={() => handleButtonPress('*')} />
      </HStack>

      <HStack justifyContent='space-evenly' w='full' mb={4}>
        <Button type='default' text='7' onPress={() => handleButtonPress(7)} />
        <Button type='default' text='8' onPress={() => handleButtonPress(8)} />
        <Button type='default' text='9' onPress={() => handleButtonPress(9)} />
        <Button type='operator' text='—' onPress={() => handleButtonPress('-')} />
      </HStack>

      <HStack justifyContent='space-evenly' w='full' mb={4}>
        <Button type='default' text='4' onPress={() => handleButtonPress(4)} />
        <Button type='default' text='5' onPress={() => handleButtonPress(5)} />
        <Button type='default' text='6' onPress={() => handleButtonPress(6)} />
        <Button type='operator' text='+' onPress={() => handleButtonPress('+')} />
      </HStack>

      <HStack justifyContent='space-evenly' w='full' mb={4}>
        <Button type='default' text='1' onPress={() => handleButtonPress(1)} />
        <Button type='default' text='2' onPress={() => handleButtonPress(2)} />
        <Button type='default' text='3' onPress={() => handleButtonPress(3)} />
        <Button type='clear' text='⌫' onPress={() => handleButtonPress('⌫')} />
      </HStack>

      <HStack justifyContent='space-evenly' w='full' mb={4}>
        <Button type='default' text='( )' onPress={() => handleButtonPress('(')} />
        <Button type='default' text='0' onPress={() => handleButtonPress(0)} />
        <Button type='default' text=',' onPress={() => handleButtonPress('.')} />
        <Button type='equal' text='=' onPress={() => handleButtonPress('=')} />
      </HStack>
    </VStack>
  )
}