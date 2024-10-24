type ReturnTypeOfFunction<T> = T extends (...args: any[]) => infer R ? R : never;

function exampleFunction(): string { 
    return 'Hi!';
}

type resultType = ReturnTypeOfFunction<typeof exampleFunction>

type FunctionInfo<T> = T extends (arg: infer A) => infer R ? [R , A] : never; 

function exampleFunction2(param: string): number {
    return param.length;
}

type resultType2 = FunctionInfo<typeof exampleFunction2>