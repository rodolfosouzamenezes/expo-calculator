import { HStack, VStack } from "native-base";
import { Button } from "./Button";

export function Keyboard() {
  return (
    <VStack pt={4} borderTopColor='background.800' borderTopWidth={2}>
      <HStack justifyContent='space-evenly' w='full' mb={4}>
        <Button type='clear' text='C' />
        <Button type='operator' text='%' />
        <Button type='operator' text='÷' />
        <Button type='operator' text='x' />
      </HStack>

      <HStack justifyContent='space-evenly' w='full' mb={4}>
        <Button type='default' text='7' />
        <Button type='default' text='8' />
        <Button type='default' text='9' />
        <Button type='operator' text='—' />
      </HStack>

      <HStack justifyContent='space-evenly' w='full' mb={4}>
        <Button type='default' text='4' />
        <Button type='default' text='5' />
        <Button type='default' text='6' />
        <Button type='operator' text='+' />
      </HStack>

      <HStack justifyContent='space-evenly' w='full' mb={4}>
        <Button type='default' text='1' />
        <Button type='default' text='2' />
        <Button type='default' text='3' />
        <Button type='clear' text='⌫' />
      </HStack>

      <HStack justifyContent='space-evenly' w='full' mb={4}>
        <Button type='default' text='( )' />
        <Button type='default' text='0' />
        <Button type='default' text=',' />
        <Button type='equal' text='=' />
      </HStack>
    </VStack>
  )
}