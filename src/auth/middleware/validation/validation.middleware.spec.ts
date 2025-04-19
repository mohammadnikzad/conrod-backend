import { ValidationMiddleware } from './validation.middleware';

class MockDto {}

describe('LoginValidationMiddleware', () => {
  it('should be defined', () => {
    const MiddlewareClass = ValidationMiddleware(MockDto);
    expect(new MiddlewareClass()).toBeDefined();
  });
});
