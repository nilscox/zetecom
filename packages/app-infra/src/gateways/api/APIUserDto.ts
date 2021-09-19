import { AuthenticatedUser, UserDto, UserRole } from '@zetecom/app-core';

export enum APIRole {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export type APIUserLightDto = {
  id: number;
  nick: string;
  avatar: string;
};

export type APIUserDto = APIUserLightDto & {
  email: string;
  signupDate: Date;
  roles: APIRole[];
};

export const transformUserLight = (dto: APIUserLightDto): UserDto => ({
  ...dto,
  id: String(dto.id),
  avatar: dto.avatar ? '/avatars/' + dto.avatar : null,
});

const mapRoles = {
  [APIRole.USER]: UserRole.user,
  [APIRole.MODERATOR]: UserRole.moderator,
  [APIRole.ADMIN]: UserRole.admin,
};

const highestRole = (roles: APIRole[]): APIRole => {
  if (roles.includes(APIRole.ADMIN)) {
    return APIRole.ADMIN;
  }

  if (roles.includes(APIRole.MODERATOR)) {
    return APIRole.MODERATOR;
  }

  return APIRole.USER;
};

export const transformUser = (dto: APIUserDto): AuthenticatedUser => ({
  ...dto,
  id: String(dto.id),
  avatar: dto.avatar ? '/avatars/' + dto.avatar : null,
  signupDate: new Date(dto.signupDate),
  role: mapRoles[highestRole(dto.roles)],
});
