import { useState, useEffect } from "react";
import List from "pages/components/employee/List";
import DashboardLayout from "@layouts/hrdashboard";
import { useRouter } from "next/router";

// components
import Page from "@components/Page";

import axios from "@utils/defaultImports";

const data = {
  status: "pending",
  title: "OnBoarding",
};
export default function User() {
  return <List data={data} />;
}
// User.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
