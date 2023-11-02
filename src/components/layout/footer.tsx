export function Footer() {
  return (
    <footer className="border-t py-4 md:py-0 bg-white">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-20 md:flex-row">
        <div className="flex flex-col items-center min-w-full gap-4 px-8 md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            <span className="text-gray-400">A project by</span>{" "}
            <strong>WalyXXI</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
