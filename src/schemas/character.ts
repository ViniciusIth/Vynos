import { Schema, model } from 'mongoose';

export const characterSchema = new Schema({
  userId: { type: String, required: true },
  guildChannelId: { type: String, required: true },
  embedMessageId: { type: String, required: true },
  messageColor: { type: String, default: '#66c0c0' },

  name: { type: String, required: true },
  race: { type: String, required: true },
  level: { type: Number, default: 1 },

  maxHealth: { type: Number, default: 10 },
  maxEter: { type: Number, default: 10 },

  imageUrl: { type: String, required: true },
  story: { type: String, default: '' },

  attributes: {
    str: { type: Number, default: 100 },
    dex: { type: Number, default: 100 },
    con: { type: Number, default: 100 },
    cha: { type: Number, default: 100 },
    int: { type: Number, default: 100 },
  },
});

export const Character = model('Character', characterSchema, 'characters');
