import express from "express";
import request from "supertest";
import axios from "axios";
import {
  getAllUsersUseCase,
  userRepository,
} from "../../Containers/Users/GetAllUsers";
import HttpServer from "../../Infra/HttpServer";
import { GetUserDto } from "../../Data/user/getUserDto";
import { Users } from "../../Entities/user";

const app = HttpServer.app;
describe("Integration test get all users", () => {
  beforeEach(()=>{
    const userRepositoryData: Users[] = [
      {
        _id: "b1776965-d6ed-4a8e-8ddc-5650b5b00fda",
        first_name: "Test2233",
        last_name: "Test",
        date_of_birth: "1989-01-07",
        email: "Test",
        user_type: "Test",
        active: false,
        created_at: new Date("2023-05-15T02:15:17.727Z"),
        user_image: "test.png",
        access_code: '123456',
        password: 'test'
      },
    ];
    const mockRepository = jest.spyOn(userRepository, "getAll");
    mockRepository.mockImplementation(() => Promise.resolve(userRepositoryData));

  })


  test("GET /api/user - success - get all the books", async () => {
    const { body } = await request(app).get("/api/user");
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          dateOfBirth: expect.any(String),
          email: expect.any(String),
          userType: expect.any(String),
          active: expect.any(Boolean),
          userImage: expect.any(String),
          createdAt: expect.any(String),
        }),
      ])
    );
  });

  test("Get /api/user - success - Should return a 200 status code", async ()=>{
    const { statusCode } = await request(app).get("/api/user");
    expect(statusCode).toBe(200);
  })
});
