export const createUserSchema = {
  body: {
    type: 'object',
    required: ['first_name', 'last_name', 'email'],
    properties: {
      first_name: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 100 
      },
      last_name: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 100 
      },
      email: { 
        type: 'string', 
        format: 'email'
      },
    },
  }
};

export const updateUserSchema = {
  body: {
    type: 'object',
    properties: {
      first_name: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 100 
      },
      last_name: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 100 
      },
      email: { 
        type: 'string', 
        format: 'email'
      },
    },
  },
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
};

export const patchUserSchema = {
  body: {
    type: 'object',
    minProperties: 1,
    properties: {
      first_name: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 100 
      },
      last_name: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 100 
      },
      email: { 
        type: 'string', 
        format: 'email'
      },
    },
  },
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
};