import React from 'react';

export type Position = {
  x: number;
  y: number;
};

export type InteractiveObject = {
  id: string;
  name: string;
  position: Position;
  summary: string;
  notionLink?: string;
  icon?: React.ReactNode;
  colorClass?: string;
};
