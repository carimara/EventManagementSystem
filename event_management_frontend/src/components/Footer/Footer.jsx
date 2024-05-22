export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <span className="text-muted">
          Copyright © {year} Eventify. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
