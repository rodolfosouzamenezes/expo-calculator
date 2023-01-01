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

  const countParentheses = (): { countOpenParentheses: number, countCloseParentheses: number } => {
    if (expression) {
      let countOpenParentheses = expression.join('').split('(').length - 1;
      let countCloseParentheses = expression.join('').split(')').length - 1;

      countOpenParentheses === countCloseParentheses ? setParenthesesAreClosed(true) : setParenthesesAreClosed(false);

      return {
        countOpenParentheses,
        countCloseParentheses,
      };
    }

    return {
      countOpenParentheses: 0,
      countCloseParentheses: 0,
    };
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

      
      expression[expression.length - 1] === ')' && setParenthesesAreClosed(false)
      typeof expression[expression.length - 2] === 'number' && expression[expression.length - 1] === ')' ? setIsSolvable(true) : setIsSolvable(false)
      setExpression(expression.slice(0, -1));
    }
  }

  const handleNumberPressed = (number: number) => {
    if (lastCharacterOfExpression === ')') {
      return setExpression(expression.concat('*', number))
    }
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
      const { countCloseParentheses, countOpenParentheses } = countParentheses();
      countOpenParentheses - countCloseParentheses === 1 && setParenthesesAreClosed(true)

      setExpression(expression.concat(')'))
      return
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

    let stringExpressionResult = String(eval(expression.join('')));
    let arrayResult: Keys[] = stringExpressionResult.split('').map(character => {
      return character === '.' ? '.' : Number(character);
    })

    arrayResult[0] === 0 ? setExpression([]) : setExpression(arrayResult);
    setLastCharacterOfExpression('C');
    setResult('');
    setParenthesesAreClosed(true);
    setIsSolvable(false);
  }

  const handleButtonPress = (value: Keys) => {
    typeof value !== 'number' && !parenthesesAreClosed && setIsSolvable(false)
    countParentheses()

    switch (value) {
      case "C":
        clearAll();
        break;
      case "⌫":
        eraseToTheLeft();
        countParentheses()
        break;
      case '(':
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

    countParentheses()
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