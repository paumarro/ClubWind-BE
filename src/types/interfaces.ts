export interface MemberBody {
  _id: string
  name: string
  email: string
}

export interface EventBody {
  _id: string
  name: string
  date: Date
}

export interface ClubBody {
  _id: string
  name: string
  description: string
  foundation_date: Date
}

export interface Name {
  name: string
}