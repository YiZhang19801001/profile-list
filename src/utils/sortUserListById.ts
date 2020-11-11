import { User } from "../store/interfaces";
function compare(a: User, b: User) {
  if (a.id < b.id) {
    return 1;
  }
  if (a.id > b.id) {
    return -1;
  }
  return 0;
}

export default compare;
