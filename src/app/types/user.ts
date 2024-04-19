export type UserId = `${number}-${number}`;

export enum UserRole {
  Doctor = "doctor",
  Patient = "patient",
}

export const isUserRole = (input: string): input is UserRole =>
  input === UserRole.Doctor || input === UserRole.Patient;

export type User = {
  id: UserId;
  role: UserRole;
  username: string;
  password: string;
  fullname: string;
};
