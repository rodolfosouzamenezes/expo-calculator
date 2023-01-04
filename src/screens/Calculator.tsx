import { useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Display } from "../components/Display";
import { Keyboard, Keys, KeysThatAreNotNumbersSet, Operation, OperationsSet } from "../components/Keyboard";

export function Calculator() {
  const [expression, setExpression] = useState<Keys[]>([]);
  const [result, setResult] = useState<string>('');
  const [parenthesesAreClosed, setParenthesesAreClosed] = useState(true);
  const [isSolvable, setIsSolvable] = useState(false);
  const [lastCharacterOfExpression, setLastCharacterOfExpression] = useState<Keys>('C');

  console.log('updated component')

  const toast = useToast();

  const showToast = (
    message: string,
    type: 'error' | 'info' = 'info',
    durationInMilliseconds: number = 1200
  ) => {
    toast.show({
      title: message,
      placement: type === 'error' ? 'top' : 'bottom',
      bgColor: type === 'error' ? 'red.500' : 'muted.700',
      duration: durationInMilliseconds,
      minW: '3/6',
      alignItems: 'center'
    })
  }

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
    const { countCloseParentheses, countOpenParentheses } = countParentheses()
    const unclosedParentheses = countOpenParentheses - countCloseParentheses;

    if (unclosedParentheses !== 0 ||
      (typeof lastCharacterOfExpression !== 'number' && lastCharacterOfExpression !== ')')
    ) {
      setResult('')
      return setIsSolvable(false)
    }

    setResult(eval(expression.join('')))
    return setIsSolvable(true)
  };

  const handleClear = () => {
    setLastCharacterOfExpression('C');
    setExpression([]);
    setResult('');
    setParenthesesAreClosed(true);
    setIsSolvable(false);
  };

  const handleEraseToTheLeft = () => {
    // não há nada para apagar
    if (expression.length === 0) return

    // define o último caractere da expressão 
    setLastCharacterOfExpression(expression.length === 1 ? 'C' : expression[expression.length - 2])

    if (lastCharacterOfExpression === ')') setParenthesesAreClosed(false)

    // remove o útimo item do array
    setExpression(expression.slice(0, -1));
  }

  const handleParentheses = () => {
    if (!parenthesesAreClosed &&
      (typeof lastCharacterOfExpression === 'number' || lastCharacterOfExpression === ')')
    ) {
      setIsSolvable(false)

      setLastCharacterOfExpression(')')
      return setExpression(expression.concat(')'))
    }

    if (lastCharacterOfExpression === '.') {
      setIsSolvable(false)

      setLastCharacterOfExpression('(')

      return setExpression(expression.concat(0, '*', '('))
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

  const handleEqual = () => {
    if (!isSolvable) {
      if (!parenthesesAreClosed) {
        showToast('Expressão inválida, há um parêntese aberto', 'error')
        return
      }

      showToast('Expressão inválida', 'error')
      return
    }

    let stringExpressionResult = String(eval(expression.join('')));
    let arrayResult: Keys[] = stringExpressionResult.split('').map(character => {
      return character === '.' ? '.' : Number(character);
    })

    arrayResult[0] === 0 ? setExpression([0]) : setExpression(arrayResult);
    setLastCharacterOfExpression(arrayResult[arrayResult.length-1])
    setResult('');
    setParenthesesAreClosed(true);
    setIsSolvable(false);
  }

  const handlePoint = () => {
    setLastCharacterOfExpression('.')
    if (lastCharacterOfExpression === ')') return setExpression(expression.concat('*', 0, '.'))
    if (typeof lastCharacterOfExpression !== 'number') return setExpression(expression.concat(0, '.'))

    setExpression(expression.concat('.'))
  }

  const handleNumber = (number: number) => {
    if (lastCharacterOfExpression === ')') {
      setLastCharacterOfExpression(number)
      return setExpression(expression.concat('*', number))
    }

    setLastCharacterOfExpression(number)
    setExpression(expression.concat(number))
  }

  const handleOperation = (operation: Operation) => {
    let copyExpression = [...expression];
    if (typeof lastCharacterOfExpression !== 'number' && OperationsSet.has(lastCharacterOfExpression)) {
      setLastCharacterOfExpression(operation)
      copyExpression.pop()
      return setExpression(copyExpression.concat(operation))
    }

    setLastCharacterOfExpression(operation)
    setExpression(copyExpression.concat(operation))
  }

  const handleButtonPress = async (value: Keys) => {
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
  }

  useEffect(() => {
    verifyItIsSolvable()
    console.log(
      '\x1b[32m%s',
      'Last Character of Expression:', lastCharacterOfExpression,
      '| Parentheses:', parenthesesAreClosed,
      '| Is Solvable:', isSolvable
    );
  }, [expression])

  return (
    <VStack flex={1} bg='background.900' alignItems='center' safeArea>
      <Display expression={expression} result={result} />
      <Keyboard onButtonPress={handleButtonPress} onButtonLongPress={showToast} />
    </VStack>
  )
}