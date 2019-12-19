import {
    CollectionReference,
    DocumentSnapshot,
    WriteResult,
    DocumentReference,
    Firestore
} from '@google-cloud/firestore';
import { Node, Scalars, Connection, Edge } from '@feuertiger/schema-graphql';
import { GenerateId, ParseId } from '@feuertiger/utils-graphql';

export interface INodeServiceClass {
    new (db: Firestore, collectionName: string): INodeService<Node>;
}

export interface INodeService<T extends Node = Node> {
    GetById(id: Scalars['ID']): Promise<T>;
    Add(entity: Node): Promise<T>;
    Update(entity: T): Promise<T>;
    Remove(entity: T): Promise<T>;
    GetAll(filter?: any): Promise<Connection>;
    GetEdgesById(
        edgeId: Scalars['ID'],
        fieldname: string,
        filter?: any
    ): Promise<Connection>;
    AddEdge(nodeId: Scalars['ID'], edgeId: Scalars['ID']): Promise<boolean>;
    RemoveEdge(nodeId: Scalars['ID'], edgeId: Scalars['ID']): Promise<boolean>;
}

export default class NodeService<T extends Node = Node>
    implements INodeService<T> {
    GetAll = async (filter?: any): Promise<Connection> => ({} as Connection);

    Remove = async (entity: T): Promise<T> => ({} as T);

    AddEdge = async (nodeId: string, edgeId: string): Promise<boolean> => false;

    RemoveEdge = async (nodeId: string, edgeId: string): Promise<boolean> =>
        false;

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

    private async ResolveConnection(
        nodeIds: Scalars['ID'][]
    ): Promise<Connection> {
        const { type } = ParseId(nodeIds[0]);
        const nodeCollection = this.db.collection(type);
        const edges: Edge[] = await Promise.all(
            nodeIds.map<Promise<Edge>>(
                async (id: Scalars['ID']): Promise<Edge> => {
                    const documentSnapshot = await this.GetDocumentSnapshot(
                        id,
                        type
                    );
                    const node = documentSnapshot.data() as Node;
                    return {
                        cursor: '',
                        node
                    };
                }
            )
        );

        return {
            pageInfo: {
                hasNextPage: false
            },
            edges
        } as Connection;
    }

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

    public async GetEdgesById(
        id: Scalars['ID'],
        fieldname: string,
        filter?: any
    ): Promise<Connection> {
        try {
            console.log('collectionName: ', this.collectionName);
            const documentSnapshot: DocumentSnapshot = await this.collection
                .doc(id)
                .get();
            const edges = documentSnapshot.get(fieldname);
            console.log('edges: ', edges);
            const nodeIds = edges && Object.keys(edges).filter(id => edges[id]);

            console.log('nodeIds: ', nodeIds);

            if (nodeIds && nodeIds.length > 0) {
                return await this.ResolveConnection(nodeIds);
            }
            return {} as Connection;
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
