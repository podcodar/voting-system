import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';

import { CreateResultPage } from 'src/packages/entities/notion';

export function createResultPageFromTemplate({
  databaseId,
  electionId,
  electionName,
  winnerParty,
  looserParty,
}: CreateResultPage) {
  const winningMemberBlocks = winnerParty.members.map((member_name) =>
    _createCandidateBlocks(member_name),
  );
  const looserMemberBlocks = looserParty.members.map((member_name) =>
    _createCandidateBlocks(member_name),
  );
  return {
    parent: {
      type: 'database_id',
      database_id: `${databaseId}`,
    },
    icon: {
      type: 'emoji',
      emoji: '✔️',
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: `Resultado - ${electionName}`,
            },
          },
        ],
      },
      Eleições: {
        type: 'relation',
        relation: [{ id: `${electionId}` }],
      },
    },
    children: [
      {
        object: 'block',
        type: 'heading_1',
        heading_1: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: `Partido Vencedor - ${winnerParty.name} - ${winnerParty.votes} Votos`,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
            },
          ],
          color: 'default',
        },
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'Candidatos vencedores:',
                link: null,
              },
            },
          ],
          color: 'default',
        },
      },
      ...winningMemberBlocks,
      {
        object: 'block',
        type: 'divider',
        divider: {},
      },
      {
        object: 'block',
        type: 'heading_1',
        heading_1: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: `Segundo colocado - ${looserParty.name} - ${looserParty.votes} Votos`,
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
            },
          ],
          color: 'default',
        },
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'Candidatos:',
                link: null,
              },
            },
          ],
          color: 'default',
        },
      },
      ...looserMemberBlocks,
    ],
  } as CreatePageParameters;
}

const _createCandidateBlocks = (candidate_name: string) => ({
  type: 'bulleted_list_item',
  bulleted_list_item: {
    rich_text: [
      {
        type: 'text',
        text: {
          content: `${candidate_name}`,
        },
      },
    ],
  },
});
