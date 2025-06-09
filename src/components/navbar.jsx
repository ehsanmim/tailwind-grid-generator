import { BookmarkSquareIcon, ShareIcon } from "@heroicons/react/24/outline";
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
        <Button
          variant="link"
          className="text-xl no-underline hover:no-underline!"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to leave this page? Unsaved data may be lost."
              )
            ) {
              window.location.href = window.location.pathname;
            }
          }}
        >
          Tailwind Grid Generator
        </Button>
      </div>
      <div className="flex-none">
        <Button
          tag="a"
          color="info"
          variant="outline"
          onClick={() => alert("Simply bookmark this page!")}
          className="mr-2"
        >
          <BookmarkSquareIcon className="h-6 w-6 mr-2" />
          Save
        </Button>
        <Button tag="a" shape="square" color="ghost" onClick={handleShare}>
          <ShareIcon className="h-6 w-6" />
        </Button>
      </div>
    </Navbar>
  );
}
