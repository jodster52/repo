import { faker } from '@faker-js/faker';

export interface FakeUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

/** Generates a fake user, e.g. for signup/registration flows. Pass overrides to pin specific fields. */
export function createFakeUser(overrides: Partial<FakeUser> = {}): FakeUser {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    username: faker.internet.username({ firstName, lastName }),
    email: faker.internet.email({ firstName, lastName }),
    password: faker.internet.password({ length: 14 }),
    ...overrides,
  };
}
