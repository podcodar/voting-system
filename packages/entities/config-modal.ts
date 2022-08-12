import { LegacyRef } from 'react';

export interface IConfigModal {
  isOpen: boolean;
  onClose: () => void;
}

export interface IConfigForm {
  initialRef: LegacyRef<HTMLInputElement>;
}

export interface FormState {
  electionDatabaseId: string;
  resultsDatabaseId: string;
  notionApiKey?: string;
}
