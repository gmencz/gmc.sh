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

export type Me = {
  __typename?: 'Me'
  account?: Maybe<Account>
  user_id: Scalars['String']
}

export type MeOutput = {
  __typename?: 'MeOutput'
  account?: Maybe<Account>
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

/** columns and relationships of "account" */
export type Account = {
  __typename?: 'account'
  company?: Maybe<Scalars['String']>
  id: Scalars['String']
  last_seen: Scalars['timestamptz']
  name: Scalars['String']
  picture?: Maybe<Scalars['String']>
  /** An array relationship */
  schedules: Array<Schedule>
  /** An aggregated array relationship */
  schedules_aggregate: Schedule_Aggregate
  verified: Scalars['Boolean']
}

/** columns and relationships of "account" */
export type AccountSchedulesArgs = {
  distinct_on?: Maybe<Array<Schedule_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Order_By>>
  where?: Maybe<Schedule_Bool_Exp>
}

/** columns and relationships of "account" */
export type AccountSchedules_AggregateArgs = {
  distinct_on?: Maybe<Array<Schedule_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Order_By>>
  where?: Maybe<Schedule_Bool_Exp>
}

/** aggregated selection of "account" */
export type Account_Aggregate = {
  __typename?: 'account_aggregate'
  aggregate?: Maybe<Account_Aggregate_Fields>
  nodes: Array<Account>
}

/** aggregate fields of "account" */
export type Account_Aggregate_Fields = {
  __typename?: 'account_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<Account_Max_Fields>
  min?: Maybe<Account_Min_Fields>
}

/** aggregate fields of "account" */
export type Account_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Account_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "account" */
export type Account_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Account_Max_Order_By>
  min?: Maybe<Account_Min_Order_By>
}

/** input type for inserting array relation for remote table "account" */
export type Account_Arr_Rel_Insert_Input = {
  data: Array<Account_Insert_Input>
  on_conflict?: Maybe<Account_On_Conflict>
}

/** Boolean expression to filter rows from the table "account". All fields are combined with a logical 'AND'. */
export type Account_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Account_Bool_Exp>>>
  _not?: Maybe<Account_Bool_Exp>
  _or?: Maybe<Array<Maybe<Account_Bool_Exp>>>
  company?: Maybe<String_Comparison_Exp>
  id?: Maybe<String_Comparison_Exp>
  last_seen?: Maybe<Timestamptz_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  picture?: Maybe<String_Comparison_Exp>
  schedules?: Maybe<Schedule_Bool_Exp>
  verified?: Maybe<Boolean_Comparison_Exp>
}

/** unique or primary key constraints on table "account" */
export enum Account_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey',
}

/** input type for inserting data into table "account" */
export type Account_Insert_Input = {
  company?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  schedules?: Maybe<Schedule_Arr_Rel_Insert_Input>
  verified?: Maybe<Scalars['Boolean']>
}

