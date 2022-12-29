import { useToast, VStack } from "native-base";
import { useState } from "react";
import { Display } from "../components/Display";
import { Keyboard, Operations } from "../components/Keyboard";

export function Calculator() {
  const [isSolvable, setIsSolvable] = useState(false);
  const [expression, setExpression] = useState<string>('');

  const toast = useToast();

  const confirmParenthesesAreClosed = (): boolean => {
    if (expression) {
      let countOpenParentheses = expression.split('(').length - 1;
      let countCloseParentheses = expression.split(')').length - 1;

      return countOpenParentheses === countCloseParentheses ? true : false;
    }

    return false;
  }

  const handleButtonPress = (value: Operations) => {
    let lastCharacterOfExpression = expression.substring(expression.length - 1); 
    let parenthesesAreClosed = confirmParenthesesAreClosed()
    setIsSolvable(parenthesesAreClosed)


    if (value === '=' && !isSolvable) {
      if (!parenthesesAreClosed && lastCharacterOfExpression !== '') {
        return toast.show({
          title: 'Expressão inválida, há um parêntese aberto',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      return toast.show({
        title: 'Expressão inválida',
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    if (value === '(' && !parenthesesAreClosed && (lastCharacterOfExpression !== '(') && (lastCharacterOfExpression !== '')) {

      return setExpression(expression + ')')
    }

    if (lastCharacterOfExpression === ')') {
      return setExpression(expression + '*' + value)
    }

    return setExpression(expression + value)
  }

  return (
    <VStack flex={1} bg='background.900' alignItems='center' safeArea>
      <Display expression={expression} result={15} />
      <Keyboard handleButtonPress={handleButtonPress} />
    </VStack>
  )
}