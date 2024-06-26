import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  switch (pathname) {
    case "/api/elections":
      return _checkElectionParameter(request);
    case "/api/elections/page":
      return _checkElectionPageParameter(request);
    default:
      NextResponse.next();
  }
}

function _checkElectionParameter(
  request: NextRequest,
): NextResponse | undefined {
  if (request.method !== "GET") {
    return methodNotAllowed();
  }
  const { searchParams } = request.nextUrl;
  const databaseId: string | null = searchParams.get("databaseId");

  if (!databaseId || databaseId?.length !== 32) {
    return _invalidParameterResponse("Invalid databaseId parameter.");
  }
}

function _checkElectionPageParameter(
  request: NextRequest,
): NextResponse | undefined {
  if (request.method !== "GET") {
    return methodNotAllowed();
  }
  const { searchParams } = request.nextUrl;
  const pageId: string | null = searchParams.get("pageId");

  if (!pageId || pageId?.length !== 36) {
    return _invalidParameterResponse("Invalid pageId parameter.");
  }
}

function _invalidParameterResponse(message: string): NextResponse {
  return new NextResponse(null, {
    status: 400,
    statusText: message,
  });
}

function methodNotAllowed(): NextResponse | undefined {
  return new NextResponse(null, {
    status: 405,
    statusText: "Method Not Allowed.",
  });
}
