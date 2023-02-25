import { Schema, model } from 'mongoose';

export const characterSchema = new Schema({
  userId: String,
  guildChannelId: String,
  embedMessageId: String,
  messageColor: {type: String, default: '#66c0c0'},

  name: String,
  race: String,
  level: { type: Number, default: 1 },

  maxHealth: { type: Number, default: 10 },
  maxEter: { type: Number, default: 10 },

  imageUrl: String,
  story: String,

  attributes: {
    str: { type: Number, default: 100 },
    dex: { type: Number, default: 100 },
    con: { type: Number, default: 100 },
    cha: { type: Number, default: 100 },
    int: { type: Number, default: 100 },
  },
});

export const Character = model('Character', characterSchema, 'characters');
