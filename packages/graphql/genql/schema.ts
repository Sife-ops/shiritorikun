export type Scalars = {
    String: string,
    Int: number,
    ID: string,
    Boolean: boolean,
}

export interface Mutation {
    hello: Scalars['String']
    __typename: 'Mutation'
}

export interface Query {
    ranking: Shiritori[]
    __typename: 'Query'
}

export interface Shiritori {
    guildIcon?: Scalars['String']
    guildId: Scalars['String']
    guildName: Scalars['String']
    length: Scalars['Int']
    shiritoriId: Scalars['ID']
    __typename: 'Shiritori'
}

export interface MutationGenqlSelection{
    hello?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    ranking?: ShiritoriGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ShiritoriGenqlSelection{
    guildIcon?: boolean | number
    guildId?: boolean | number
    guildName?: boolean | number
    length?: boolean | number
    shiritoriId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const Shiritori_possibleTypes: string[] = ['Shiritori']
    export const isShiritori = (obj?: { __typename?: any } | null): obj is Shiritori => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isShiritori"')
      return Shiritori_possibleTypes.includes(obj.__typename)
    }
    