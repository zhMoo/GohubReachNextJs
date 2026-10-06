// ROUTE GROUP layout: the (marketing) folder name is NOT part of the URL,
// so the page inside is served at /about but gets its own narrower layout.
export default function MarketingLayout({ children }) {
  return <div className="narrow">{children}</div>;
}
