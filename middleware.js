import { NextResponse } from "next/server";

export function middleware(request) {
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const isMaintenancePage = request.nextUrl.pathname === "/maintenance";

  // Jika sedang maintenance mode dan bukan di halaman maintenance, redirect ke /maintenance
  if (isMaintenance && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // Logger request ke console
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${request.method} ${request.nextUrl.pathname}`);

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
