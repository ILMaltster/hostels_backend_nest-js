type TEnvConsts = 'PORT' | 'HOST_PG' | 'PORT_PG' | 'USER_PG' | 'PASSWORD_PG' | 'PASSWORD_PG' | 'DATABASE_NAME_PG';

declare var process: NodeJS.Process & {
    env: Record<TEnvConsts, string>
}