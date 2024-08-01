export enum Roles {
  admin = "admin",
  user = "user",
}

export type UserSchemaType = {
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
  isSocialMedia: boolean;
  _id?: string;
  id?: string;
};
