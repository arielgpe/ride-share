interface UserData {
  id: number,
  name: string,
  role: string
}

interface UserSliceData {
  data: Partial<UserData>,
  access_token?: string,
  fetching: boolean,
  setUser: (user: Partial<UserData>) => void;
}

export interface UserSlice {
  user: UserSliceData;
}
