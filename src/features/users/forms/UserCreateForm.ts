import { Role } from "@/features/roles/models/Role";

export interface UserCreateForm {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  role: number;
}
