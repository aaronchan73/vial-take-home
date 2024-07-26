import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const getSubjects = (req: Request, res: Response) => {
  const subjectPath = path.join(__dirname, '../data/subjects.json');

  fs.readFile(subjectPath, 'utf8', (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to read subjects JSON file' });
    }

    try {
      const subjects = JSON.parse(data);
      res.json(subjects);
    } catch (parseError) {
      res.status(500).json({ error: 'Failed to parse subjects JSON data' });
    }
  });
};