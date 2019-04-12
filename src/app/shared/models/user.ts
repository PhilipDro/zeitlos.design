export class User {
  $key: string;
  userName: string;
  emailId: string;
  password: string;
  location: {
    lat: number;
    lon: number;
  };
  createdOn: string;
  isAdmin: boolean;
  avatar: string;
}

export class UserDetail {
  $key: string;
  firstName: string;
  lastName: string;
  userName: string;
  emailId: string;
  address1: string;
  address2: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  zip: number;
}
