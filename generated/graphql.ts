import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from 'react-query'
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
  timetz: any
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

/**
 * User accounts
 *
 *
 * columns and relationships of "account"
 */
export type Account = {
  __typename?: 'account'
  company?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id: Scalars['String']
  last_seen: Scalars['timestamptz']
  name: Scalars['String']
  picture?: Maybe<Scalars['String']>
  /** An array relationship */
  schedules: Array<Schedule>
  /** An aggregated array relationship */
  schedules_aggregate: Schedule_Aggregate
  updated_at?: Maybe<Scalars['timestamptz']>
  verified: Scalars['Boolean']
}

/**
 * User accounts
 *
 *
 * columns and relationships of "account"
 */
export type AccountSchedulesArgs = {
  distinct_on?: Maybe<Array<Schedule_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Order_By>>
  where?: Maybe<Schedule_Bool_Exp>
}

/**
 * User accounts
 *
 *
 * columns and relationships of "account"
 */
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
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  id?: Maybe<String_Comparison_Exp>
  last_seen?: Maybe<Timestamptz_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  picture?: Maybe<String_Comparison_Exp>
  schedules?: Maybe<Schedule_Bool_Exp>
  updated_at?: Maybe<Timestamptz_Comparison_Exp>
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
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['String']>
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  schedules?: Maybe<Schedule_Arr_Rel_Insert_Input>
  updated_at?: Maybe<Scalars['timestamptz']>
  verified?: Maybe<Scalars['Boolean']>
}

