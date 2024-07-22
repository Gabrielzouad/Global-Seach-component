export default function SearchButton({ onClickFunction }: any) {
  return (
    <button
      onClick={onClickFunction}
      className='flex relative justify-start items-center text-sm text-muted-foreground dark:border-white/[0.2] py-2 w-fit border border-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-4 rounded-xl bg-white dark:bg-brand'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        className='lucide lucide-search mr-2 h-4 w-4 shrink-0 opacity-50'
      >
        <circle cx='11' cy='11' r='8'></circle>
        <path d='m21 21-4.3-4.3'></path>
      </svg>
      <span className='transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium pl-2 pr-4'>
        Universal search?
      </span>
      <kbd className='pointer-events-none  h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
        <span className='text-xs'>⌘</span>+ K
      </kbd>
    </button>
  );
}
