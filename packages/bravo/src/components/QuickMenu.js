export default function QuickMenu({ className, menu, setMenu }) {
  const handleSetMenu = (menu) => {
    setMenu(menu)
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <div>
        <button
          onClick={() => handleSetMenu('file-explorer')}
          className={`flex items-center justify-center w-full py-2.5 ${
            menu === 'file-explorer' ? 'bg-oxford-blue-100/10' : null
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
            />
          </svg>
        </button>
        {/* <button
          onClick={() => handleSetMenu('search-explorer')}
          className={`flex items-center justify-center w-full py-2.5 ${
            menu === 'search-explorer' ? 'bg-red-100/10' : null
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button> */}
      </div>
    </div>
  )
}
