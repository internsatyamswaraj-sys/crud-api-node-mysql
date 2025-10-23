export const createAddressSchema = {
  body: {
    type: 'object',
    required: ['user_id', 'street', 'city', 'state', 'pincode'],
    properties: {
      user_id: { type: 'number' },
      street: { type: 'string', minLength: 1 },
      city: { type: 'string', minLength: 1 },
      state: { type: 'string', minLength: 1 },
      pincode: { type: 'string', minLength: 1 },
    },
  }
};

export const updateAddressSchema = {
  body: {
    type: 'object',
    properties: {
      street: { type: 'string', minLength: 1 },
      city: { type: 'string', minLength: 1 },
      state: { type: 'string', minLength: 1 },
      pincode: { type: 'string', minLength: 1 },
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

export const getAddressesQuerySchema = {
  querystring: {
    type: 'object',
    properties: {
      pincode: { type: 'string' },
    },
  },
};