/** aggregate max on columns */
export type Account_Max_Fields = {
  __typename?: 'account_max_fields'
  company?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "account" */
export type Account_Max_Order_By = {
  company?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  name?: Maybe<Order_By>
  picture?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Account_Min_Fields = {
  __typename?: 'account_min_fields'
  company?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "account" */
export type Account_Min_Order_By = {
  company?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  name?: Maybe<Order_By>
  picture?: Maybe<Order_By>
}

/** response of any mutation on the table "account" */
export type Account_Mutation_Response = {
  __typename?: 'account_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Account>
}

/** input type for inserting object relation for remote table "account" */
export type Account_Obj_Rel_Insert_Input = {
  data: Account_Insert_Input
  on_conflict?: Maybe<Account_On_Conflict>
}

/** on conflict condition type for table "account" */
export type Account_On_Conflict = {
  constraint: Account_Constraint
  update_columns: Array<Account_Update_Column>
  where?: Maybe<Account_Bool_Exp>
}

/** ordering options when selecting data from "account" */
export type Account_Order_By = {
  company?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  name?: Maybe<Order_By>
  picture?: Maybe<Order_By>
  schedules_aggregate?: Maybe<Schedule_Aggregate_Order_By>
  verified?: Maybe<Order_By>
}

/** primary key columns input for table: "account" */
export type Account_Pk_Columns_Input = {
  id: Scalars['String']
}

/** select columns of table "account" */
export enum Account_Select_Column {
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

/** input type for updating data in table "account" */
export type Account_Set_Input = {
  company?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  verified?: Maybe<Scalars['Boolean']>
}

/** update columns of table "account" */
export enum Account_Update_Column {
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

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root'
  /** delete data from the table: "account" */
  delete_account?: Maybe<Account_Mutation_Response>
  /** delete single row from the table: "account" */
  delete_account_by_pk?: Maybe<Account>
  /** delete data from the table: "schedule" */
  delete_schedule?: Maybe<Schedule_Mutation_Response>
  /** delete single row from the table: "schedule" */
  delete_schedule_by_pk?: Maybe<Schedule>
  /** insert data into the table: "account" */
  insert_account?: Maybe<Account_Mutation_Response>
  /** insert a single row into the table: "account" */
  insert_account_one?: Maybe<Account>
  /** insert data into the table: "schedule" */
  insert_schedule?: Maybe<Schedule_Mutation_Response>
  /** insert a single row into the table: "schedule" */
  insert_schedule_one?: Maybe<Schedule>
  /** update data of the table: "account" */
  update_account?: Maybe<Account_Mutation_Response>
  /** update single row of the table: "account" */
  update_account_by_pk?: Maybe<Account>
  /** update data of the table: "schedule" */
  update_schedule?: Maybe<Schedule_Mutation_Response>
  /** update single row of the table: "schedule" */
  update_schedule_by_pk?: Maybe<Schedule>
}

/** mutation root */
export type Mutation_RootDelete_AccountArgs = {
  where: Account_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Account_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_ScheduleArgs = {
  where: Schedule_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Schedule_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootInsert_AccountArgs = {
  objects: Array<Account_Insert_Input>
  on_conflict?: Maybe<Account_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Account_OneArgs = {
  object: Account_Insert_Input
  on_conflict?: Maybe<Account_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_ScheduleArgs = {
  objects: Array<Schedule_Insert_Input>
  on_conflict?: Maybe<Schedule_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Schedule_OneArgs = {
  object: Schedule_Insert_Input
  on_conflict?: Maybe<Schedule_On_Conflict>
}

/** mutation root */
export type Mutation_RootUpdate_AccountArgs = {
  _set?: Maybe<Account_Set_Input>
  where: Account_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Account_By_PkArgs = {
  _set?: Maybe<Account_Set_Input>
  pk_columns: Account_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_ScheduleArgs = {
  _set?: Maybe<Schedule_Set_Input>
  where: Schedule_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Schedule_By_PkArgs = {
  _set?: Maybe<Schedule_Set_Input>
  pk_columns: Schedule_Pk_Columns_Input
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
  /** fetch data from the table: "account" */
  account: Array<Account>
  /** fetch aggregated fields from the table: "account" */
  account_aggregate: Account_Aggregate
  /** fetch data from the table: "account" using primary key columns */
  account_by_pk?: Maybe<Account>
  /** perform the action: "me" */
  me: Me
  /** fetch data from the table: "schedule" */
  schedule: Array<Schedule>
  /** fetch aggregated fields from the table: "schedule" */
  schedule_aggregate: Schedule_Aggregate
  /** fetch data from the table: "schedule" using primary key columns */
  schedule_by_pk?: Maybe<Schedule>
}

/** query root */
export type Query_RootAccountArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Account_Order_By>>
  where?: Maybe<Account_Bool_Exp>
}

/** query root */
export type Query_RootAccount_AggregateArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Account_Order_By>>
  where?: Maybe<Account_Bool_Exp>
}

/** query root */
export type Query_RootAccount_By_PkArgs = {
  id: Scalars['String']
}

/** query root */
export type Query_RootScheduleArgs = {
  distinct_on?: Maybe<Array<Schedule_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Order_By>>
  where?: Maybe<Schedule_Bool_Exp>
}

/** query root */
export type Query_RootSchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<Schedule_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Order_By>>
  where?: Maybe<Schedule_Bool_Exp>
}

/** query root */
export type Query_RootSchedule_By_PkArgs = {
  id: Scalars['uuid']
}

/** columns and relationships of "schedule" */
export type Schedule = {
  __typename?: 'schedule'
  active: Scalars['Boolean']
  created_at: Scalars['timestamptz']
  id: Scalars['uuid']
  title: Scalars['String']
  updated_at: Scalars['timestamptz']
  /** An object relationship */
  user?: Maybe<Account>
  user_id: Scalars['String']
}

/** aggregated selection of "schedule" */
export type Schedule_Aggregate = {
  __typename?: 'schedule_aggregate'
  aggregate?: Maybe<Schedule_Aggregate_Fields>
  nodes: Array<Schedule>
}

/** aggregate fields of "schedule" */
export type Schedule_Aggregate_Fields = {
  __typename?: 'schedule_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<Schedule_Max_Fields>
  min?: Maybe<Schedule_Min_Fields>
}

/** aggregate fields of "schedule" */
export type Schedule_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Schedule_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "schedule" */
export type Schedule_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Schedule_Max_Order_By>
  min?: Maybe<Schedule_Min_Order_By>
}

/** input type for inserting array relation for remote table "schedule" */
export type Schedule_Arr_Rel_Insert_Input = {
  data: Array<Schedule_Insert_Input>
  on_conflict?: Maybe<Schedule_On_Conflict>
}

/** Boolean expression to filter rows from the table "schedule". All fields are combined with a logical 'AND'. */
export type Schedule_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Schedule_Bool_Exp>>>
  _not?: Maybe<Schedule_Bool_Exp>
  _or?: Maybe<Array<Maybe<Schedule_Bool_Exp>>>
  active?: Maybe<Boolean_Comparison_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  title?: Maybe<String_Comparison_Exp>
  updated_at?: Maybe<Timestamptz_Comparison_Exp>
  user?: Maybe<Account_Bool_Exp>
  user_id?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "schedule" */
export enum Schedule_Constraint {
  /** unique or primary key constraint */
  SchedulesPkey = 'schedules_pkey',
}

/** input type for inserting data into table "schedule" */
export type Schedule_Insert_Input = {
  active?: Maybe<Scalars['Boolean']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['uuid']>
  title?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user?: Maybe<Account_Obj_Rel_Insert_Input>
  user_id?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Schedule_Max_Fields = {
  __typename?: 'schedule_max_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['uuid']>
  title?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user_id?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "schedule" */
export type Schedule_Max_Order_By = {
  created_at?: Maybe<Order_By>
  id?: Maybe<Order_By>
  title?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
  user_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Schedule_Min_Fields = {
  __typename?: 'schedule_min_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['uuid']>
  title?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user_id?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "schedule" */
export type Schedule_Min_Order_By = {
  created_at?: Maybe<Order_By>
  id?: Maybe<Order_By>
  title?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
  user_id?: Maybe<Order_By>
}

/** response of any mutation on the table "schedule" */
export type Schedule_Mutation_Response = {
  __typename?: 'schedule_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Schedule>
}

/** input type for inserting object relation for remote table "schedule" */
export type Schedule_Obj_Rel_Insert_Input = {
  data: Schedule_Insert_Input
  on_conflict?: Maybe<Schedule_On_Conflict>
}

/** on conflict condition type for table "schedule" */
export type Schedule_On_Conflict = {
  constraint: Schedule_Constraint
  update_columns: Array<Schedule_Update_Column>
  where?: Maybe<Schedule_Bool_Exp>
}

/** ordering options when selecting data from "schedule" */
export type Schedule_Order_By = {
  active?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  id?: Maybe<Order_By>
  title?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
  user?: Maybe<Account_Order_By>
  user_id?: Maybe<Order_By>
}

/** primary key columns input for table: "schedule" */
export type Schedule_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "schedule" */
export enum Schedule_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "schedule" */
export type Schedule_Set_Input = {
  active?: Maybe<Scalars['Boolean']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['uuid']>
  title?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user_id?: Maybe<Scalars['String']>
}

/** update columns of table "schedule" */
export enum Schedule_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** fetch data from the table: "account" */
  account: Array<Account>
  /** fetch aggregated fields from the table: "account" */
  account_aggregate: Account_Aggregate
  /** fetch data from the table: "account" using primary key columns */
  account_by_pk?: Maybe<Account>
  /** perform the action: "me" */
  me: Me
  /** fetch data from the table: "schedule" */
  schedule: Array<Schedule>
  /** fetch aggregated fields from the table: "schedule" */
  schedule_aggregate: Schedule_Aggregate
  /** fetch data from the table: "schedule" using primary key columns */
  schedule_by_pk?: Maybe<Schedule>
}

/** subscription root */
export type Subscription_RootAccountArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Account_Order_By>>
  where?: Maybe<Account_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAccount_AggregateArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Account_Order_By>>
  where?: Maybe<Account_Bool_Exp>
}

/** subscription root */
export type Subscription_RootAccount_By_PkArgs = {
  id: Scalars['String']
}

/** subscription root */
export type Subscription_RootScheduleArgs = {
  distinct_on?: Maybe<Array<Schedule_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Order_By>>
  where?: Maybe<Schedule_Bool_Exp>
}

/** subscription root */
export type Subscription_RootSchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<Schedule_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Order_By>>
  where?: Maybe<Schedule_Bool_Exp>
}

/** subscription root */
export type Subscription_RootSchedule_By_PkArgs = {
  id: Scalars['uuid']
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

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>
  _gt?: Maybe<Scalars['uuid']>
  _gte?: Maybe<Scalars['uuid']>
  _in?: Maybe<Array<Scalars['uuid']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['uuid']>
  _lte?: Maybe<Scalars['uuid']>
  _neq?: Maybe<Scalars['uuid']>
  _nin?: Maybe<Array<Scalars['uuid']>>
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'query_root' } & {
  me: { __typename?: 'Me' } & Pick<Me, 'user_id'> & {
      account?: Maybe<
        { __typename?: 'account' } & Pick<
          Account,
          'last_seen' | 'company' | 'name' | 'picture' | 'verified'
        >
      >
    }
}

export type UserQueryVariables = Exact<{
  id: Scalars['String']
}>

export type UserQuery = { __typename?: 'query_root' } & {
  account_by_pk?: Maybe<
    { __typename?: 'account' } & Pick<
      Account,
      'id' | 'name' | 'company' | 'picture' | 'last_seen' | 'verified'
    >
  >
}

export const MeDocument = `
    query Me {
  me {
    user_id
    account {
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
  account_by_pk(id: $id) {
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
