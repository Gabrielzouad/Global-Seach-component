Sure, here's the updated README with the revised hooks section based on the provided `hooks.ts` file:

---

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
git clone <repository-url>
cd my-app
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

   The `SearchInput` component handles the user input for the search query. It updates the search query state using the `setQuery` function from the `useSearchHandler` hook.

   ```javascript
   import React from 'react';

   const SearchInput = ({ query, setQuery }) => {
     return (
       <input
         type="text"
         value={query}
         onChange={(e) => setQuery(e.target.value)}
         placeholder="Search..."
         className="search-input"
       />
     );
   };

   export default SearchInput;
   ```

2. **Search Results Component**

   The `SearchResults` component displays the search results. It receives the `results` array from the `useSearchHandler` hook and renders each result.

   ```javascript
   import React from 'react';

   const SearchResults = ({ results }) => {
     return (
       <ul className="search-results">
         {results.map((result, index) => (
           <li key={index}>{result}</li>
         ))}
       </ul>
     );
   };

   export default SearchResults;
   ```

3. **Integrating Components and Hooks**

   The main component (e.g., `pages/index.js`) integrates the search components and hooks. It uses the `useSearchHandler` hook to manage the search state and the `useDebounce` hook to debounce the search query.

   ```javascript
   import React, { useState } from 'react';
   import SearchInput from '../components/SearchInput';
   import SearchResults from '../components/SearchResults';
   import { useSearchHandler } from '../lib/hooks';

   const Home = () => {
     const [isVisible, setIsVisible] = useState(false);
     const [query, setQuery] = useState('');
     const [results, setResults] = useState([]);
     const { searchContainerRef, searchInputRef } = useSearchHandler(
       isVisible,
       setIsVisible,
       query,
       setQuery,
       setResults
     );

     return (
       <div ref={searchContainerRef}>
         <button onClick={() => setIsVisible(true)}>Open Search</button>
         {isVisible && (
           <>
             <SearchInput query={query} setQuery={setQuery} />
             <SearchResults results={results} />
           </>
         )}
       </div>
     );
   };

   export default Home;
   ```

## Contributing

If you would like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch to your forked repository.
4. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to modify this README as necessary to fit the specifics of your project. Let me know if you need any more details or additional sections!