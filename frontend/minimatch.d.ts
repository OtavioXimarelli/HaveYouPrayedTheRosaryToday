// Type definitions for minimatch
// Prevents TS2688 error from deprecated @types/minimatch pulled transitively by next-pwa

declare module 'minimatch' {
  export interface IOptions {
    debug?: boolean;
    nobrace?: boolean;
    noglobstar?: boolean;
    dot?: boolean;
    noext?: boolean;
    nocase?: boolean;
    nonull?: boolean;
    matchBase?: boolean;
    nocomment?: boolean;
    nonegate?: boolean;
    flipNegate?: boolean;
  }

  export class Minimatch {
    pattern: string;
    options: IOptions;
    set: string[][];
    regexp: RegExp | null;
    negate: boolean;
    comment: boolean;
    empty: boolean;
    
    constructor(pattern: string, options?: IOptions);
    makeRe(): RegExp | null;
    match(path: string): boolean;
  }

  export function minimatch(path: string, pattern: string, options?: IOptions): boolean;
  export function filter(pattern: string, options?: IOptions): (path: string) => boolean;
  export function match(list: string[], pattern: string, options?: IOptions): string[];
}
