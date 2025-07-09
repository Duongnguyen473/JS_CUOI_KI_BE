export const appConfig = () => ({
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME || 'NestJS Base Project',
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  payos: {
    clientId : process.env.PAYOS_CLIENT_ID || 'default-client-id',
    apiKey: process.env.PAYOS_API_KEY || 'default-api',
    checksumKey: process.env.PAYOS_CHECKSUM_KEY || 'default-checksum-key',
  }
});
