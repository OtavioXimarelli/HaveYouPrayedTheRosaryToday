import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JournalEntry, JournalEntryDocument } from './schemas/journal-entry.schema';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(JournalEntry.name) private journalModel: Model<JournalEntryDocument>,
  ) {}

  // Implement your business logic here
}
