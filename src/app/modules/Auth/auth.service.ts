import jwt from "jsonwebtoken";
import { prisma } from "../../../shared/prisma";
import bcrypt from "bcrypt";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  const accessToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "shahin",
    {
      algorithm: "HS256",
      expiresIn: "15m",
    }
  );
  console.log(accessToken);

  return userData;
};

export const authServices = {
  loginUser,
};
