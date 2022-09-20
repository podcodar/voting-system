import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  switch (pathname) {
    case '/api/elections':
      _electionsMiddleware(request);
    case '/api/elections/page':
      _electionsPageMiddleware(request);
    default:
      return NextResponse.next();
  }
}

function _electionsMiddleware(request: NextRequest) {
  if (request.method !== 'GET') {
    return new NextResponse(null, {
      status: 405,
      statusText: 'Method Not Allowed.',
    });
  }

  const { searchParams } = request.nextUrl;
  const databaseId = searchParams.get('databaseId');

  if (!databaseId || databaseId.length !== 32)
    return _invalidParameterResponse('Invalid databaseId parameter.');
}

function _electionsPageMiddleware(request: NextRequest) {
  if (request.method !== 'GET') {
    return new NextResponse(null, {
      status: 405,
      statusText: 'Method Not Allowed.',
    });
  }

  if (request.nextUrl.searchParams.get('pageId') === '') {
    return new NextResponse(null, {
      status: 400,
      statusText: "The pageId parameter can't null.",
    });
  }

  const paramPageId: string | null = request.nextUrl.searchParams.get('pageId');

  if (paramPageId?.length !== 36) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Invalid length pageId parameter.',
    });
  }
}

function _invalidParameterResponse(message: string) {
  return new NextResponse(null, {
    status: 400,
    statusText: message,
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/elections', '/api/elections/page'],
};
