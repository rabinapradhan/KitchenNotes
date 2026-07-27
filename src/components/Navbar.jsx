import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="w-full border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <span className="font-display text-xl font-semibold tracking-tight text-primary">
          KitchenNotes
        </span>

        <div className="flex items-center gap-6">
          <Link
            to={`/recipes`}
            class="hidden text-sm font-medium text-muted-foreground hover:text-primary transition-colors sm:block"
          >
            Saved Recipes
          </Link>
          <Link
            to={`/`}
            class="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm ring-1 ring-primary transition-colors hover:bg-primary/90 active:scale-95"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
