# Global Search Component

This project implements a global search component in a Next.js application. The global search component allows users to search through content efficiently and can be easily integrated into other Next.js projects.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Components and Hooks](#components-and-hooks)
- [How to Create the Global Search Component](#how-to-create-the-global-search-component)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/Gabrielzouad/Global-Seach-component.git
npm install
```

## Usage

To run the project locally, use the following command:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Components and Hooks

### Global Search Component

The global search component is located in the `components` directory. It provides a user interface for entering search queries and displays the search results dynamically.

### Hooks

#### `useSearchHandler`

This custom hook manages the state and logic for the global search functionality. It handles keyboard shortcuts, clicks outside the search container, and updates the search results based on the query.

Here is how it works:

- **Dependencies**: The hook uses `useEffect` and `useRef` from React.
- **Parameters**:
  - `isVisible`: Boolean indicating if the search component is visible.
  - `toggleSearch`: Function to toggle the visibility of the search component.
  - `query`: The current search query entered by the user.
  - `setQuery`: Function to update the search query.
  - `setResults`: Function to update the search results.

The `useSearchHandler` hook performs the following tasks:

1. **Keyboard Shortcut Handling**: Listens for `Ctrl+K` or `Cmd+K` keyboard shortcuts to toggle the search component visibility.
2. **Click Outside Handling**: Closes the search component if a click is detected outside of it.
3. **Focus Handling**: Focuses the search input when the search component becomes visible.
4. **Search Logic**: Filters the keywords based on the search query and updates the results.

Here is an example of the hook in action:

```javascript
import { useEffect, useRef } from 'react';
import { KeywordCategory } from './types';
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
```



## How to Create the Global Search Component

The global search component is composed of several parts:

1. **Search Input Component**

   The `SearchInput` component handles the user input for the search query and displays the search results. It uses the `useSearchHandler` hook to manage the search state and logic.

   ```javascript
   import * as React from 'react';
   import { GlobeIcon, CubeIcon, ReaderIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
   import { KeywordCategory, SearchInputProps } from '@/lib/types';
   import { useSearchHandler } from '@/lib/hooks';

   const SearchInput: React.FC<SearchInputProps> = ({ isVisible, toggleSearch }) => {
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
   ```

2. **Hook Implementation**

   The `useSearchHandler` hook manages the state and logic for the global search functionality. It handles keyboard shortcuts, clicks outside the search container, and updates the search results based on the query.

   ```javascript
   import { useEffect, useRef } from 'react';
   import { KeywordCategory } from './types';
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
   ```

## Contributing

If you would like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch to your forked repository.
4. Create a pull request with a detailed description of your changes.

## License

This project is free for use.
