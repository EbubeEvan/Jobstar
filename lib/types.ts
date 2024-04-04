export interface Icons {
  heart: string;
  menu: string;
  search: string;
  heartOutline: string;
  share: string;
  location: string;
  logout: string,
  home: string,
  chevronRight: string,
  chevronLeft: string
}

export interface Query {
  search?: string;
  location?: string;
  sort_by?: string;
  id?: string;
  page?: string
}

export interface Item {
  id: string;
  role: string,
  company_name: string;
  employment_type: string;
  location: string,
  remote: boolean,
  logo: string,
  url: string,
  text: string,
  date_posted: string,
  keywords: string[],
  source: string
}

export interface Job {
  id: string;
  role: string,
  company_name: string;
  employment_type: string;
  location: string,
  remote: boolean,
  logo: string,
  url: string,
  text: string,
  date_posted: string,
  keywords: string[],
  source: string
}