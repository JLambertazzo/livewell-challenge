export type UserId = `${number}-${number}`;

export enum UserRole {
  Doctor = "doctor",
  Patient = "patient",
}

export type User = {
  id: UserId;
  role: UserRole;
};
