import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from './connect';

export const useDatabase =
  (handler: (req: NextApiRequest, res: NextApiResponse) => unknown) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await connectToDatabase();

      return handler(req, res);
    } catch (err) {
      res.status(500).send('there is an error 💔');
    }
  };
