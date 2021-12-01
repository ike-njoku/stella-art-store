export type ServerResponseStatusType = 'success' | 'fail'
export interface ServerResponseDto {
  status: ServerResponseStatusType,
  message: string,
  data: any;
}
