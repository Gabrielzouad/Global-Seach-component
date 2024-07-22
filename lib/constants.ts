import { Keyword } from './types';

export const keywords: { [key: string]: Keyword[] } = {
    Documentation: [
      { name: 'Github Repository', href: 'https://github.com/your-repository' },
      { name: 'Github Profile', href: 'https://github.com/your-profile' },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/your-profile' },
      { name: 'Personal Website', href: 'https://yourwebsite.com' },
    ],
    Inspiration: [
      { name: 'ShadCN', href: 'https://ui.shadcn.com' },
      { name: 'AceternityUI', href: 'https://ui.shadcn.com' },
      { name: 'TailwindCSS', href: 'https://tailwindcss.com' },
      { name: 'Radix Icons', href: 'https://icons.radix-ui.com' },
    ],
    Guides: [
      { name: 'Readme', href: 'https://github.com/your-repository/blob/main/README.md' },
      { name: 'ShadCN installation', href: 'https://ui.shadcn.com/docs' },
      { name: 'AceternityUI installation', href: 'https://ui.aceternity.com/docs/install-nextjs' },
      { name: 'TailwindUI installation', href: 'https://tailwindcss.com/docs/installation' },
    ],
};
