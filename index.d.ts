// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
import {
  ToCssOptions,
  JssOptions,
  generateClassName,
  StyleSheet,
  Jss
} from "./src/types.d";

export { RuleList } from "./src/types.d";
/*~ If this module has methods, declare them as functions like so.
 */
export function getDynamicStyles(styles: object): object | null;

export class SheetsRegistry {
  index: number;
  add(sheet: StyleSheet): void;
  reset(): void;
  remove(sheet: StyleSheet): void;
  toString(options?: ToCssOptions): string;
}
export class SheetsManager {
  sheets: Array<StyleSheet>;
  refs: Array<number>;
  keys: Array<object>;
  size: number;
  get(key: object): StyleSheet;
  add(key: object, sheet: StyleSheet): number;
  manage(key: object): StyleSheet;
  unmanage(key: object): void;
}

export let sheets: SheetsRegistry;

export function createGenerateClassName(): generateClassName;
/*~ You can declare types that are available via importing the module */
export interface someType {
  name: string;
  length: number;
  extras?: string[];
}

/*~ You can declare properties of the module using const, let, or var */
export const create: (options?: JssOptions) => Jss; //=> new jss(options);

/*~ If there are types, properties, or methods inside dotted names
 *~ of the module, declare them inside a 'namespace'.
 */
