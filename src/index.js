function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let ops = {
        '+': 1, 
        '-': 1, 
        '*': 2, 
        '/': 2
    };
    let peek = (a) => a[a.length - 1];
    let stack = [];
    let polish;

    polish = expr.split('').reduce((output, token) => {

      if (parseFloat(token)) {
        output.push(token);
      }

      if (token in ops) {
        while (peek(stack) in ops && ops[token] <= ops[peek(stack)])
          output.push(stack.pop());
        stack.push(token);
      }

      if (token == '(') {
        stack.push(token);
      }

      if (token == ')') {
        while (peek(stack) != '(')
          output.push(stack.pop());
        stack.pop();
      }

      return output;
    }, []).concat(stack.reverse()).join(' ');

    let rpn = (ts, s = []) => {
        ts.split(' ').forEach(t =>
        s.push(t == +t ? t : eval(s.splice(-2,1)[0] + t + s.pop())));
        return s[0];
    }

    return rpn(polish);
}

module.exports = {
    expressionCalculator
}