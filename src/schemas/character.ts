import { Schema, model } from 'mongoose';

export const characterSchema = new Schema({
  userId: String,
  characterName: String,
  characterSpecies: String,
  characterHealth: Number,
  characterEter: String,
  characterAttr: {
    str: {
      type: Number,
    },
    dex: {
      type: Number,
    },
    con: {
      type: Number,
    },
    cha: {
      type: Number,
    },
    int: {
      type: Number,
    },
  },
});

export const Character = model('Character', characterSchema, 'characters');
