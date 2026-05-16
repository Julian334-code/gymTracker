import Dexie from "dexie";
import type { Table } from "dexie";

export interface Note {
  id?: number;
  text: string;
}

class GymDatabase extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super("GymDatabase");

    this.version(1).stores({
      notes: "++id,text",
    });
  }
}

export const db = new GymDatabase();