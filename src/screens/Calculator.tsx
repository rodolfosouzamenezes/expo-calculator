import { useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Display } from "../components/Display";
import { Keyboard, Keys, Operation } from "../components/Keyboard";

export function Calculator() {
  const [lastCharacterOfExpression, setLastCharacterOfExpression] = useState<Keys>('C');
  const [expression, setExpression] = useState<Keys[]>([]);
  const [result, setResult] = useState<string>('');
  const [parenthesesAreClosed, setParenthesesAreClosed] = useState(true);
  const [isSolvable, setIsSolvable] = useState(false);

  const toast = useToast();

  const countParentheses = () => {
    if (expression) {
      let countOpenParentheses = expression.join('').split('(').length - 1;
      let countCloseParentheses = expression.join('').split(')').length - 1;

      countOpenParentheses === countCloseParentheses ? setParenthesesAreClosed(true) : setParenthesesAreClosed(false);

      return {
        countOpenParentheses,
        countCloseParentheses,
      };
    }
  }

  const clearAll = () => {
    setLastCharacterOfExpression('C');
    setExpression([]);
    setResult('');
    setParenthesesAreClosed(true);
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
    if (lastCharacterOfExpression === ')') {
      return setExpression(expression.concat('*', number))
    }
    setLastCharacterOfExpression(number)
    parenthesesAreClosed && setIsSolvable(true)
  }

  const handleParenthesesPressed = () => {
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

  const handleEqualPressed = () => {
    if (!isSolvable) {
      if (!parenthesesAreClosed) {
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

    setLastCharacterOfExpression('C');
    setExpression([eval(expression.join(''))]);
    setResult('');
    setParenthesesAreClosed(true);
    setIsSolvable(false);
  }

  const handleButtonPress = (value: Keys) => {
    typeof value !== 'number' && !parenthesesAreClosed && setIsSolvable(false)

    switch (value) {
      case "C":
        clearAll();
        break;
      case "⌫":
        eraseToTheLeft();
        countParentheses()
        break;
      case '(':
        countParentheses()
        handleParenthesesPressed()
        break;
      case '=':
        handleEqualPressed()
        break;
      default:
        setLastCharacterOfExpression(value)
        setIsSolvable(false)
        setExpression(expression.concat(value))
        if (typeof value === 'number') handleNumberPressed(value)
        break;
    }

    console.log(lastCharacterOfExpression);    
  }


  useEffect(() => {
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