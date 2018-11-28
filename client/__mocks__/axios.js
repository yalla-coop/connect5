export default {
  get: jest.fn(Promise.resolve({ data: 123 })),
  post: jest.fn(Promise.resolve({ data: 123 })),
};
