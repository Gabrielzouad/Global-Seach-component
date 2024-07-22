// types.ts
export interface Keyword {
    name: string;
    href: string;
  }
  
  export interface KeywordCategory {
    category: string;
    items: Keyword[];
  }
  
  export interface SearchInputProps {
    isVisible: boolean;
    toggleSearch: (state: boolean) => void;
  }
  