import AppProviders from "src/packages/utils/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <AppProviders>{children}</AppProviders>
        </main>
      </body>
    </html>
  );
}
