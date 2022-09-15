import { getElectionPage } from '@packages/notion/client';
import { GetElectionPageResponse } from '@packages/entities/notion';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetElectionPageResponse>,
) {
  const { pageId } = req.query;
  const results = await getElectionPage(pageId as string);
  res.status(200).json({ results });
}
