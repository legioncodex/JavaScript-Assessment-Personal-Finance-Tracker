export enum Role {
  Admin = "admin",
  User = "user",
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  role: Role;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  role?: Role;
}

//generics
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export function wrap<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

//repository
const db: User[] = [];
let nextId = 1;

//validation
function validate(data: CreateUserDTO | UpdateUserDTO): void {
  // Check email only if it exists in the data
  if ("email" in data && data.email !== undefined) {
    if (!data.email.includes("@")) throw new Error("Invalid email format");
  }
  // Check name only if it exists in the data
  if ("name" in data && data.name !== undefined) {
    if (data.name.trim() === "") throw new Error("Name cannot be empty");
  }
}

export function createUser(data: CreateUserDTO): User {
  validate(data);
  const user: User = { id: nextId++, ...data };
  db.push(user);
  return user;
}

export function getUser(id: number): User {
  const user = db.find((u) => u.id === id);
  if (!user) throw new Error(`User with ID ${id} not found`);
  return user;
}

export function updateUser(id: number, data: UpdateUserDTO): User {
  validate(data);
  const user = getUser(id);

  if (data.name) user.name = data.name;
  if (data.email) user.email = data.email;
  if (data.role) user.role = data.role;

  return user;
}
// Test

let pass = 0,
  fail = 0;

function test(name: string, fn: () => void): void {
  try {
    fn();
    console.log(`✅ PASS: ${name}`);
    pass++;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log(`❌ FAIL: ${name} -> ${msg}`);
    fail++;
  }
}

test("Should create a user successfully", () => {
  const user = createUser({
    name: "Eyo",
    email: "eyo@example.com",
    role: Role.Admin,
  });
  if (user.id !== 1) throw new Error("ID assignment failed");
});

test("Should throw error for invalid email", () => {
  try {
    createUser({ name: "Jane", email: "bad-email", role: Role.User });
    throw new Error("Validation failed to catch bad email");
  } catch (e) {
    if ((e as Error).message !== "Invalid email format") throw e;
  }
});

test("Should update only the provided fields", () => {
  const updated = updateUser(1, { role: Role.User });
  if (updated.role !== Role.User) throw new Error("Role didn't update");
  if (updated.name !== "Eyo") throw new Error("Name changed accidentally");
});

test("Should wrap data in an ApiResponse using Generics", () => {
  const user = getUser(1);
  const wrapped = wrap(user);
  if (!wrapped.success || wrapped.data.name !== "Eyo") {
    throw new Error("Generic wrapper failed");
  }
});

console.log(`\nSummary: ${pass} passed, ${fail} failed`);
