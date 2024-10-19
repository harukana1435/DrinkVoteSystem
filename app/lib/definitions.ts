// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { StringValidation } from 'zod';

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  name: string;
  email: string;
  password: string;
  voted: boolean; //今日1回でも投票を行ったかどうか
  sum_voted: number; //現在の総投票数
  lastvotereset: string;
};

export type Vote = {
  voter: string; //投票した人のメールアドレス
  drink: string; //何に投票したか（ドリンクのidをいれる）
  date: string; //投票した日付
};

export type Drink = {
  id: string;
  name: string;
  japanesename: string;
  voted: number; //今回(2週間以内)の投票数
  price: number; //値段
  path: string; //画像ファイルのパス
  totalvoted: number; //総投票数(これまでの全期間)
};

export type System = {
  lasttotalization: string; //最後に投票を集計した日付
};

export type DrinkID = {
  drink: string;
};

export type DrinkName = {
  name: string;
};

export type DrinkResult = {
  name: string;
  japanesename: string;
  price: number;
  path: string;
};

export type Result = {
  date: string;
  name: string;
  japanesename: string;
  price: number;
};
