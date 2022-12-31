import { useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Display } from "../components/Display";
import { Keyboard, Keys, Operation } from "../components/Keyboard";

export function Calculator() {
  const [isSolvable, setIsSolvable] = useState(false);
  const [expression, setExpression] = useState<Keys[]>([]);
  const [lastCharacterOfExpression, setLastCharacterOfExpression] = useState<Keys>('C');
  const [result, setResult] = useState<string>('');

  const toast = useToast();

  const confirmParenthesesAreClosed = (): boolean => {
    if (expression) {
      let countOpenParentheses = expression.join('').split('(').length - 1;
      let countCloseParentheses = expression.join('').split(')').length - 1;

      return countOpenParentheses === countCloseParentheses ? true : false;
    }

    return false;
  }

  const clearAll = () => {
    setResult('');
    setExpression([]);
    setIsSolvable(false);
  };

  const eraseToTheLeft = () => {
    if (expression.length !== 0) {
      expression.length > 2 && setLastCharacterOfExpression(expression[expression.length - 2])

      if (expression.length === 1) setLastCharacterOfExpression('C')

      setExpression(expression.slice(0, -1));

      typeof expression[expression.length - 2] === 'number' && setIsSolvable(true)
    }
  }

  const handleNumberPressed = (number: number) => {
    let parenthesesAreClosed = confirmParenthesesAreClosed()

    if (lastCharacterOfExpression === ')') {
      return setExpression(expression.concat('*', number))
    }
    setLastCharacterOfExpression(number)
    !parenthesesAreClosed && setIsSolvable(false)
  }

  const handleParenthesesPressed = () => {
    let parenthesesAreClosed = confirmParenthesesAreClosed()

    if (!parenthesesAreClosed && (lastCharacterOfExpression !== '(') && (lastCharacterOfExpression !== 'C')) {
      if (lastCharacterOfExpression !== ')' && typeof lastCharacterOfExpression !== 'number') {
        return toast.show({
          title: 'Expressão inválida',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      setIsSolvable(true)
      setLastCharacterOfExpression(')')

      return setExpression(expression.concat(')'))
    }

    if (lastCharacterOfExpression === ')' || typeof lastCharacterOfExpression === 'number') {
      setIsSolvable(false)

      setLastCharacterOfExpression('(')

      return setExpression(expression.concat('*', '('))
    }

    setIsSolvable(false)
    setLastCharacterOfExpression('(')
    setExpression(expression.concat('('))
  }

  const handleButtonPress = (value: Keys) => {
    let parenthesesAreClosed = confirmParenthesesAreClosed()
    // let lastCharacterOfExpression = expression.at(-1);
    // setIsSolvable(parenthesesAreClosed)

    typeof value !== 'number' && !parenthesesAreClosed && setIsSolvable(false)

    switch (value) {
      case "C":
        clearAll();
        break;
      case "⌫":
        eraseToTheLeft();
        break;
      case '(':
        handleParenthesesPressed()
        break;
      default:
        setLastCharacterOfExpression(value)
        setIsSolvable(false)
        setExpression(expression.concat(value))
        if (typeof value === 'number') handleNumberPressed(value)
        break;
    }

    console.log(lastCharacterOfExpression);


    // if (value === '=' && !isSolvable) {
    //   if (!parenthesesAreClosed && lastCharacterOfExpression !== '') {
    //     return toast.show({
    //       title: 'Expressão inválida, há um parêntese aberto',
    //       placement: 'top',
    //       bgColor: 'red.500'
    //     })
    //   }

    //   return toast.show({
    //     title: 'Expressão inválida',
    //     placement: 'top',
    //     bgColor: 'red.500'
    //   })
    // }

    // if (value === '=') return setResult(eval(expression))

    // if (value === '(' && !parenthesesAreClosed && (lastCharacterOfExpression !== '(') && (lastCharacterOfExpression !== '')) {
    //   setIsSolvable(true)

    //   return setExpression(expression + ')')
    // }

    // if (lastCharacterOfExpression === ')') {
    //   return setExpression(expression + '*' + value)
    // }

    // return setExpression(expression + value)

  }


  useEffect(() => {
    let parenthesesAreClosed = confirmParenthesesAreClosed()

    parenthesesAreClosed && isSolvable && setResult(eval(expression.join('')))
    !isSolvable && setResult('')
  })

  return (
    <VStack flex={1} bg='background.900' alignItems='center' safeArea>
      <Display expression={expression} result={result} />
      <Keyboard handleButtonPress={handleButtonPress} />
    </VStack>
  )
}