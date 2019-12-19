import {
    CollectionReference,
    DocumentSnapshot,
    WriteResult,
    DocumentReference,
    Firestore
} from '@google-cloud/firestore';
import { Node, Scalars } from '@feuertiger/schema-graphql';
import { GenerateId, ParseId } from '@feuertiger/utils-graphql';

export interface INodeServiceClass {
    new (db: Firestore, collectionName: string): INodeService<Node>;
}

export interface INodeService<T extends Node = Node> {
    GetById(id: Scalars['ID']): Promise<T>;
    Add(entity: Node): Promise<T>;
    Update(entity: T): Promise<T>;
}

export default class NodeService<T extends Node = Node>
    implements INodeService<T> {
    private collection: CollectionReference;

    constructor(private db: Firestore, private collectionName: string) {
        this.collection = this.db.collection(collectionName);
    }

    private GetDocument = (
        id: Scalars['ID'],
        nodeType?: string
    ): DocumentReference =>
        nodeType
            ? this.db.collection(nodeType).doc(id)
            : this.collection.doc(id);

    private GetDocumentSnapshot = async (
        id: Scalars['ID'],
        nodeType?: string
    ): Promise<DocumentSnapshot> => await this.GetDocument(id, nodeType).get();

    private SetDocumentSnapshot = async (
        id: Scalars['ID'],
        entity: Node,
        nodeType?: string
    ): Promise<WriteResult> => await this.GetDocument(id, nodeType).set(entity);

    public async GetById(id: Scalars['ID']): Promise<T> {
        try {
            const { type: nodeType } = ParseId(id);

            const documentSnapshot: DocumentSnapshot = await this.GetDocumentSnapshot(
                id,
                nodeType
            );
            const entity: T = documentSnapshot.data() as T;
            return entity;
        } catch (error) {
            throw error;
        }
    }

    public async Add(entity: Node): Promise<T> {
        try {
            const id = GenerateId(this.collection.id);

            const writeResult: WriteResult = await this.SetDocumentSnapshot(
                id,
                entity
            );

            return await this.GetById(id);
        } catch (error) {
            throw error;
        }
    }

    public async Update(entity: T): Promise<T> {
        try {
            const writeResult: WriteResult = await this.GetDocument(
                entity.id
            ).update(entity);

            return await this.GetById(entity.id);
        } catch (error) {
            throw error;
        }
    }

    public async AddOrUpdate(entity: T): Promise<T> {
        try {
            const exists =
                entity.id && (await this.GetDocumentSnapshot(entity.id)).exists;

            if (exists) {
                this.Update(entity);
            } else {
                this.Add(entity);
            }

            return await this.GetById(entity.id);
        } catch (error) {
            throw error;
        }
    }
}
