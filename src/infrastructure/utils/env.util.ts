import { join } from 'path';

export function getOsPath(relativePath: string): string {
  return join(process.cwd(), relativePath);
}

export function getOsEnvVar(envVarName: string): string {
  return process.env[envVarName];
}
