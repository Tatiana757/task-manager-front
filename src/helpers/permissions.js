export const PERMISSIONS = {
  TASKS: {
    VIEW: 'view-tasks',
    CREATE: 'create-tasks',
    EDIT: 'edit-tasks',
    CHANGE_STATUS: 'change-task-status',
    CHANGE_RESPONSIBLE: 'change-task-responsible',
    DELETE: 'delete-tasks'
  }
};

export const checkPermission = (userPermissions, permission) => {
  if (!userPermissions) return false;
  return userPermissions.includes(permission);
};

export const canEditTaskDetails = (userPermissions) => {
  return checkPermission(userPermissions, PERMISSIONS.TASKS.EDIT);
};

export const canChangeTaskStatus = (userPermissions) => {
  return checkPermission(userPermissions, PERMISSIONS.TASKS.CHANGE_STATUS);
};

export const canChangeTaskResponsible = (userPermissions) => {
  return checkPermission(userPermissions, PERMISSIONS.TASKS.CHANGE_RESPONSIBLE);
};

export const canCreateTask = (userPermissions) => {
  return checkPermission(userPermissions, PERMISSIONS.TASKS.CREATE);
};