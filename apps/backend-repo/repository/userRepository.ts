import { User } from '../schemas/types/user';
import { calculatePotentialScore } from '../commons/utils/scoring';
import { db } from '../config/firebaseConfig';

export class UserRepository {
  protected readonly collection: FirebaseFirestore.CollectionReference;

  constructor() {
    this.collection = db.collection('USERS');
  }

  async getLastDocument(docId: string) {
    return await this.collection.doc(docId).get();
  }

  async getMostPotentialUsers(
    pageSize: number = 10,
    lastDoc?: FirebaseFirestore.DocumentSnapshot
  ) {
    try {
      let query = this.collection
        .orderBy('totalAverageWeightRatings', 'desc')
        .orderBy('numberOfRents', 'desc')
        .orderBy('recentlyActive', 'desc');

      if (lastDoc) {
        query = query.startAfter(lastDoc);
      }

      const snapshot = await query.limit(pageSize).get();
      
      const users: (User & { potentialScore: number })[] = [];
      
      snapshot.forEach(doc => {
        const userData = {
          id: doc.id,
          ...doc.data()
        } as User;
        
        const potentialScore = calculatePotentialScore(userData);
        users.push({
          ...userData,
          potentialScore
        });
      });

      // Sort by calculated potential score
      users.sort((a, b) => b.potentialScore - a.potentialScore);

      return {
        users,
        lastDoc: snapshot.docs[snapshot.docs.length - 1],
        hasMore: snapshot.docs.length === pageSize
      };
    } catch (error) {
      console.error('Error fetching potential users:', error);
      throw error;
    }
  }

  async updateUser(userId: string, updates: Partial<User>) {
    try {
      const userDoc = await this.collection.doc(userId).get();
      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      await this.collection.doc(userId).update(updates);
      
      const updatedDoc = await this.collection.doc(userId).get();
      return {
        id: userId,
        ...updatedDoc.data()
      } as User;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}