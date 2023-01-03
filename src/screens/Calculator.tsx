import { useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Display } from "../components/Display";
import { Keyboard, Keys, KeysThatAreNotNumbersSet, Operation, OperationsSet } from "../components/Keyboard";

export function Calculator() {
  const [expression, setExpression] = useState<Keys[]>([]);
  const [result, setResult] = useState<string>('');
  const [parenthesesAreClosed, setParenthesesAreClosed] = useState(true);
  const [isSolvable, setIsSolvable] = useState(false);
  var lastCharacterOfExpression: Keys;

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

    return {
      countOpenParentheses: 0,
      countCloseParentheses: 0,
    };
  }

  const verifyItIsSolvable = () => {
    countParentheses();

    if (!parenthesesAreClosed ||
      typeof lastCharacterOfExpression !== 'number' &&
      KeysThatAreNotNumbersSet.has(lastCharacterOfExpression)
    ) {
      return setIsSolvable(false)
    }
    return setIsSolvable(true)
  };

  const handleClear = () => {
    lastCharacterOfExpression = 'C';
    setExpression([]);
    setResult('');
    setParenthesesAreClosed(true);
    setIsSolvable(false);
  };

  const handleEraseToTheLeft = () => {
    // não há nada para apagar
    if (expression.length === 0) return

    // define o último caractere da expressão 
    lastCharacterOfExpression = expression.length === 1 ? 'C' : expression[expression.length - 2]

    // remove o útimo item do array
    setExpression(expression.slice(0, -1));
  }

  const handleParentheses = () => {
    if (!parenthesesAreClosed && (lastCharacterOfExpression !== '(') && (lastCharacterOfExpression !== 'C')) {
      if (lastCharacterOfExpression !== ')' && typeof lastCharacterOfExpression !== 'number') {
        return toast.show({
          title: 'Expressão inválida',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      setIsSolvable(true)
      lastCharacterOfExpression = ')'
      const { countCloseParentheses, countOpenParentheses } = countParentheses();
      countOpenParentheses - countCloseParentheses === 1 && setParenthesesAreClosed(true)

      setExpression(expression.concat(')'))
      return
    }

    if (lastCharacterOfExpression === ')' || typeof lastCharacterOfExpression === 'number') {
      setIsSolvable(false)

      lastCharacterOfExpression = '('

      return setExpression(expression.concat('*', '('))
    }

    setIsSolvable(false)
    lastCharacterOfExpression = '('
    setExpression(expression.concat('('))
  }

  const handleEqual = () => {
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
    lastCharacterOfExpression = 'C';
    setResult('');
    setParenthesesAreClosed(true);
    setIsSolvable(false);
  }

  const handlePoint = () => {

  }

  const handleNumber = (number: number) => {
    if (lastCharacterOfExpression === ')') {
      lastCharacterOfExpression = number
      return setExpression(expression.concat('*', number))
    }
    
    lastCharacterOfExpression = number
    setExpression(expression.concat(number))
  }

  const handleOperation = (operation: Operation) => {

  }

  const handleButtonPress = (value: Keys) => {
    switch (value) {
      case "C":
        handleClear();
        break;
      case "⌫":
        handleEraseToTheLeft();
        break;
      case '=':
        handleEqual()
        break;
      case '(':
        handleParentheses()
        break;
      case ')':
        handleParentheses()
        break;
      case '.':
        handlePoint()
        break;
      default:
        if (typeof value === 'number') handleNumber(value)
        if (typeof value !== 'number' && OperationsSet.has(value)) handleOperation(value)
        break;
    }

    console.log('Last Character of Expression:', lastCharacterOfExpression);
  }


  useEffect(() => {
    verifyItIsSolvable()
    console.log('Parentheses:', parenthesesAreClosed, 'Is Solvable:', isSolvable);

    setResult(isSolvable ? eval(expression.join('')) : '')
  })

  return (
    <VStack flex={1} bg='background.900' alignItems='center' safeArea>
      <Display expression={expression} result={result} />
      <Keyboard handleButtonPress={handleButtonPress} />
    </VStack>
  )
}