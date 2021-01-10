import { useQuery, UseQueryOptions } from 'react-query'
import { fetcher } from 'utils/gql-client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  json: any
  timestamptz: string
  uuid: any
}

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>
  _gt?: Maybe<Scalars['Boolean']>
  _gte?: Maybe<Scalars['Boolean']>
  _in?: Maybe<Array<Scalars['Boolean']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['Boolean']>
  _lte?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Scalars['Boolean']>
  _nin?: Maybe<Array<Scalars['Boolean']>>
}

export type MeOutput = {
  __typename?: 'MeOutput'
  profile?: Maybe<Users>
  user_id: Scalars['String']
}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>
  _gt?: Maybe<Scalars['String']>
  _gte?: Maybe<Scalars['String']>
  _ilike?: Maybe<Scalars['String']>
  _in?: Maybe<Array<Scalars['String']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _like?: Maybe<Scalars['String']>
  _lt?: Maybe<Scalars['String']>
  _lte?: Maybe<Scalars['String']>
  _neq?: Maybe<Scalars['String']>
  _nilike?: Maybe<Scalars['String']>
  _nin?: Maybe<Array<Scalars['String']>>
  _nlike?: Maybe<Scalars['String']>
  _nsimilar?: Maybe<Scalars['String']>
  _similar?: Maybe<Scalars['String']>
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root'
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>
}

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>
  on_conflict?: Maybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input
  on_conflict?: Maybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>
  pk_columns: Users_Pk_Columns_Input
}

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root'
  /** perform the action: "me" */
  me: MeOutput
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
}

/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String']
}

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** perform the action: "me" */
  me: MeOutput
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
}

/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String']
}

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>
  _gt?: Maybe<Scalars['timestamptz']>
  _gte?: Maybe<Scalars['timestamptz']>
  _in?: Maybe<Array<Scalars['timestamptz']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['timestamptz']>
  _lte?: Maybe<Scalars['timestamptz']>
  _neq?: Maybe<Scalars['timestamptz']>
  _nin?: Maybe<Array<Scalars['timestamptz']>>
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users'
  company?: Maybe<Scalars['String']>
  id: Scalars['String']
  last_seen: Scalars['timestamptz']
  name: Scalars['String']
  picture?: Maybe<Scalars['String']>
  verified: Scalars['Boolean']
}

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate'
  aggregate?: Maybe<Users_Aggregate_Fields>
  nodes: Array<Users>
}

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<Users_Max_Fields>
  min?: Maybe<Users_Min_Fields>
}

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Users_Max_Order_By>
  min?: Maybe<Users_Min_Order_By>
}

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>
  on_conflict?: Maybe<Users_On_Conflict>
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>
  _not?: Maybe<Users_Bool_Exp>
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>
  company?: Maybe<String_Comparison_Exp>
  id?: Maybe<String_Comparison_Exp>
  last_seen?: Maybe<Timestamptz_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  picture?: Maybe<String_Comparison_Exp>
  verified?: Maybe<Boolean_Comparison_Exp>
}

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey',
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  company?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  verified?: Maybe<Scalars['Boolean']>
}

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields'
  company?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  company?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  name?: Maybe<Order_By>
  picture?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields'
  company?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  company?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  name?: Maybe<Order_By>
  picture?: Maybe<Order_By>
}

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Users>
}

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input
  on_conflict?: Maybe<Users_On_Conflict>
}

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint
  update_columns: Array<Users_Update_Column>
  where?: Maybe<Users_Bool_Exp>
}

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  company?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  name?: Maybe<Order_By>
  picture?: Maybe<Order_By>
  verified?: Maybe<Order_By>
}

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['String']
}

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Company = 'company',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Name = 'name',
  /** column name */
  Picture = 'picture',
  /** column name */
  Verified = 'verified',
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  company?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  verified?: Maybe<Scalars['Boolean']>
}

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Company = 'company',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Name = 'name',
  /** column name */
  Picture = 'picture',
  /** column name */
  Verified = 'verified',
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'query_root' } & {
  me: { __typename?: 'MeOutput' } & Pick<MeOutput, 'user_id'> & {
      profile?: Maybe<
        { __typename?: 'users' } & Pick<
          Users,
          'last_seen' | 'company' | 'name' | 'picture' | 'verified'
        >
      >
    }
}

export type UserQueryVariables = Exact<{
  id: Scalars['String']
}>

export type UserQuery = { __typename?: 'query_root' } & {
  users_by_pk?: Maybe<
    { __typename?: 'users' } & Pick<
      Users,
      'id' | 'name' | 'company' | 'picture' | 'last_seen' | 'verified'
    >
  >
}

export const MeDocument = `
    query Me {
  me {
    user_id
    profile {
      last_seen
      company
      name
      picture
      verified
    }
  }
}
    `
export const useMeQuery = <TData = MeQuery, TError = unknown>(
  variables?: MeQueryVariables,
  options?: UseQueryOptions<MeQuery, TError, TData>,
) =>
  useQuery<MeQuery, TError, TData>(
    ['Me', variables],
    fetcher<MeQuery, MeQueryVariables>(MeDocument, variables),
    options,
  )
export const UserDocument = `
    query User($id: String!) {
  users_by_pk(id: $id) {
    id
    name
    company
    picture
    last_seen
    verified
  }
}
    `
export const useUserQuery = <TData = UserQuery, TError = unknown>(
  variables: UserQueryVariables,
  options?: UseQueryOptions<UserQuery, TError, TData>,
) =>
  useQuery<UserQuery, TError, TData>(
    ['User', variables],
    fetcher<UserQuery, UserQueryVariables>(UserDocument, variables),
    options,
  )
