export interface IUser {
  user: {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image: string;
  };
}

export interface IRegistrationData {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface ILoginData {
  user: {
    email: string;
    password: string;
  };
}

export interface IEditProfileData {
  user: {
    email: string;
    password: string;
    username: string;
    image: string;
  };
  token: string | undefined;
}
