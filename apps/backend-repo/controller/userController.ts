import { Request, Response } from 'express';

import { UserRepository } from '../repository/userRepository';

export class UserController {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  getMostPotentialUsers = async (req: Request, res: Response) => {
    try {
      const pageSize = Number(req.query.pageSize) || 10;
      const lastDocId = req.query.lastDocId as string;

      let lastDoc;
      if (lastDocId) {
        lastDoc = await this.userRepo.getLastDocument(lastDocId);
      }

      const result = await this.userRepo.getMostPotentialUsers(pageSize, lastDoc);
      
      res.status(200).json({
        users: result.users,
        lastDocId: result.lastDoc?.id,
        hasMore: result.hasMore
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch potential users' });
    }
  };

  updateUserData = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId;
      const userData = req.body;
      const updatedUser = await this.userRepo.updateUser(userId, userData);
      res.status(200).json({ 
        message: 'User updated successfully',
        user: updatedUser
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  };
}
