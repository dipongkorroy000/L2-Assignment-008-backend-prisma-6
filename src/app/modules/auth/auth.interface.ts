export type Login = {
  email: string;
  password: string;
};

export interface PasswordPayload {
  oldPassword: string;
  newPassword: string;
}
