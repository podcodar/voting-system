import { getResultElection } from '@packages/notion/client';
import { GetResultElectionResponse } from '@packages/entities/notion';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResultElectionResponse>,
) {
  const { pageId, electionPageId } = req.query;
  const results = await getResultElection(
    pageId as string,
    electionPageId as string,
  );
  res.status(200).json({ results });
}
