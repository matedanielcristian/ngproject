import { User } from "./user.model";

export interface UserListResponse {
  content: User[];
  totalElements: number;
}
