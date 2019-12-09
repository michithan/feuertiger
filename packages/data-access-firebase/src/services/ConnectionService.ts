import {
  CollectionReference,
  DocumentSnapshot,
  WriteResult,
  QuerySnapshot,
  Firestore
} from "@google-cloud/firestore";
import {
  Node,
  Scalars,
  Connection,
  Edge,
  Filter
} from "@feuertiger/schema-graphql";
import { ParseId } from "@feuertiger/utils-graphql";

export interface IConnectionServiceClass {
  new (db: Firestore, collectionName: string): IConnectionService<Connection>;
}

export interface IConnectionService<T extends Connection = Connection> {
  //GetAll(filter?: Filter): Promise<T>;
  GetAllById(edgeId: Scalars["ID"], filter?: Filter): Promise<T>;
  Add(nodeId: Scalars["ID"], edgeId: Scalars["ID"]): Promise<boolean>;
  Remove(nodeId: Scalars["ID"], edgeId: Scalars["ID"]): Promise<boolean>;
}

export default class ConnectionService<T extends Connection = Connection>
  implements IConnectionService<T> {
  private collection: CollectionReference;

  constructor(private db: Firestore, collectionName: string) {
    this.collection = this.db.collection(collectionName);
  }

  private async ResolveConnection(nodeKeys: {
    [id: string]: boolean;
  }): Promise<T> {
    const nodeIds = Object.keys(nodeKeys);
    let edges: Array<Edge> = [];

    if (nodeIds.length > 0) {
      const { type } = ParseId(nodeIds[0]);
      const nodeCollection = this.db.collection(type);
      edges = await Promise.all(
        nodeIds.map<Promise<Edge>>(
          async (id: Scalars["ID"]): Promise<Edge> => {
            const node = (await nodeCollection.doc(id).get()) as Node;
            return {
              cursor: "",
              node
            };
          }
        )
      );
    }

    return {
      pageInfo: {
        hasNextPage: false
      },
      edges
    } as T;
  }

  //   public async GetAll(filter?: Filter): Promise<T> {
  //     try {
  //       const querySnapshot: QuerySnapshot = await this.collection.get();
  //       //return querySnapshot.docs.map<T>(doc => doc.data() as T);
  //       return [];
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  public async GetAllById(edgeId: Scalars["ID"], filter?: Filter): Promise<T> {
    try {
      const documentSnapshot: DocumentSnapshot = await this.collection
        .doc(edgeId)
        .get();
      const nodeKeys: { [id: string]: boolean } = documentSnapshot.data() || {};
      return await this.ResolveConnection(nodeKeys);
    } catch (error) {
      throw error;
    }
  }

  public async Add(
    nodeId: Scalars["ID"],
    edgeId: Scalars["ID"]
  ): Promise<boolean> {
    try {
      const writeResult: WriteResult = await this.collection
        .doc(edgeId)
        .update({ [nodeId]: true });
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async Remove(
    nodeId: Scalars["ID"],
    edgeId: Scalars["ID"]
  ): Promise<boolean> {
    try {
      const writeResult: WriteResult = await this.collection
        .doc(edgeId)
        .update({ [nodeId]: false });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
