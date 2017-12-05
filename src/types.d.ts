export class StyleSheet {
  options: InternalStyleSheetOptions;
  linked: boolean;
  deployed: boolean;
  attached: boolean;
  rules: RuleList;
  renderer: any;
  classes: any;
  constructor(styles: any, options: StyleSheetOptions);
  attach(): StyleSheet;
  detach(): StyleSheet;
  addRule(name: string, decl: JssStyle, options?: RuleOptions): Rule;
  insertRule(rule: Rule): void;
  addRules(style: any, options?: RuleOptions): Array<Rule>;
  getRule(name: string): Rule;
  deleteRule(name: string): boolean;
  indexOf(rule: Rule): number;
  deploy(): StyleSheet;
  link(): StyleSheet;
  update(name?: string, data?: any): StyleSheet;
  toString(options?: ToCssOptions): string;
}

export class RuleList {
  map: { [key: string]: Rule };
  raw: { [key: string]: JssStyle };
  index: Array<Rule>;
  options: RuleListOptions;
  classes: any;
  constructor(options: RuleListOptions);
  add(name: string, decl: JssStyle, options?: RuleOptions): Rule;
  get(name: string): Rule;
  remove(rule: Rule): void;
  indexof(rule: Rule): number;
  process(): void;
  register(rule: Rule, className?: string): void;
  unregister(rule: Rule): void;
  update(name?: string | object, data?: any): void;
  link(cssRules: CSSRuleList): void;
  toString(options?: ToCssOptions): string;
}

export class ConditionalRule implements BaseRule {
  type: string;
  key: string;
  options: RuleOptions;
  rules: RuleList;
  isProcessed: boolean;
  renderable: CSSStyleRule | null;
  constructor(key: string, styles: any, options: RuleOptions);
  getRule(name: string): Rule;
  indexOf(rule: Rule): number;
  addRule(name: string, style: JssStyle, optons?: RuleOptions): Rule;
  toString(options?: ToCssOptions): string;
}

export class KeyframesRule implements BaseRule {
  type: string;
  key: string;
  options: RuleOptions;
  rules: RuleList;
  isProcessed: boolean;
  renderable: CSSStyleRule | null;
  constructor(key: string, frames: any, options: RuleOptions);
  toString(options?: ToCssOptions): string;
}

export class StyleRule implements BaseRule {
  type: string;
  key: string;
  options: RuleOptions;
  isProcessed: boolean;
  renderable: CSSStyleRule | null;
  style: JssStyle;
  selectorText: string;
  renderer: Renderer;
  constructor(key: string, style: JssStyle, options: RuleOptions);
  selector: string;
  prop(name: string, nextValue?: string): StyleRule | string;
  applyTo(renderable: HTMLElement): StyleRule;
  toJSON(): any;
  toString(options?: ToCssOptions): string;
}

export class ViewportRule implements BaseRule {
  type: string;
  key: string;
  isProcessed: boolean;
  options: RuleOptions;
  renderable: CSSStyleRule | null;
  constructor(key: string, style: JssStyle, options: RuleOptions);
  toString(options?: ToCssOptions): string;
}
export class SimpleRule implements BaseRule {
  type: string;
  key: string;
  isProcessed: boolean;
  options: RuleOptions;
  renderable: CSSStyleRule | null;
  constructor(key: string, value: string, options: RuleOptions);
  toString(options?: ToCssOptions): string;
}

export class FontFaceRule implements BaseRule {
  type: string;
  key: string;
  style: JssStyle;
  isProcessed: boolean;
  options: RuleOptions;
  renderable: CSSStyleRule | null;
  constructor(key: string, style: JssStyle, options: RuleOptions);
  toString(options?: ToCssOptions): string;
}

export type ToCssOptions = {
  indent?: number;
};

export type Rule =
  | StyleRule
  | ConditionalRule
  | FontFaceRule
  | KeyframesRule
  | SimpleRule
  | ViewportRule;

export type generateClassName = (rule: Rule, sheet?: StyleSheet) => string;
export class Jss {
  constructor(options?: JssOptions);
  version: string;
  options: InternalJssOptions;
  generateClassName: generateClassName;
  setup(options?: JssOptions): Jss;

  createStylSheet(
    styles: object,
    options: StyleSheetFactoryOptions
  ): StyleSheet;
  removeStyleSheet(sheet: StyleSheet): Jss;
  createRule(
    name?: string,
    style?: JssStyle,
    options?: RuleFactoryOptions
  ): Rule;
}
// TODO
// Find a way to declare all types: Object|string|Array<Object>
export type JssStyle = object;

