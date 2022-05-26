const express = require("express");
const app = express();
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { resolve } from "path/posix";
const prisma = new PrismaClient();
var SUCCESS = "Data Interted Successfully";
var FAILED = "Data Not Interted";

export async function getAllUsers(req: any, res: any) {
  return await prisma.users.findMany({
    where: {
      status: req.params.status,
    },
  });
}

export async function getAllUsersData(req: any, res: any) {
  return await prisma.users.findMany({});
}

export async function getUsersById(req: any, res: any) {
  return await prisma.users.findFirst({
    where: {
      employee_id: req.params.empId,
    },
  });
}

export async function getUsersLoginDetails(req: any, res: any) {
  return await prisma.users.findFirst({
    where: {
      employee_id: req.body.employee_id,
      password: req.body.password,
    },
  });
}

export async function updateUsersById(req: any, res: any) {
  return await prisma.users.update({
    where: {
      id: parseInt(req.params.Id),
    },
    data: {
      status: req.body.status,
      employee_id: req.body.employee_id || "",
      noticePeriod: req.body.noticePeriod || "",
      password: req.body.password || "",
      department: req.body.department || "",
      designation: req.body.designation || "",
      compensation: req.body.compensation || "",
      role: req.body.role || "",
    },
  });
}

export async function getUsersByempId(req: Request, res: any) {
  return await prisma.users.findFirst({
    where: {
      id: parseInt(req.params.Id),
    },
  });
}

export async function createUser(req: any, res: any) {
  try {
    var data = await prisma.users.create({
      data: {
        username: req.body.username,
        highestQualification: req.body.highestQualification,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        motherName: req.body.motherName,
        fatherName: req.body.fatherName,
        email: req.body.email,
        phone: req.body.phone,
        guardianPhone: req.body.guardianPhone,
        gender: req.body.gender,
        Doj: new Date(req.body.Doj),
        Dob: new Date(req.body.Dob),
        blood_group: req.body.blood_group,
        houseNo: req.body.houseNo,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        nationality: req.body.nationality,
        passportSizePhoto:
          req.files["passportSizePhoto"] != undefined
            ? req.files["passportSizePhoto"][0].filename
            : " ",
        aadharNo: req.body.aadharNo,
        aadhar:
          req.files["aadhar"] != undefined
            ? req.files["aadhar"][0].filename
            : " ",
        panCardNo: req.body.panCardNo || 0,
        panCard:
          req.files["panCard"] != undefined
            ? req.files["panCard"][0].filename
            : " ",
        SSC: req.files["SSC"] != undefined ? req.files["SSC"][0].filename : " ",
        intermediate:
          req.files["intermediate"] != undefined
            ? req.files["intermediate"][0].filename
            : " ",
        diploma:
          req.files["diploma"] != undefined
            ? req.files["diploma"][0].filename
            : " ",
        bachelor:
          req.files["bachelor"] != undefined
            ? req.files["bachelor"][0].filename
            : " ",
        master:
          req.files["master"] != undefined
            ? req.files["master"][0].filename
            : " ",
        passoutYear: parseInt(req.body.passoutYear) || 2020,
        expectedPassoutYear: parseInt(req.body.expectedPassoutYear) || 2020,
        marksMemo:
          req.files["marksMemo"] != undefined
            ? req.files["marksMemo"][0].filename
            : " ",
        TC: req.files["TC"] != undefined ? req.files["TC"][0].filename : " ",
        bankAccountNo: req.body.bankAccountNo,
        IFSCCode: req.body.IFSCCode,
        BankName: req.body.BankName,
        BranchName: req.body.BranchName,
        accountHolderName: req.body.accountHolderName,
        UPIId: req.body.UPIId || " ",
        offerLetter:
          req.files["offerLetter"] != undefined
            ? req.files["offerLetter"][0].filename
            : " ",
        incrementLetter:
          req.files["incrementLetter"] != undefined
            ? req.files["incrementLetter"][0].filename
            : " ",
        resignationLette:
          req.files["resignationLette"] != undefined
            ? req.files["resignationLette"][0].filename
            : " ",
        payslips:
          req.files["payslips"] != undefined
            ? req.files["payslips"][0].filename
            : " ",
        experienceCertificate:
          req.files["experienceCertificate"] != undefined
            ? req.files["experienceCertificate"][0].filename
            : " ",
        linkedInProfileLink: req.body.linkedInProfileLink || " ",
        facebookProfileLink: req.body.facebookProfileLink || " ",
        twitterProfileLink: req.body.twitterProfileLink || " ",
        instagramProfileLink: req.body.instagramProfileLink || " ",
        employee_id: "0",
        status: "pending",
      },
    });
    // res.data = { data: data, status: 200, message: SUCCESS };
    return res.status(200).json({ data: data, status: 200, message: SUCCESS });
  } catch (error) {
    res.data = { data: { message: FAILED }, status: 300 };
    return;
  }

  // .then((data: any) => {
  //   return { data: data, status: 200, message: SUCCESS };
  // })
  // .catch((error: any) => {
  //   return { data: { message: FAILED }, status: 300 };
  // });
}
