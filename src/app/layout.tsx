import "src/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <title>{`Eleições ${currentYear}`}</title>
      <link rel="icon" href="/favicon.ico" />

      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
