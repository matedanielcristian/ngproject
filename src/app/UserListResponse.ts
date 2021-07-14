import { User } from "./users/user.model";

export interface UserListResponse {
  content: User[];
  totalElements: number;
}
