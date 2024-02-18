import {
  getUserByIdUseCase,
  userRepository,
} from "../../../Containers/Users/GetUserById";

describe("Get user by id use case", () => {
  it("Should get user by id", async () => {
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
      .spyOn(userRepository, "getUserById")
      .mockImplementation(() => Promise.resolve(userData));
    const data = await getUserByIdUseCase.execute(
      "b1776965-d6ed-4a8e-8ddc-5650b5b00fda"
    );
    expect(data).toHaveProperty("active");
    expect(data).toHaveProperty("created_at");
  });
});
