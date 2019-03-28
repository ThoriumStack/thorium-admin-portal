import {HttpClient} from "@/common/httpClient";
import settings from "../restServiceSettings";

export class AuthorizationAdminClient extends HttpClient {
  constructor() {
    super(settings('AuthorizationAdminClient'));
  }

  GetPermissions(roleId, pageIndex, pageSize, onFailed) {
    let final_url = ''
    final_url += 'permissions'
    final_url += '?';
    final_url += 'roleId=' + roleId
    final_url += '&';
    final_url += 'pageIndex=' + pageIndex
    final_url += '&';
    final_url += 'pageSize=' + pageSize
    return this.Get(final_url, onFailed);
  }

  AddPermission(permissionDto, onFailed) {
    let final_url = ''
    final_url += 'permissions'
    final_url += '/';
    let bodyParm = permissionDto;
    return this.Post(final_url, bodyParm, onFailed);
  }

  UpdatePermission(permissionDto, onFailed) {
    let final_url = ''
    final_url += 'permissions'
    final_url += '/';
    let bodyParm = permissionDto;
    return this.Patch(final_url, bodyParm, onFailed);
  }

  RemovePermission(permissionId, premissionId, onFailed) {
    let final_url = ''
    final_url += 'permissions'
    final_url += '/';
    final_url += permissionId
    final_url += '?';
    final_url += 'premissionId=' + premissionId
    return this.Delete(final_url, onFailed);
  }

  AddResource(resourceDto, onFailed) {
    let final_url = ''
    final_url += 'resources'
    final_url += '/';
    let bodyParm = resourceDto;
    return this.Post(final_url, bodyParm, onFailed);
  }

  UpdateResource(resourceDto, onFailed) {
    let final_url = ''
    final_url += 'resources'
    final_url += '/';
    let bodyParm = resourceDto;
    return this.Patch(final_url, bodyParm, onFailed);
  }

  RemoveResource(resourceId, onFailed) {
    let final_url = ''
    final_url += 'resources'
    final_url += '/';
    final_url += resourceId
    return this.Delete(final_url, onFailed);
  }

  GetAllResources(pageIndex, pageSize, onFailed) {
    let final_url = ''
    final_url += 'resources'
    final_url += '?';
    final_url += 'pageIndex=' + pageIndex
    final_url += '&';
    final_url += 'pageSize=' + pageSize
    return this.Get(final_url, onFailed);
  }

  GetResourceDetails(resourceId, pageIndex, pageSize, onFailed) {
    let final_url = ''
    final_url += 'resources'
    final_url += '/';
    final_url += resourceId
    final_url += '/';
    final_url += 'details'
    final_url += '?';
    final_url += 'pageIndex=' + pageIndex
    final_url += '&';
    final_url += 'pageSize=' + pageSize
    return this.Get(final_url, onFailed);
  }

  GetResource(resourceId, onFailed) {
    let final_url = ''
    final_url += 'resources'
    final_url += '/';
    final_url += resourceId
    return this.Get(final_url, onFailed);
  }

  AddResourceDetail(resourceId, resourceDetailDto, onFailed) {
    let final_url = ''
    final_url += 'resources'
    final_url += '/';
    final_url += resourceId
    final_url += '/';
    let bodyParm = resourceDetailDto;
    return this.Post(final_url, bodyParm, onFailed);
  }

  UpdateResourceDetail(resourceId, resourceDetailDto, onFailed) {
    let final_url = ''
    final_url += 'resources'
    final_url += '/';
    final_url += resourceId
    final_url += '/';
    let bodyParm = resourceDetailDto;
    return this.Patch(final_url, bodyParm, onFailed);
  }

  RemoveResourceDetail(resourceId, resourceDetailId, onFailed) {
    let final_url = ''
    final_url += 'resources'
    final_url += '/';
    final_url += resourceId
    final_url += '/';
    final_url += resourceDetailId
    return this.Delete(final_url, onFailed);
  }

  AddRole(roleDto, onFailed) {
    let final_url = ''
    final_url += 'roles'
    final_url += '/';
    let bodyParm = roleDto;
    return this.Post(final_url, bodyParm, onFailed);
  }

  UpdateRole(roleDto, onFailed) {
    let final_url = ''
    final_url += 'roles'
    final_url += '/';
    let bodyParm = roleDto;
    return this.Patch(final_url, bodyParm, onFailed);
  }

  RemoveRole(roleId, onFailed) {
    let final_url = ''
    final_url += 'roles'
    final_url += '/';
    final_url += roleId
    return this.Delete(final_url, onFailed);
  }

  GetRole(roleId, onFailed) {
    let final_url = ''
    final_url += 'roles'
    final_url += '/';
    final_url += roleId
    return this.Get(final_url, onFailed);
  }

  GetAllRoles(pageIndex, pageSize, onFailed) {
    let final_url = ''
    final_url += 'roles'
    final_url += '?';
    final_url += 'pageIndex=' + pageIndex
    final_url += '&';
    final_url += 'pageSize=' + pageSize
    return this.Get(final_url, onFailed);
  }

  GetUserRoles(userId, onFailed) {
    let final_url = ''
    final_url += userId
    final_url += '/';
    final_url += 'roles'
    return this.Get(final_url, onFailed);
  }

  AddUserToRole(userId, roleId, onFailed) {
    let final_url = ''
    final_url += userId
    final_url += '/';
    final_url += 'roles'
    final_url += '/';
    let bodyParm = roleId;
    return this.Post(final_url, bodyParm, onFailed);
  }

  RemoveUserFromRole(userId, roleId, onFailed) {
    let final_url = ''
    final_url += 'roles'
    final_url += '/';
    final_url += userId
    final_url += '/';
    final_url += roleId
    return this.Delete(final_url, onFailed);
  }
}