import { remove } from "../../storage/_index.js";

export function logout() {
  remove("token");
  remove("profile");
}
