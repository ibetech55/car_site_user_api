import {
  getUserByEmailUseCase,
  userRepository,
} from "../../../Containers/Users/GetUserByEmail";

describe("Get user by email use case", () => {
  it("Should get a user by email", async () => {
    const userData = {
      _id: "b1776965-d6ed-4a8e-8ddc-5650b5b00fda",
      first_name: "Test2233",
      last_name: "Test",
      date_of_birth: "1989-01-07",
      email: "Test",
      username: "Test",
      user_type: "Test",
      active: false,
      created_at: new Date("2023-05-15T02:15:17.727Z"),
      user_image: "test.png",
      access_code: '123456',
      password: 'test'
    };

    jest
      .spyOn(userRepository, "getUserByEmail")
      .mockImplementation(() => Promise.resolve(userData));

    const data = await getUserByEmailUseCase.execute("pib@yahoo.com");
    expect(data).toHaveProperty("first_name");
    expect(data).toHaveProperty("active");
  });
});
