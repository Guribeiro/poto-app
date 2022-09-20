import { verify } from 'jsonwebtoken';
import auth from '@shared/common/config/auth';

interface EnsureAuthenticationProps {
  token: string;
  refresh_token: string;
}

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthentication = async ({ token, refresh_token }: EnsureAuthenticationProps) => {
  const { secret } = auth.jwt;

  try {
    const decoded = verify(token, secret);

    const dateNow = new Date();

    const { exp } = decoded as TokenPayload;

    if(exp < dateNow.getTime()){
      return false
    }

    return true

  } catch (error) {
    throw new Error('invalid JWT token');
  }
}

export default ensureAuthentication;