export interface Renderer {
  constructor(sheet?: StyleSheet): void;
  setStyle(
    cssRule: HTMLElement | CSSStyleRule,
    prop: string,
    value: string
  ): boolean;
  getStyle(cssRule: HTMLElement | CSSStyleRule, prop: string): string;
  setSelector(cssRule: CSSStyleRule, selectorText: string): boolean;
  getKey(cssRule: CSSStyleRule): string;
  attach(): void;
  detach(): void;
  deploy(sheet: StyleSheet): void;
  insertRule(rule: Rule): false | CSSStyleRule;
  deleteRule(cssRule: CSSStyleRule): boolean;
  replaceRule(cssRule: CSSStyleRule, rule: Rule): false | CSSStyleRule;
  indexOf(cssRule: CSSStyleRule): number;
  getRules(): CSSRuleList | void;
}

export type RuleFactoryOptions = {
  selector?: string;
  classes?: Object;
  sheet?: StyleSheet;
  index?: number;
  jss?: Jss;
  generateClassName?: generateClassName;
  Renderer?: Renderer;
};

export type RuleOptions = {
  selector?: string;
  sheet?: StyleSheet;
  index?: number;
  classes: Object;
  jss: Jss;
  generateClassName: generateClassName;
  Renderer: Renderer;
};

export type RuleListOptions = {
  classes: Object;
  generateClassName: generateClassName;
  Renderer: Renderer;
  jss: Jss;
  sheet: StyleSheet;
  parent: ConditionalRule | KeyframesRule | StyleSheet;
};

export interface BaseRule {
  type: string;
  key: string;
  isProcessed: boolean;
  options: RuleOptions;
  toString(options?: ToCssOptions): string;
}

export type Plugin = {
  onCreateRule?: (
    name: string,
    decl: JssStyle,
    options: RuleOptions
  ) => Rule | null;
  onProcessRule?: (rule: Rule, sheet?: StyleSheet) => void;
  onProcessStyle?: (
    style: JssStyle,
    rule: Rule,
    sheet?: StyleSheet
  ) => JssStyle;
  onProcessSheet?: (sheet?: StyleSheet) => void;
  onChangeValue?: (value: string, prop: string, rule: Rule) => string;
};

export type InsertionPoint = string | HTMLElement;

type createGenerateClassName = () => generateClassName;

export type JssOptions = {
  createGenerateClassName?: createGenerateClassName;
  plugins?: Array<Plugin>;
  insertionPoint?: InsertionPoint;
  Renderer?: Renderer;
  virtual?: Boolean;
};

export type InternalJssOptions = {
  createGenerateClassName: createGenerateClassName;
  plugins: Array<Plugin>;
  insertionPoint?: InsertionPoint;
  Renderer: Renderer;
};

export type StyleSheetFactoryOptions = {
  media?: string;
  meta?: string;
  index?: number;
  link?: boolean;
  element?: HTMLStyleElement;
  generateClassName?: generateClassName;
  classNamePrefix?: string;
};

export type StyleSheetOptions = {
  media?: string;
  meta?: string;
  link?: boolean;
  element?: HTMLStyleElement;
  index: number;
  generateClassName: generateClassName;
  classNamePrefix?: string;
  Renderer: Renderer;
  insertionPoint?: InsertionPoint;
  jss: Jss;
};

export type InternalStyleSheetOptions = {
  media?: string;
  meta?: string;
  link?: boolean;
  element?: HTMLStyleElement;
  index: number;
  insertionPoint?: InsertionPoint;
  Renderer: Renderer;
  generateClassName: generateClassName;
  classNamePrefix?: string;
  jss: Jss;
  sheet: StyleSheet;
  parent: ConditionalRule | KeyframesRule | StyleSheet;
  classes: Object;
};

// These types are imported from indefinite-observable.  They should probably
// be moved to flow-typed.

export type Observable<T> = {
  subscribe(observerOrNext: ObserverOrNext<T>): Subscription;
};

export type Observer<T> = {
  next: NextChannel<T>;
};

export type NextChannel<T> = (value: T) => void;
export type ObserverOrNext<T> = Observer<T> | NextChannel<T>;

export type Unsubscribe = () => void;
export type Subscription = {
  unsubscribe: Unsubscribe;
};
