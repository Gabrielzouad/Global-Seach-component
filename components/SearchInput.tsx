import * as React from 'react';

import {
  GlobeIcon,
  CubeIcon,
  ReaderIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import { KeywordCategory, SearchInputProps } from '@/lib/types';
import { useSearchHandler } from '@/lib/hooks';

const SearchInput: React.FC<SearchInputProps> = ({
  isVisible,
  toggleSearch,
}) => {
  const [query, setQuery] = React.useState<string>('');
  const [results, setResults] = React.useState<KeywordCategory[]>([]);
  const icons: { [key: string]: React.ReactNode } = {
    Documentation: <GlobeIcon />,
    Inspiration: <CubeIcon />,
    Guides: <ReaderIcon />,
  };

  const { searchContainerRef, searchInputRef } = useSearchHandler(
    isVisible,
    toggleSearch,
    query,
    setQuery,
    setResults
  );

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in-0'>
      <div
        id='search-container'
        ref={searchContainerRef}
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg'
      >
        <div className='flex justify-center items-center border-b px-3'>
          <MagnifyingGlassIcon className='h-4 w-4 shrink-0 opacity-50' />
          <input
            ref={searchInputRef}
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='w-96 p-2 rounded focus:outline-none'
            placeholder='Search...'
          />
        </div>
        {results.length > 0 && (
          <div className='border-gray-300 rounded shadow-md bg-white max-h-72 overflow-y-auto'>
            {results.map((result, index) => (
              <div key={index}>
                <div className='px-2 py-2 font-extrabold text-xs'>
                  {result.category}
                </div>
                <ul>
                  {result.items.map((item, idx) => (
                    <li key={idx} className='px-4 py-2 hover:bg-gray-200'>
                      <a href={item.href} className='flex gap-1 items-center'>
                        <i className='h-6 w-6 flex items-center'>
                          {icons[result.category]}
                        </i>
                        <p className='text-md font-medium'>{item.name}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
