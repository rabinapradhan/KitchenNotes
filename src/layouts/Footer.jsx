import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="border-t mt-10 border-border bg-muted/50 py-12 px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <span className="font-display text-lg font-semibold text-muted-foreground">
          KitchenNotes
        </span>
        <div className="flex gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            Browse
          </Link>
          <Link to="/recipes" className="hover:text-primary transition-colors">
            Saved Recipes
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">Made for home cooks</p>
      </div>
    </footer>
  );
};

export default Footer;
