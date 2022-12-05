import axios from "axios"

export interface AxiosError {
  error: string;
}

export const verifyErrorInstance = (err: unknown): AxiosError => {
  if (axios.isAxiosError(err) && err.response) {

    const { error } = err.response.data as AxiosError;

    return {
      error
    }
  }

  const { message } = err as Error;

  return {
    error: message
  }
}
