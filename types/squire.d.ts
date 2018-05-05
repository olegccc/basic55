declare module 'squire-rte' {

  type ElementAttributes = {[id: string]: string}
  type EventType = 'pathChange' | 'cursor' | 'select' | 'focus' | 'blur' | 'undoStateChange' | 'input' | 'willPaste' | 'dragOver' | 'drop' | 'keydown' | 'keyup';
  type MutatesFunction = (frag: DocumentFragment) => Node;
  type ChangeFormatOption = {
    tag: string;
    attributes?: ElementAttributes;
  }

  interface SquireConfig {
    blockTag?: string;
    blockAttributes?: ElementAttributes;
    tagAttributes?: {[id: string]: ElementAttributes}
    undo?: {
      documentSizeThreshold: number;
      undoLimit: number;
    }
  }

  interface TreeWalker {
    nextNode(): Node;
    previousNode(): Node;
    previousPONode(): Node;
  }

  class Squire {
    constructor(root: Element, config?: SquireConfig);
    addEventListener(type: EventType, callback: Function): Squire;
    removeEventListener(type: EventType, callback: Function): Squire;
    setKeyHandler(key: string, callback: Function): Squire;
    focus(): Squire;
    blur(): Squire;
    getDocument(): Document;
    getHTML(withBookMark?: boolean): string;
    setHTML(html: string): Squire;
    getSelectedText(): string;
    insertImage(src: string, attributes?: ElementAttributes): HTMLImageElement;
    insertHTML(html: string, isPaste?: boolean): Squire;
    getPath(): string;
    getFontInfo(range?: Range): {
      color?: string;
      backgroundColor?: string;
      family?: string;
      size?: string;
    }
    getCursorPosition(range?: Range): ClientRect | DOMRect | null;
    getSelection(): ClientRect | DOMRect | null;
    setSelection(range?: Range): Squire;
    moveCursorToStart(): Squire;
    moveCursorToEnd(): Squire;
    saveUndoState(range?: Range): Squire;
    undo(): Squire;
    redo(): Squire;
    hasFormat(tag: string, attributes?: ElementAttributes, range?: Range): boolean;
    bold(): Squire;
    italic(): Squire;
    underline(): Squire;
    strikethrough(): Squire;
    subscript(): Squire;
    superscript(): Squire;
    removeBold(): Squire;
    removeItalic(): Squire;
    removeUnderline(): Squire;
    removeStrikethrough(): Squire;
    removeSubscript(): Squire;
    removeSuperscript(): Squire;
    makeLink(url: string, attributes?: ElementAttributes): Squire;
    removeLink(): Squire;
    setFontFace(name: string): Squire;
    setFontSize(size: string): Squire;
    setTextColour(colour: string): Squire;
    setHighlightColour(colour: string): Squire;
    setTextAlignment(alignment: string): Squire;
    setTextDirection(direction: string): Squire;
    forEachBlock(fn: Function, mutates?: boolean, range?: Range): Squire;
    modifyBlocks(fn: MutatesFunction, range?: Range): Squire;
    increaseQuoteLevel(): Squire;
    decreaseQuoteLevel(): Squire;
    makeUnorderedList(): Squire;
    makeOrderedList(): Squire;
    removeList(): Squire;
    increaseListLevel(range?: Range): Squire;
    decreaseListLevel(range?: Range): Squire;
    removeAllFormatting(range?: Range): Squire;
    changeFormat(add: ChangeFormatOption | undefined, remove?: ChangeFormatOption, range?: Range, partial?: boolean): Squire;
    modifyDocument(modificationCallback: Function): void;
    static getNextBlock(node: Node, root: Node): Node | null;
    static getPreviousBlock(node: Node, root: Node): Node | null;
    static empty(node: Node): DocumentFragment;
    static isInline(node: Node): boolean;
    static isBlock(node: Node): boolean;
    static isContainer(node: Node): boolean;
    static getBlockWalker(node: Node, root: Node): TreeWalker;
    static areAlike(node: Node, node2: Node): boolean;
    static hasTagAttributes(node: Node, tag: string, attributes: ElementAttributes): boolean;
    static getNearest(node: Node, root: Node, tag: string, attributes: ElementAttributes): Node | null;
    static isOrContains(parent: Node, node: Node): boolean;
    static detach(node: Node): Node;
    static getNodeBefore(node: Node, offset: number): Node;
    static getNodeAfter(node: Node, offset: number): Node;
    static insertNodeInRange(range: Range, node: Node): void;
    static extractContentsOfRange(range: Range, common?: Node, root?: Node): DocumentFragment;
    static deleteContentsOfRange(range: Range, root?: Node): DocumentFragment;
    static insertTreeFragmentIntoRange(range: Range, frag: DocumentFragment, root: Node): void;
    static isNodeContainedInRange(range: Range, node: Node, partial: boolean): boolean;
    static moveRangeBoundariesDownTree(range: Range): void;
    static moveRangeBoundariesUpTree(range: Range): void;
    static getStartBlockOfRange(range: Range, root: Node): Node;
    static getEndBlockOfRange(range: Range, root: Node): Node;
    static rangeDoesStartAtBlockBoundary(range: Range, root: Node): boolean;
    static rangeDoesEndAtBlockBoundary(range: Range, root: Node): boolean;
    static expandRangeToBlockBoundaries(range: Range, root: Node): Range;
    static onPaste(event: Event): void;
    static addLinks(frag: DocumentFragment, root: Node, self: Squire): void;
    static splitBlock(self: Squire, block: Node, node: Node, offset: number): Node;
    static readonly startSelectionId: string;
    static readonly endSelectionId: string;
  }

  export = Squire;
}

