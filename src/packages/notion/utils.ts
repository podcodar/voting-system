import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

import {
  Title,
  LooseObject,
  Result,
  RichText,
  Select,
} from "src/packages/notion/sdk";

export function extractCandidateDatabaseId(
  blockList: ListBlockChildrenResponse["results"],
): string {
  const { id: candidateDatabaseId } = blockList.filter(
    (block) =>
      "type" in block &&
      block.type === "child_database" &&
      block?.child_database?.title === "Partidos",
  )[0];

  return candidateDatabaseId;
}

export function extractCandidateImages(
  blockList: ListBlockChildrenResponse["results"],
): string[] {
  const partyImages = [];
  const imageBlocks = blockList.filter(
    (block) => "type" in block && block.type === "image",
  );

  for (const block of imageBlocks) {
    if (
      "type" in block &&
      block?.type === "image" &&
      block?.image?.type === "file"
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
      position: String(pageProperties?.Cargo),
      electionName: String(pageProperties?.Name),
      partySlug: String(pageProperties?.Sigla),
      candidateName: String(pageProperties?.Candidato),
      viceCandidateName: String(pageProperties?.Vice),
      code: String(pageProperties?.Codigo),
    };
  });

  return extractedPages;
}

function _extractProperties(result: Result): LooseObject {
  const parsedResults: LooseObject = {};

  if ("properties" in result) {
    const { properties } = result;
    Object.entries(properties).map(([key, value]) => {
      switch (value.type) {
        case "title":
          parsedResults[key] = _titleHandler(value);
          break;
        case "select":
          parsedResults[key] = _selectHandler(value);
          break;
        case "rich_text":
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
  return "";
}
