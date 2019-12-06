export declare interface Node {
  id: string;
}

export declare interface Edge {
  cursor: string;
  node: Node;
}

export declare interface Connection {
  pageInfo: PageInfo;
  edges: [Edge];
}

export declare interface PageInfo {
  hasNextPage: boolean;
}
