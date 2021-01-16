/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-namespace */
import type * as ESTree from 'estree';

declare global {
    namespace acorn {
        interface Node {
            type: string;
            body: Array<ESTree.Node>;
        }
    }
}

export const isFunctionDeclaration = (
    node: ESTree.Node
): node is ESTree.FunctionDeclaration => node.type === 'FunctionDeclaration';

export const isVariableDeclaration = (
    node: ESTree.Node
): node is ESTree.VariableDeclaration => node.type === 'VariableDeclaration';

export const isIdentifier = (
    pattern: ESTree.Pattern
): pattern is ESTree.Identifier => pattern.type === 'Identifier';

export const isArrayExpression = (
    expression: ESTree.Expression | ESTree.SpreadElement | undefined | null
): expression is ESTree.ArrayExpression =>
    expression?.type === 'ArrayExpression';

export const isNotFalsy = <T>(obj: T | null): obj is T => !!obj;