/** aggregate max on columns */
export type Account_Max_Fields = {
  __typename?: 'account_max_fields'
  company?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['String']>
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "account" */
export type Account_Max_Order_By = {
  company?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  name?: Maybe<Order_By>
  picture?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Account_Min_Fields = {
  __typename?: 'account_min_fields'
  company?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['String']>
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "account" */
export type Account_Min_Order_By = {
  company?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  name?: Maybe<Order_By>
  picture?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
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
  created_at?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  name?: Maybe<Order_By>
  picture?: Maybe<Order_By>
  schedules_aggregate?: Maybe<Schedule_Aggregate_Order_By>
  updated_at?: Maybe<Order_By>
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
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Name = 'name',
  /** column name */
  Picture = 'picture',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Verified = 'verified',
}

/** input type for updating data in table "account" */
export type Account_Set_Input = {
  company?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['String']>
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  verified?: Maybe<Scalars['Boolean']>
}

/** update columns of table "account" */
export enum Account_Update_Column {
  /** column name */
  Company = 'company',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Name = 'name',
  /** column name */
  Picture = 'picture',
  /** column name */
  UpdatedAt = 'updated_at',
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
  /** delete data from the table: "schedule_day" */
  delete_schedule_day?: Maybe<Schedule_Day_Mutation_Response>
  /** delete single row from the table: "schedule_day" */
  delete_schedule_day_by_pk?: Maybe<Schedule_Day>
  /** delete data from the table: "schedule_day_task" */
  delete_schedule_day_task?: Maybe<Schedule_Day_Task_Mutation_Response>
  /** delete single row from the table: "schedule_day_task" */
  delete_schedule_day_task_by_pk?: Maybe<Schedule_Day_Task>
  /** delete data from the table: "schedule_day_week_day" */
  delete_schedule_day_week_day?: Maybe<Schedule_Day_Week_Day_Mutation_Response>
  /** delete single row from the table: "schedule_day_week_day" */
  delete_schedule_day_week_day_by_pk?: Maybe<Schedule_Day_Week_Day>
  /** insert data into the table: "account" */
  insert_account?: Maybe<Account_Mutation_Response>
  /** insert a single row into the table: "account" */
  insert_account_one?: Maybe<Account>
  /** insert data into the table: "schedule" */
  insert_schedule?: Maybe<Schedule_Mutation_Response>
  /** insert data into the table: "schedule_day" */
  insert_schedule_day?: Maybe<Schedule_Day_Mutation_Response>
  /** insert a single row into the table: "schedule_day" */
  insert_schedule_day_one?: Maybe<Schedule_Day>
  /** insert data into the table: "schedule_day_task" */
  insert_schedule_day_task?: Maybe<Schedule_Day_Task_Mutation_Response>
  /** insert a single row into the table: "schedule_day_task" */
  insert_schedule_day_task_one?: Maybe<Schedule_Day_Task>
  /** insert data into the table: "schedule_day_week_day" */
  insert_schedule_day_week_day?: Maybe<Schedule_Day_Week_Day_Mutation_Response>
  /** insert a single row into the table: "schedule_day_week_day" */
  insert_schedule_day_week_day_one?: Maybe<Schedule_Day_Week_Day>
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
  /** update data of the table: "schedule_day" */
  update_schedule_day?: Maybe<Schedule_Day_Mutation_Response>
  /** update single row of the table: "schedule_day" */
  update_schedule_day_by_pk?: Maybe<Schedule_Day>
  /** update data of the table: "schedule_day_task" */
  update_schedule_day_task?: Maybe<Schedule_Day_Task_Mutation_Response>
  /** update single row of the table: "schedule_day_task" */
  update_schedule_day_task_by_pk?: Maybe<Schedule_Day_Task>
  /** update data of the table: "schedule_day_week_day" */
  update_schedule_day_week_day?: Maybe<Schedule_Day_Week_Day_Mutation_Response>
  /** update single row of the table: "schedule_day_week_day" */
  update_schedule_day_week_day_by_pk?: Maybe<Schedule_Day_Week_Day>
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
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Schedule_DayArgs = {
  where: Schedule_Day_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Schedule_Day_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Schedule_Day_TaskArgs = {
  where: Schedule_Day_Task_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Schedule_Day_Task_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Schedule_Day_Week_DayArgs = {
  where: Schedule_Day_Week_Day_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Schedule_Day_Week_Day_By_PkArgs = {
  day: Scalars['String']
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
export type Mutation_RootInsert_Schedule_DayArgs = {
  objects: Array<Schedule_Day_Insert_Input>
  on_conflict?: Maybe<Schedule_Day_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Schedule_Day_OneArgs = {
  object: Schedule_Day_Insert_Input
  on_conflict?: Maybe<Schedule_Day_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Schedule_Day_TaskArgs = {
  objects: Array<Schedule_Day_Task_Insert_Input>
  on_conflict?: Maybe<Schedule_Day_Task_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Schedule_Day_Task_OneArgs = {
  object: Schedule_Day_Task_Insert_Input
  on_conflict?: Maybe<Schedule_Day_Task_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Schedule_Day_Week_DayArgs = {
  objects: Array<Schedule_Day_Week_Day_Insert_Input>
  on_conflict?: Maybe<Schedule_Day_Week_Day_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Schedule_Day_Week_Day_OneArgs = {
  object: Schedule_Day_Week_Day_Insert_Input
  on_conflict?: Maybe<Schedule_Day_Week_Day_On_Conflict>
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

/** mutation root */
export type Mutation_RootUpdate_Schedule_DayArgs = {
  _set?: Maybe<Schedule_Day_Set_Input>
  where: Schedule_Day_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Schedule_Day_By_PkArgs = {
  _set?: Maybe<Schedule_Day_Set_Input>
  pk_columns: Schedule_Day_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Schedule_Day_TaskArgs = {
  _set?: Maybe<Schedule_Day_Task_Set_Input>
  where: Schedule_Day_Task_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Schedule_Day_Task_By_PkArgs = {
  _set?: Maybe<Schedule_Day_Task_Set_Input>
  pk_columns: Schedule_Day_Task_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Schedule_Day_Week_DayArgs = {
  _set?: Maybe<Schedule_Day_Week_Day_Set_Input>
  where: Schedule_Day_Week_Day_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Schedule_Day_Week_Day_By_PkArgs = {
  _set?: Maybe<Schedule_Day_Week_Day_Set_Input>
  pk_columns: Schedule_Day_Week_Day_Pk_Columns_Input
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
  /** fetch data from the table: "schedule_day" */
  schedule_day: Array<Schedule_Day>
  /** fetch aggregated fields from the table: "schedule_day" */
  schedule_day_aggregate: Schedule_Day_Aggregate
  /** fetch data from the table: "schedule_day" using primary key columns */
  schedule_day_by_pk?: Maybe<Schedule_Day>
  /** fetch data from the table: "schedule_day_task" */
  schedule_day_task: Array<Schedule_Day_Task>
  /** fetch aggregated fields from the table: "schedule_day_task" */
  schedule_day_task_aggregate: Schedule_Day_Task_Aggregate
  /** fetch data from the table: "schedule_day_task" using primary key columns */
  schedule_day_task_by_pk?: Maybe<Schedule_Day_Task>
  /** fetch data from the table: "schedule_day_week_day" */
  schedule_day_week_day: Array<Schedule_Day_Week_Day>
  /** fetch aggregated fields from the table: "schedule_day_week_day" */
  schedule_day_week_day_aggregate: Schedule_Day_Week_Day_Aggregate
  /** fetch data from the table: "schedule_day_week_day" using primary key columns */
  schedule_day_week_day_by_pk?: Maybe<Schedule_Day_Week_Day>
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
  id: Scalars['String']
}

/** query root */
export type Query_RootSchedule_DayArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Order_By>>
  where?: Maybe<Schedule_Day_Bool_Exp>
}

/** query root */
export type Query_RootSchedule_Day_AggregateArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Order_By>>
  where?: Maybe<Schedule_Day_Bool_Exp>
}

/** query root */
export type Query_RootSchedule_Day_By_PkArgs = {
  id: Scalars['String']
}

/** query root */
export type Query_RootSchedule_Day_TaskArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Task_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Task_Order_By>>
  where?: Maybe<Schedule_Day_Task_Bool_Exp>
}

/** query root */
export type Query_RootSchedule_Day_Task_AggregateArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Task_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Task_Order_By>>
  where?: Maybe<Schedule_Day_Task_Bool_Exp>
}

/** query root */
export type Query_RootSchedule_Day_Task_By_PkArgs = {
  id: Scalars['String']
}

/** query root */
export type Query_RootSchedule_Day_Week_DayArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Week_Day_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Week_Day_Order_By>>
  where?: Maybe<Schedule_Day_Week_Day_Bool_Exp>
}

/** query root */
export type Query_RootSchedule_Day_Week_Day_AggregateArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Week_Day_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Week_Day_Order_By>>
  where?: Maybe<Schedule_Day_Week_Day_Bool_Exp>
}

/** query root */
export type Query_RootSchedule_Day_Week_Day_By_PkArgs = {
  day: Scalars['String']
}

/**
 * Schedules of users
 *
 *
 * columns and relationships of "schedule"
 */
export type Schedule = {
  __typename?: 'schedule'
  active: Scalars['Boolean']
  created_at: Scalars['timestamptz']
  /** An array relationship */
  days: Array<Schedule_Day>
  /** An aggregated array relationship */
  days_aggregate: Schedule_Day_Aggregate
  id: Scalars['String']
  title: Scalars['String']
  updated_at: Scalars['timestamptz']
  /** An object relationship */
  user?: Maybe<Account>
  user_id: Scalars['String']
}

/**
 * Schedules of users
 *
 *
 * columns and relationships of "schedule"
 */
export type ScheduleDaysArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Order_By>>
  where?: Maybe<Schedule_Day_Bool_Exp>
}

/**
 * Schedules of users
 *
 *
 * columns and relationships of "schedule"
 */
export type ScheduleDays_AggregateArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Order_By>>
  where?: Maybe<Schedule_Day_Bool_Exp>
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
  days?: Maybe<Schedule_Day_Bool_Exp>
  id?: Maybe<String_Comparison_Exp>
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

/**
 * Days of a schedule
 *
 *
 * columns and relationships of "schedule_day"
 */
export type Schedule_Day = {
  __typename?: 'schedule_day'
  active: Scalars['Boolean']
  created_at: Scalars['timestamptz']
  id: Scalars['String']
  /** An object relationship */
  schedule?: Maybe<Schedule>
  schedule_id: Scalars['String']
  /** An array relationship */
  tasks: Array<Schedule_Day_Task>
  /** An aggregated array relationship */
  tasks_aggregate: Schedule_Day_Task_Aggregate
  updated_at: Scalars['timestamptz']
  week_day: Schedule_Day_Week_Day_Enum
}

/**
 * Days of a schedule
 *
 *
 * columns and relationships of "schedule_day"
 */
export type Schedule_DayTasksArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Task_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Task_Order_By>>
  where?: Maybe<Schedule_Day_Task_Bool_Exp>
}

/**
 * Days of a schedule
 *
 *
 * columns and relationships of "schedule_day"
 */
export type Schedule_DayTasks_AggregateArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Task_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Task_Order_By>>
  where?: Maybe<Schedule_Day_Task_Bool_Exp>
}

/** aggregated selection of "schedule_day" */
export type Schedule_Day_Aggregate = {
  __typename?: 'schedule_day_aggregate'
  aggregate?: Maybe<Schedule_Day_Aggregate_Fields>
  nodes: Array<Schedule_Day>
}

/** aggregate fields of "schedule_day" */
export type Schedule_Day_Aggregate_Fields = {
  __typename?: 'schedule_day_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<Schedule_Day_Max_Fields>
  min?: Maybe<Schedule_Day_Min_Fields>
}

/** aggregate fields of "schedule_day" */
export type Schedule_Day_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Schedule_Day_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "schedule_day" */
export type Schedule_Day_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Schedule_Day_Max_Order_By>
  min?: Maybe<Schedule_Day_Min_Order_By>
}

/** input type for inserting array relation for remote table "schedule_day" */
export type Schedule_Day_Arr_Rel_Insert_Input = {
  data: Array<Schedule_Day_Insert_Input>
  on_conflict?: Maybe<Schedule_Day_On_Conflict>
}

/** Boolean expression to filter rows from the table "schedule_day". All fields are combined with a logical 'AND'. */
export type Schedule_Day_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Schedule_Day_Bool_Exp>>>
  _not?: Maybe<Schedule_Day_Bool_Exp>
  _or?: Maybe<Array<Maybe<Schedule_Day_Bool_Exp>>>
  active?: Maybe<Boolean_Comparison_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  id?: Maybe<String_Comparison_Exp>
  schedule?: Maybe<Schedule_Bool_Exp>
  schedule_id?: Maybe<String_Comparison_Exp>
  tasks?: Maybe<Schedule_Day_Task_Bool_Exp>
  updated_at?: Maybe<Timestamptz_Comparison_Exp>
  week_day?: Maybe<Schedule_Day_Week_Day_Enum_Comparison_Exp>
}

/** unique or primary key constraints on table "schedule_day" */
export enum Schedule_Day_Constraint {
  /** unique or primary key constraint */
  ScheduleDayPkey = 'schedule_day_pkey',
}

/** input type for inserting data into table "schedule_day" */
export type Schedule_Day_Insert_Input = {
  active?: Maybe<Scalars['Boolean']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['String']>
  schedule?: Maybe<Schedule_Obj_Rel_Insert_Input>
  schedule_id?: Maybe<Scalars['String']>
  tasks?: Maybe<Schedule_Day_Task_Arr_Rel_Insert_Input>
  updated_at?: Maybe<Scalars['timestamptz']>
  week_day?: Maybe<Schedule_Day_Week_Day_Enum>
}

/** aggregate max on columns */
export type Schedule_Day_Max_Fields = {
  __typename?: 'schedule_day_max_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['String']>
  schedule_id?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** order by max() on columns of table "schedule_day" */
export type Schedule_Day_Max_Order_By = {
  created_at?: Maybe<Order_By>
  id?: Maybe<Order_By>
  schedule_id?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Schedule_Day_Min_Fields = {
  __typename?: 'schedule_day_min_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['String']>
  schedule_id?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** order by min() on columns of table "schedule_day" */
export type Schedule_Day_Min_Order_By = {
  created_at?: Maybe<Order_By>
  id?: Maybe<Order_By>
  schedule_id?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
}

/** response of any mutation on the table "schedule_day" */
export type Schedule_Day_Mutation_Response = {
  __typename?: 'schedule_day_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Schedule_Day>
}

/** input type for inserting object relation for remote table "schedule_day" */
export type Schedule_Day_Obj_Rel_Insert_Input = {
  data: Schedule_Day_Insert_Input
  on_conflict?: Maybe<Schedule_Day_On_Conflict>
}

/** on conflict condition type for table "schedule_day" */
export type Schedule_Day_On_Conflict = {
  constraint: Schedule_Day_Constraint
  update_columns: Array<Schedule_Day_Update_Column>
  where?: Maybe<Schedule_Day_Bool_Exp>
}

/** ordering options when selecting data from "schedule_day" */
export type Schedule_Day_Order_By = {
  active?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  id?: Maybe<Order_By>
  schedule?: Maybe<Schedule_Order_By>
  schedule_id?: Maybe<Order_By>
  tasks_aggregate?: Maybe<Schedule_Day_Task_Aggregate_Order_By>
  updated_at?: Maybe<Order_By>
  week_day?: Maybe<Order_By>
}

/** primary key columns input for table: "schedule_day" */
export type Schedule_Day_Pk_Columns_Input = {
  id: Scalars['String']
}

/** select columns of table "schedule_day" */
export enum Schedule_Day_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ScheduleId = 'schedule_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WeekDay = 'week_day',
}

/** input type for updating data in table "schedule_day" */
export type Schedule_Day_Set_Input = {
  active?: Maybe<Scalars['Boolean']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['String']>
  schedule_id?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  week_day?: Maybe<Schedule_Day_Week_Day_Enum>
}

/**
 * Tasks for the days of a schedule
 *
 *
 * columns and relationships of "schedule_day_task"
 */
export type Schedule_Day_Task = {
  __typename?: 'schedule_day_task'
  description: Scalars['String']
  id: Scalars['String']
  /** An object relationship */
  schedule_day?: Maybe<Schedule_Day>
  schedule_day_id: Scalars['String']
  start_time: Scalars['timetz']
}

/** aggregated selection of "schedule_day_task" */
export type Schedule_Day_Task_Aggregate = {
  __typename?: 'schedule_day_task_aggregate'
  aggregate?: Maybe<Schedule_Day_Task_Aggregate_Fields>
  nodes: Array<Schedule_Day_Task>
}

/** aggregate fields of "schedule_day_task" */
export type Schedule_Day_Task_Aggregate_Fields = {
  __typename?: 'schedule_day_task_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<Schedule_Day_Task_Max_Fields>
  min?: Maybe<Schedule_Day_Task_Min_Fields>
}

/** aggregate fields of "schedule_day_task" */
export type Schedule_Day_Task_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Schedule_Day_Task_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "schedule_day_task" */
export type Schedule_Day_Task_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Schedule_Day_Task_Max_Order_By>
  min?: Maybe<Schedule_Day_Task_Min_Order_By>
}

/** input type for inserting array relation for remote table "schedule_day_task" */
export type Schedule_Day_Task_Arr_Rel_Insert_Input = {
  data: Array<Schedule_Day_Task_Insert_Input>
  on_conflict?: Maybe<Schedule_Day_Task_On_Conflict>
}

/** Boolean expression to filter rows from the table "schedule_day_task". All fields are combined with a logical 'AND'. */
export type Schedule_Day_Task_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Schedule_Day_Task_Bool_Exp>>>
  _not?: Maybe<Schedule_Day_Task_Bool_Exp>
  _or?: Maybe<Array<Maybe<Schedule_Day_Task_Bool_Exp>>>
  description?: Maybe<String_Comparison_Exp>
  id?: Maybe<String_Comparison_Exp>
  schedule_day?: Maybe<Schedule_Day_Bool_Exp>
  schedule_day_id?: Maybe<String_Comparison_Exp>
  start_time?: Maybe<Timetz_Comparison_Exp>
}

/** unique or primary key constraints on table "schedule_day_task" */
export enum Schedule_Day_Task_Constraint {
  /** unique or primary key constraint */
  ScheduleDayTaskPkey = 'schedule_day_task_pkey',
}

/** input type for inserting data into table "schedule_day_task" */
export type Schedule_Day_Task_Insert_Input = {
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  schedule_day?: Maybe<Schedule_Day_Obj_Rel_Insert_Input>
  schedule_day_id?: Maybe<Scalars['String']>
  start_time?: Maybe<Scalars['timetz']>
}

/** aggregate max on columns */
export type Schedule_Day_Task_Max_Fields = {
  __typename?: 'schedule_day_task_max_fields'
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  schedule_day_id?: Maybe<Scalars['String']>
  start_time?: Maybe<Scalars['timetz']>
}

/** order by max() on columns of table "schedule_day_task" */
export type Schedule_Day_Task_Max_Order_By = {
  description?: Maybe<Order_By>
  id?: Maybe<Order_By>
  schedule_day_id?: Maybe<Order_By>
  start_time?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Schedule_Day_Task_Min_Fields = {
  __typename?: 'schedule_day_task_min_fields'
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  schedule_day_id?: Maybe<Scalars['String']>
  start_time?: Maybe<Scalars['timetz']>
}

/** order by min() on columns of table "schedule_day_task" */
export type Schedule_Day_Task_Min_Order_By = {
  description?: Maybe<Order_By>
  id?: Maybe<Order_By>
  schedule_day_id?: Maybe<Order_By>
  start_time?: Maybe<Order_By>
}

/** response of any mutation on the table "schedule_day_task" */
export type Schedule_Day_Task_Mutation_Response = {
  __typename?: 'schedule_day_task_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Schedule_Day_Task>
}

/** input type for inserting object relation for remote table "schedule_day_task" */
export type Schedule_Day_Task_Obj_Rel_Insert_Input = {
  data: Schedule_Day_Task_Insert_Input
  on_conflict?: Maybe<Schedule_Day_Task_On_Conflict>
}

/** on conflict condition type for table "schedule_day_task" */
export type Schedule_Day_Task_On_Conflict = {
  constraint: Schedule_Day_Task_Constraint
  update_columns: Array<Schedule_Day_Task_Update_Column>
  where?: Maybe<Schedule_Day_Task_Bool_Exp>
}

/** ordering options when selecting data from "schedule_day_task" */
export type Schedule_Day_Task_Order_By = {
  description?: Maybe<Order_By>
  id?: Maybe<Order_By>
  schedule_day?: Maybe<Schedule_Day_Order_By>
  schedule_day_id?: Maybe<Order_By>
  start_time?: Maybe<Order_By>
}

/** primary key columns input for table: "schedule_day_task" */
export type Schedule_Day_Task_Pk_Columns_Input = {
  id: Scalars['String']
}

/** select columns of table "schedule_day_task" */
export enum Schedule_Day_Task_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ScheduleDayId = 'schedule_day_id',
  /** column name */
  StartTime = 'start_time',
}

/** input type for updating data in table "schedule_day_task" */
export type Schedule_Day_Task_Set_Input = {
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  schedule_day_id?: Maybe<Scalars['String']>
  start_time?: Maybe<Scalars['timetz']>
}

/** update columns of table "schedule_day_task" */
export enum Schedule_Day_Task_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ScheduleDayId = 'schedule_day_id',
  /** column name */
  StartTime = 'start_time',
}

/** update columns of table "schedule_day" */
export enum Schedule_Day_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ScheduleId = 'schedule_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WeekDay = 'week_day',
}

/**
 * Possible week days of a schedule's day
 *
 *
 * columns and relationships of "schedule_day_week_day"
 */
export type Schedule_Day_Week_Day = {
  __typename?: 'schedule_day_week_day'
  day: Scalars['String']
}

/** aggregated selection of "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Aggregate = {
  __typename?: 'schedule_day_week_day_aggregate'
  aggregate?: Maybe<Schedule_Day_Week_Day_Aggregate_Fields>
  nodes: Array<Schedule_Day_Week_Day>
}

/** aggregate fields of "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Aggregate_Fields = {
  __typename?: 'schedule_day_week_day_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<Schedule_Day_Week_Day_Max_Fields>
  min?: Maybe<Schedule_Day_Week_Day_Min_Fields>
}

/** aggregate fields of "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Schedule_Day_Week_Day_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Schedule_Day_Week_Day_Max_Order_By>
  min?: Maybe<Schedule_Day_Week_Day_Min_Order_By>
}

/** input type for inserting array relation for remote table "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Arr_Rel_Insert_Input = {
  data: Array<Schedule_Day_Week_Day_Insert_Input>
  on_conflict?: Maybe<Schedule_Day_Week_Day_On_Conflict>
}

/** Boolean expression to filter rows from the table "schedule_day_week_day". All fields are combined with a logical 'AND'. */
export type Schedule_Day_Week_Day_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Schedule_Day_Week_Day_Bool_Exp>>>
  _not?: Maybe<Schedule_Day_Week_Day_Bool_Exp>
  _or?: Maybe<Array<Maybe<Schedule_Day_Week_Day_Bool_Exp>>>
  day?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "schedule_day_week_day" */
export enum Schedule_Day_Week_Day_Constraint {
  /** unique or primary key constraint */
  ScheduleDayWeekDayPkey = 'schedule_day_week_day_pkey',
}

export enum Schedule_Day_Week_Day_Enum {
  Friday = 'friday',
  Monday = 'monday',
  Saturday = 'saturday',
  Sunday = 'sunday',
  Thursday = 'thursday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
}

/** expression to compare columns of type schedule_day_week_day_enum. All fields are combined with logical 'AND'. */
export type Schedule_Day_Week_Day_Enum_Comparison_Exp = {
  _eq?: Maybe<Schedule_Day_Week_Day_Enum>
  _in?: Maybe<Array<Schedule_Day_Week_Day_Enum>>
  _is_null?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Schedule_Day_Week_Day_Enum>
  _nin?: Maybe<Array<Schedule_Day_Week_Day_Enum>>
}

/** input type for inserting data into table "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Insert_Input = {
  day?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Schedule_Day_Week_Day_Max_Fields = {
  __typename?: 'schedule_day_week_day_max_fields'
  day?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Max_Order_By = {
  day?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Schedule_Day_Week_Day_Min_Fields = {
  __typename?: 'schedule_day_week_day_min_fields'
  day?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Min_Order_By = {
  day?: Maybe<Order_By>
}

/** response of any mutation on the table "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Mutation_Response = {
  __typename?: 'schedule_day_week_day_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Schedule_Day_Week_Day>
}

/** input type for inserting object relation for remote table "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Obj_Rel_Insert_Input = {
  data: Schedule_Day_Week_Day_Insert_Input
  on_conflict?: Maybe<Schedule_Day_Week_Day_On_Conflict>
}

/** on conflict condition type for table "schedule_day_week_day" */
export type Schedule_Day_Week_Day_On_Conflict = {
  constraint: Schedule_Day_Week_Day_Constraint
  update_columns: Array<Schedule_Day_Week_Day_Update_Column>
  where?: Maybe<Schedule_Day_Week_Day_Bool_Exp>
}

/** ordering options when selecting data from "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Order_By = {
  day?: Maybe<Order_By>
}

/** primary key columns input for table: "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Pk_Columns_Input = {
  day: Scalars['String']
}

/** select columns of table "schedule_day_week_day" */
export enum Schedule_Day_Week_Day_Select_Column {
  /** column name */
  Day = 'day',
}

/** input type for updating data in table "schedule_day_week_day" */
export type Schedule_Day_Week_Day_Set_Input = {
  day?: Maybe<Scalars['String']>
}

/** update columns of table "schedule_day_week_day" */
export enum Schedule_Day_Week_Day_Update_Column {
  /** column name */
  Day = 'day',
}

/** input type for inserting data into table "schedule" */
export type Schedule_Insert_Input = {
  active?: Maybe<Scalars['Boolean']>
  created_at?: Maybe<Scalars['timestamptz']>
  days?: Maybe<Schedule_Day_Arr_Rel_Insert_Input>
  id?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
  user?: Maybe<Account_Obj_Rel_Insert_Input>
  user_id?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Schedule_Max_Fields = {
  __typename?: 'schedule_max_fields'
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['String']>
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
  id?: Maybe<Scalars['String']>
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
  days_aggregate?: Maybe<Schedule_Day_Aggregate_Order_By>
  id?: Maybe<Order_By>
  title?: Maybe<Order_By>
  updated_at?: Maybe<Order_By>
  user?: Maybe<Account_Order_By>
  user_id?: Maybe<Order_By>
}

/** primary key columns input for table: "schedule" */
export type Schedule_Pk_Columns_Input = {
  id: Scalars['String']
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
  id?: Maybe<Scalars['String']>
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
  /** fetch data from the table: "schedule_day" */
  schedule_day: Array<Schedule_Day>
  /** fetch aggregated fields from the table: "schedule_day" */
  schedule_day_aggregate: Schedule_Day_Aggregate
  /** fetch data from the table: "schedule_day" using primary key columns */
  schedule_day_by_pk?: Maybe<Schedule_Day>
  /** fetch data from the table: "schedule_day_task" */
  schedule_day_task: Array<Schedule_Day_Task>
  /** fetch aggregated fields from the table: "schedule_day_task" */
  schedule_day_task_aggregate: Schedule_Day_Task_Aggregate
  /** fetch data from the table: "schedule_day_task" using primary key columns */
  schedule_day_task_by_pk?: Maybe<Schedule_Day_Task>
  /** fetch data from the table: "schedule_day_week_day" */
  schedule_day_week_day: Array<Schedule_Day_Week_Day>
  /** fetch aggregated fields from the table: "schedule_day_week_day" */
  schedule_day_week_day_aggregate: Schedule_Day_Week_Day_Aggregate
  /** fetch data from the table: "schedule_day_week_day" using primary key columns */
  schedule_day_week_day_by_pk?: Maybe<Schedule_Day_Week_Day>
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
  id: Scalars['String']
}

/** subscription root */
export type Subscription_RootSchedule_DayArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Order_By>>
  where?: Maybe<Schedule_Day_Bool_Exp>
}

/** subscription root */
export type Subscription_RootSchedule_Day_AggregateArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Order_By>>
  where?: Maybe<Schedule_Day_Bool_Exp>
}

/** subscription root */
export type Subscription_RootSchedule_Day_By_PkArgs = {
  id: Scalars['String']
}

/** subscription root */
export type Subscription_RootSchedule_Day_TaskArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Task_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Task_Order_By>>
  where?: Maybe<Schedule_Day_Task_Bool_Exp>
}

/** subscription root */
export type Subscription_RootSchedule_Day_Task_AggregateArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Task_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Task_Order_By>>
  where?: Maybe<Schedule_Day_Task_Bool_Exp>
}

/** subscription root */
export type Subscription_RootSchedule_Day_Task_By_PkArgs = {
  id: Scalars['String']
}

/** subscription root */
export type Subscription_RootSchedule_Day_Week_DayArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Week_Day_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Week_Day_Order_By>>
  where?: Maybe<Schedule_Day_Week_Day_Bool_Exp>
}

/** subscription root */
export type Subscription_RootSchedule_Day_Week_Day_AggregateArgs = {
  distinct_on?: Maybe<Array<Schedule_Day_Week_Day_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Schedule_Day_Week_Day_Order_By>>
  where?: Maybe<Schedule_Day_Week_Day_Bool_Exp>
}

/** subscription root */
export type Subscription_RootSchedule_Day_Week_Day_By_PkArgs = {
  day: Scalars['String']
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

/** expression to compare columns of type timetz. All fields are combined with logical 'AND'. */
export type Timetz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timetz']>
  _gt?: Maybe<Scalars['timetz']>
  _gte?: Maybe<Scalars['timetz']>
  _in?: Maybe<Array<Scalars['timetz']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['timetz']>
  _lte?: Maybe<Scalars['timetz']>
  _neq?: Maybe<Scalars['timetz']>
  _nin?: Maybe<Array<Scalars['timetz']>>
}

export type MySchedulesQueryVariables = Exact<{
  limit: Scalars['Int']
  offset: Scalars['Int']
}>

export type MySchedulesQuery = { __typename?: 'query_root' } & {
  me: { __typename?: 'Me' } & {
    account?: Maybe<
      { __typename?: 'account' } & {
        schedules: Array<
          { __typename?: 'schedule' } & Pick<
            Schedule,
            'id' | 'title' | 'active' | 'created_at'
          > & {
              days: Array<
                { __typename?: 'schedule_day' } & Pick<Schedule_Day, 'week_day'>
              >
            }
        >
        schedules_aggregate: { __typename?: 'schedule_aggregate' } & {
          aggregate?: Maybe<
            { __typename?: 'schedule_aggregate_fields' } & Pick<
              Schedule_Aggregate_Fields,
              'count'
            >
          >
        }
      }
    >
  }
}

export type CreateScheduleMutationVariables = Exact<{
  title: Scalars['String']
  days: Array<Schedule_Day_Insert_Input> | Schedule_Day_Insert_Input
}>

export type CreateScheduleMutation = { __typename?: 'mutation_root' } & {
  insert_schedule?: Maybe<
    { __typename?: 'schedule_mutation_response' } & Pick<
      Schedule_Mutation_Response,
      'affected_rows'
    >
  >
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'query_root' } & {
  me: { __typename?: 'Me' } & Pick<Me, 'user_id'> & {
      account?: Maybe<
        { __typename?: 'account' } & Pick<
          Account,
          'last_seen' | 'company' | 'name' | 'picture' | 'verified'
        > & {
            schedules_aggregate: { __typename?: 'schedule_aggregate' } & {
              aggregate?: Maybe<
                { __typename?: 'schedule_aggregate_fields' } & Pick<
                  Schedule_Aggregate_Fields,
                  'count'
                >
              >
            }
          }
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

export const MySchedulesDocument = `
    query MySchedules($limit: Int!, $offset: Int!) {
  me {
    account {
      schedules(limit: $limit, offset: $offset, order_by: {created_at: desc}) {
        id
        title
        days {
          week_day
        }
        active
        created_at
      }
      schedules_aggregate {
        aggregate {
          count
        }
      }
    }
  }
}
    `
export const useMySchedulesQuery = <TData = MySchedulesQuery, TError = unknown>(
  variables: MySchedulesQueryVariables,
  options?: UseQueryOptions<MySchedulesQuery, TError, TData>,
) =>
  useQuery<MySchedulesQuery, TError, TData>(
    ['MySchedules', variables],
    fetcher<MySchedulesQuery, MySchedulesQueryVariables>(
      MySchedulesDocument,
      variables,
    ),
    options,
  )
export const CreateScheduleDocument = `
    mutation CreateSchedule($title: String!, $days: [schedule_day_insert_input!]!) {
  insert_schedule(objects: {title: $title, days: {data: $days}}) {
    affected_rows
  }
}
    `
export const useCreateScheduleMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateScheduleMutation,
    TError,
    CreateScheduleMutationVariables,
    TContext
  >,
) =>
  useMutation<
    CreateScheduleMutation,
    TError,
    CreateScheduleMutationVariables,
    TContext
  >(
    (variables?: CreateScheduleMutationVariables) =>
      fetcher<CreateScheduleMutation, CreateScheduleMutationVariables>(
        CreateScheduleDocument,
        variables,
      )(),
    options,
  )
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
      schedules_aggregate {
        aggregate {
          count
        }
      }
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
