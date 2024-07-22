// hooks.ts
import { useEffect, useRef } from 'react';
import {  KeywordCategory } from './types';
import { keywords } from './constants';

export const useSearchHandler = (
  isVisible: boolean,
  toggleSearch: (state: boolean) => void,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  setResults: React.Dispatch<React.SetStateAction<KeywordCategory[]>>
) => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        if (!isVisible) {
          toggleSearch(true);
        }
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        toggleSearch(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, toggleSearch]);

  useEffect(() => {
    if (isVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    if (query) {
      const filteredResults = Object.keys(keywords)
        .map((category) => ({
          category,
          items: keywords[category].filter((keyword) =>
            keyword.name.toLowerCase().includes(query.toLowerCase())
          ),
        }))
        .filter((result) => result.items.length > 0);
      setResults(filteredResults);
    } else {
      const initialResults = Object.keys(keywords).map((category) => ({
        category,
        items: keywords[category],
      }));
      setResults(initialResults);
    }
  }, [query, setResults]);

  return { searchContainerRef, searchInputRef };
};
