export interface Field{
    id: number,
    survey_id: number
    name: string,
    type: string,
    is_required: number
}

export interface Surveys{
    id: number,
    name: string,
    description: string,
    date_created: string,
    enabled: number,
    creator_user: {
      id: number,
      username: string
    }
}
  