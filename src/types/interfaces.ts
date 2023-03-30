export interface MemberBody {
  _id: string
  first_name: string
  last_name: string
  date_of_entry: Date
  email: string
  gender: string
  phone: string
  birthdate: string
  role: string
  status: string
}

export interface EventBody {
  _id: string
  name: string
  description: string
  is_public: boolean
  date: Date
  start_at: Date
  ends_at: Date
  entry_fee: number
  capacity: number
  viewer_count: number
}

export interface ClubBody {
  _id: string
  name: string
  description: string
}
