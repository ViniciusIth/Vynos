import { Document } from 'mongoose';

export interface ICharacterAttributes {
  str: number;
  dex: number;
  con: number;
  cha: number;
  int: number;
}

export interface ICharacter extends Document {
  userId: string;
  guildChannelId: string;
  embedMessageId: string;
  messageColor: string;

  name: string;
  race: string;
  level: number;

  maxHealth: number;
  maxEter: number;

  imageUrl: string;
  story: string;

  attributes?: ICharacterAttributes;
}
