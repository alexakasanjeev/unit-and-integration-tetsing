const { tokenizer, parser, compiler } = require('./compiler');

test('tokenizer: convert input string into tokens', () => {
    // Setup - create objects, variables, and set conditions that your test depends on
    const inputString = '(add 2 (subtract 4 3))';
    const expectedResult = [
        { type: 'paren', value: '(' },
        { type: 'name', value: 'add' },
        { type: 'number', value: '2' },
        { type: 'paren', value: '(' },
        { type: 'name', value: 'subtract' },
        { type: 'number', value: '4' },
        { type: 'number', value: '3' },
        { type: 'paren', value: ')' },
        { type: 'paren', value: ')' },
    ];

    // Exercise - execute the functionality you are testing
    const result = tokenizer(inputString);

    // Verify - check your expectations against the result of the exercise phase.
    expect(result).toEqual(expectedResult);
});

test('parser: convert tokens into abstract syntax tree', () => {
    // Setup - create objects, variables, and set conditions that your test depends on
    const tokens = [
        { type: 'paren', value: '(' },
        { type: 'name', value: 'add' },
        { type: 'number', value: '2' },
        { type: 'paren', value: '(' },
        { type: 'name', value: 'subtract' },
        { type: 'number', value: '4' },
        { type: 'number', value: '3' },
        { type: 'paren', value: ')' },
        { type: 'paren', value: ')' },
    ];
    const expectedResult = {
        type: 'Program',
        body: [
            {
                type: 'CallExpression',
                name: 'add',
                params: [
                    {
                        type: 'NumberLiteral',
                        value: '2'
                    },
                    {
                        type: 'CallExpression',
                        name: 'subtract',
                        params: [
                            {
                                type: 'NumberLiteral',
                                value: '4'
                            },
                            {
                                type: 'NumberLiteral',
                                value: '3',
                            }
                        ]
                    }
                ]
            }
        ]
    };

    // Exercise - execute the functionality you are testing
    const result = parser(tokens);

    // Verify - check your expectations against the result of the exercise phase.
    expect(result).toEqual(expectedResult);
});


test('Compiler should turn `input` into `output`', () => {
    // Setup - create objects, variables, and set conditions that your test depends on
    const inputString = '(add 2 (subtract 4 3))';
    const expectedResult = 'add(2, subtract(4, 3));';

    // Exercise - execute the functionality you are testing
    const result = compiler(inputString);

    // Verify - check your expectations against the result of the exercise phase.
    expect(result).toBe(expectedResult);
});