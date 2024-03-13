'use client';

export interface IConfig {
  name: string;
  value: string;
}

export interface IVote {
  id: string;
  code: string;
  electionId: string;
}
