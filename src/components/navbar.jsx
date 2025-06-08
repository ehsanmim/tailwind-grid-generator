import { Button, Navbar } from "react-daisyui";

export default function index() {
  return (
    <Navbar className="bg-base-100 shadow-sm">
      <div className="flex-1">
        <Button tag="a" className="text-xl normal-case" color="ghost">
          Tailwind Grid Generator
        </Button>
      </div>
      <div className="flex-none">
        <Button tag="a" shape="square" color="ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </Button>
      </div>
    </Navbar>
  );
}
