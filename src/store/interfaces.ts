/**
 * all models declared here!
 * only shared interface should be exported
 */
interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  avatarUrl: string | null;
  idx: number;
}

export interface UserFormValues {
  name: string;
  email: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  phone: string;
  website: string;
  companyName: string;
  companyPhrase: string;
  [propName: string]: any;
}

export interface UserState {
  userList: User[];
  selectedUser: User | null;
  userFormValues: UserFormValues;
  showCreateUserForm: boolean;
}

export interface CreateUserRequestBody {
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  avatarUrl: string | null;
}

export interface LoadingState {
  loadingList: boolean;
  uploadingAvatar: {
    status: boolean;
    id: number | null;
  };
  submittingUserForm: boolean;
}
