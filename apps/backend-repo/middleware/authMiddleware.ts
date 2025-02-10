import * as admin from 'firebase-admin';

import { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ 
        error: 'No authentication token provided',
        message: 'Authorization header is missing' 
      });
      return;
    }

    const idToken = authHeader.split('Bearer ')[1];
    if (!idToken) {
      res.status(401).json({ 
        error: 'Invalid token format',
        message: 'Please use "Bearer <token>" in the Authorization header' 
      });
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    (req as any).user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);

    if (error instanceof Error) {
      if (error.message.includes('Firebase ID token has expired')) {
        res.status(401).json({ 
          error: 'Token expired',
          message: 'Your authentication token has expired. Please log in again.' 
        });
        return;
      }

      if (error.message.includes('Firebase ID token has incorrect')) {
        res.status(401).json({ 
          error: 'Invalid token',
          message: 'The provided authentication token is invalid.' 
        });
        return;
      }
    }

    res.status(403).json({ 
      error: 'Authentication failed',
      message: 'Unable to authenticate the request' 
    });
  }
};