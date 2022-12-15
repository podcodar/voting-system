import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';

import { ResultElectionData } from '@packages/entities/notion';
import {
  Title,
  LooseObject,
  Result,
  RichText,
  Select,
} from '@packages/notion/sdk';

import { getElectionPage } from './client';

export function extractCandidateDatabaseId(
  blockList: ListBlockChildrenResponse['results'],
): string {
  const { id: candidateDatabaseId } = blockList.filter(
    (block) =>
      'type' in block &&
      block.type === 'child_database' &&
      block?.child_database?.title === 'Partidos',
  )[0];

  return candidateDatabaseId;
}

export function extractCandidateImages(
  blockList: ListBlockChildrenResponse['results'],
): string[] {
  const partyImages = [];
  const imageBlocks = blockList.filter(
    (block) => 'type' in block && block.type === 'image',
  );

  for (let block of imageBlocks) {
    if (
      'type' in block &&
      block?.type === 'image' &&
      block?.image?.type === 'file'
    ) {
      partyImages.push(block?.image?.file?.url);
    }
  }

  return partyImages;
}

export function extractPagesFromQuery(pages: Result[]) {
  const extractedPages = pages.map((page) => {
    const pageProperties = _extractProperties(page);
    return {
      electionId: page?.id,
      position: pageProperties?.Cargo,
      electionName: pageProperties?.Name,
      partySlug: pageProperties?.Sigla,
      candidateName: pageProperties?.Candidato,
      viceCandidateName: pageProperties?.Vice,
      code: pageProperties?.Codigo,
    };
  });

  return extractedPages;
}

function _extractProperties(result: Result): LooseObject {
  let parsedResults: LooseObject = {};

  if ('properties' in result) {
    const { properties } = result;
    Object.entries(properties).map(([key, value]) => {
      switch (value.type) {
        case 'title':
          parsedResults[key] = _titleHandler(value);
          break;
        case 'select':
          parsedResults[key] = _selectHandler(value);
          break;
        case 'rich_text':
          parsedResults[key] = _richTextHandler(value);
      }
    });
  }

  return parsedResults;
}

function _titleHandler(propertyValue: Title): string {
  return propertyValue.title[0].plain_text;
}

function _richTextHandler(propertyValue: RichText): string {
  return propertyValue.rich_text[0].plain_text;
}

function _selectHandler(propertyValue: Select): string {
  if (propertyValue?.select) {
    return propertyValue.select.name;
  }
  return '';
}

export function extractResultElection(
  blockList: ListBlockChildrenResponse['results'],
  electionPageId: string,
): Promise<ResultElectionData[]> {
  const blocks = blockList.filter(
    (block) => 'type' in block && block.type === 'heading_1',
  );

  const partiesResult: string[] = [];
  const votes: number[] = [];

  for (let block of blocks) {
    if ('type' in block && block?.type === 'heading_1') {
      const result = block?.heading_1?.rich_text[0].plain_text.split(' - ');
      partiesResult.push(result[1]);
      votes.push(Number(result[2].split(' ')[0]));
    }
  }

  return _mapToResultPage(partiesResult, votes, electionPageId);
}

async function _mapToResultPage(
  partiesResult: string[],
  votes: number[],
  electionPageId: string,
): Promise<ResultElectionData[]> {
  const resultParty = await getElectionPage(electionPageId);
  const results: ResultElectionData[] = [];
  const totalVotes = votes.reduce((a, b) => a + b, 0);
  const percentage: string[] = [];

  votes.map((x) => {
    const result: number = (x * 100) / totalVotes;
    percentage.push(result.toFixed(2));
  });

  partiesResult.map(function (value, index) {
    const currentParty = resultParty.filter((party) => party.name === value);

    results.push({
      candidate: currentParty[0].members.candidate.name,
      partido: currentParty[0].name,
      porcentagem: percentage[index] + ' %',
      vice: currentParty[0].members.viceCandidate.name,
      votos: votes[index].toString(),
    });
  });

  return results;
}
