import {
  ToCssOptions,
  JssOptions,
  generateClassName,
  StyleSheet,
  Jss
} from "./src/types.d";

export { RuleList } from "./src/types.d";

export function getDynamicStyles(styles: any): any | null;

export class SheetsRegistry {
  registry: Array<StyleSheet>;
  index: number;
  add(sheet: StyleSheet): void;
  reset(): void;
  remove(sheet: StyleSheet): void;
  toString(options?: ToCssOptions): string;
}
export class SheetsManager {
  sheets: Array<StyleSheet>;
  refs: Array<number>;
  keys: Array<any>;
  size: number;
  get(key: any): StyleSheet;
  add(key: any, sheet: StyleSheet): number;
  manage(key: any): StyleSheet;
  unmanage(key: any): void;
}

export let sheets: SheetsRegistry;

export function createGenerateClassName(): generateClassName;

export const create: (options?: JssOptions) => Jss;

declare const jssInstance: Jss;
export default jssInstance;
