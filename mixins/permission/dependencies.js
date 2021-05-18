export const dependencies = {
  'show-user': [
    'list-user'
  ],
  'edit-user': [
    'show-user'
  ],
  'change-user-password': [
    'show-user'
  ],
  'delete-user': [
    'show-user'
  ],
  'edit-role': [
    'show-role'
  ],
  'manage-income-service': [
    'list-main-service',
    'show-main-service'
  ],
  'list-income-service': [
    'list-main-service',
    'show-main-service'
  ],
  'store-income-service': [
    'list-main-service',
    'show-main-service'
  ],
  'edit-income-service': [
    'list-main-service',
    'show-main-service'
  ],
  'delete-income-service': [
    'list-main-service',
    'show-main-service'
  ]
}
