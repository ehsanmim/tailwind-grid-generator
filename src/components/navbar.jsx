import { ShareIcon } from "@heroicons/react/24/outline";
import { Button, Navbar } from "react-daisyui";

export default function index() {
  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Navbar className="bg-base-100 shadow-sm">
      <div className="flex-1">
        <Button tag="a" className="text-xl normal-case" color="ghost">
          Tailwind Grid Generator
        </Button>
      </div>
      <div className="flex-none">
        <Button tag="a" shape="square" color="ghost" onClick={handleShare}>
          <ShareIcon className="h-6 w-6" />
        </Button>
      </div>
    </Navbar>
  );
}
