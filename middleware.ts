import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/api/elections') {
    if (request.method === 'GET') {
      if (request.nextUrl.searchParams.get('databaseId') === '') {
        return new NextResponse(null, {
          status: 400,
          statusText: "The databaseId parameter can't null.",
        });
      }
      const paramDatabaseId: string | null =
        request.nextUrl.searchParams.get('databaseId');

      if (paramDatabaseId?.length !== 32) {
        return new NextResponse(null, {
          status: 400,
          statusText: 'Invalid length databaseId parameter.',
        });
      }
    } else {
      return new NextResponse(null, {
        status: 405,
        statusText: 'Method Not Allowed.',
      });
    }
  }

  if (request.nextUrl.pathname === '/api/elections/page') {
    if (request.method === 'GET') {
      if (request.nextUrl.searchParams.get('pageId') === '') {
        return new NextResponse(null, {
          status: 400,
          statusText: "The pageId parameter can't null.",
        });
      }

      const paramPageId: string | null =
        request.nextUrl.searchParams.get('pageId');

      if (paramPageId?.length !== 36) {
        return new NextResponse(null, {
          status: 400,
          statusText: 'Invalid length pageId parameter.',
        });
      }
    } else {
      return new NextResponse(null, {
        status: 405,
        statusText: 'Method Not Allowed.',
      });
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/elections', '/api/elections/page'],
};
