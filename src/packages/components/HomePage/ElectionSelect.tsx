"use client";

import { Button, Flex, Select } from "@chakra-ui/react";

export default function ElectionsSelect({
  options,
}: {
  options: { name: string; value: string }[];
}) {
  return (
    <Flex gap={4} justifyContent="space-between">
      <Select placeholder="Escolha sua Votação" minW="250px">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </Select>

      <Button>Test</Button>
    </Flex>
  );
}
