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
      notice_period: req.body.notice_period || "",
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
        highest_qualification: req.body.highest_qualification,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mother_name: req.body.mother_name,
        father_name: req.body.father_name,
        email: req.body.email,
        phone: req.body.phone,
        guardian_phone: req.body.guardian_phone,
        gender: req.body.gender,
        doj: new Date(req.body.doj),
        dob: new Date(req.body.dob),
        blood_group: req.body.blood_group,
        house_no: req.body.house_no,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        nationality: req.body.nationality,
        passport_size_photo:
          req.files["passport_size_photo"] != undefined
            ? req.files["passport_size_photo"][0].filename
            : " ",
        aadhar_no: req.body.aadhar_no,
        aadhar_img:
          req.files["aadhar_img"] != undefined
            ? req.files["aadhar_img"][0].filename
            : " ",
        pancard_no: req.body.pancard_no || 0,
        pancard_img:
          req.files["pancard_img"] != undefined
            ? req.files["pancard_img"][0].filename
            : " ",
        ssc: req.files["ssc"] != undefined ? req.files["ssc"][0].filename : " ",
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
        pass_out_year: parseInt(req.body.pass_out_year) || 2020,
        expected_passout_year: parseInt(req.body.expected_passout_year) || 2020,
        marks_memo:
          req.files["marks_memo"] != undefined
            ? req.files["marks_memo"][0].filename
            : " ",
        transfer_certificate:
          req.files["transfer_certificate"] != undefined
            ? req.files["transfer_certificate"][0].filename
            : " ",
        bank_account_no: req.body.bank_account_no,
        ifsc_code: req.body.ifsc_code,
        bank_name: req.body.bank_name,
        branch_name: req.body.branch_name,
        account_holder_name: req.body.account_holder_name,
        upi_id: req.body.upi_id || " ",
        offer_letter:
          req.files["offer_letter"] != undefined
            ? req.files["offer_letter"][0].filename
            : " ",
        increment_letter:
          req.files["increment_letter"] != undefined
            ? req.files["increment_letter"][0].filename
            : " ",
        resignation_letter:
          req.files["resignation_letter"] != undefined
            ? req.files["resignation_letter"][0].filename
            : " ",
        pay_slips:
          req.files["pay_slips"] != undefined
            ? req.files["pay_slips"][0].filename
            : " ",
        experience_certificate:
          req.files["experience_certificate"] != undefined
            ? req.files["experience_certificate"][0].filename
            : " ",
        linkedin_profile_ink: req.body.linkedin_profile_ink || " ",
        facebook_profile_link: req.body.facebook_profile_link || " ",
        twitter_profile_link: req.body.twitter_profile_link || " ",
        instagram_profile_link: req.body.instagram_profile_link || " ",
        employee_id: "0",
        status: "pending",
        password: "1234#",
      },
    });
    res.status(200).json({ data: data, status: 200, message: SUCCESS });
    return;
  } catch (error) {
    res.data = { data: { message: FAILED }, status: 300 };
    return;
  }
}
