export interface Field{
    id: number,
    survey_id: number
    name: string,
    type: string,
    is_required: number
    option_id: number | null
    option_response: string | null
    response?: string[] | null
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

export interface ListSurveys{
  id: number,
  name: string,
  description: string,
  date_created: string,
  enabled: number,
  creator_user: {
    id: number,
    username: string
  }
  watch: boolean,
  fields: Field[],
}

  