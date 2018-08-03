export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  patch: jest.fn((_, data) => Promise.resolve({ data }))
};
