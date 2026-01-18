// import jwt from "jsonwebtoken";
// import { ENV } from "./env.js";

// export const generateToken = (userId, res) => {
//   if (!ENV.JWT_SECRET) {
//     throw new Error("JWT_SECRET is not configured");
//   }

//   const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
//     expiresIn: "7d",
//   });


//   console.log("Setting cookie with sameSite:", ENV.NODE_ENV === "development" ? "lax" : "strict");
//   res.cookie("jwt", token, {
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     sameSite: ENV.NODE_ENV === "development" ? "lax" : "strict",
//     secure: ENV.NODE_ENV === "production",
//   });

//   return token;
// };








/*******************************************/
import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: "strict", // CSRF attacks
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};

// // http://localhost
// // https://dsmakmk.com
