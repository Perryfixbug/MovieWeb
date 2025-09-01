interface VideoType{
  id: number,
  name: string,
  link: string,
  createDate: Date 
  movieId: number 
}

interface SubType{
  id: number,
  name: string,
  link: string,
  createDate: Date 
  movieId: number 
}

interface MovieType {
  id: number;
  slug: string;
  name: string;
  description: string;
  userRate: number;
  imdbRate: number;
  rottenRate: number;
  length: number;
  publishYear: number;
  director: string;
  production: string;
  country: string;
  label: string;
  fact: string;
  type: string;
  categories: [string];
  status: string;
  actor: string;
  trailer: string;
  videos: VideoType[];
  sub: SubType[];
  thumbnail: string;
  poster: string;
  userId: number;
  createAt: Date;
}

interface CategoryType {
  id: number;
  value: string;
  order: number;
  isDisplay: boolean;
  thumbnail: string;
  movies: MovieType[];
}

interface UserType {
  id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  level: string;
  createAt: Date;
}

interface CommentType {
  id: number,
  targetId: number,
  targetType: string,
  content: string,
  spoil: boolean,
  createAt: Date,
  user: UserType
}
