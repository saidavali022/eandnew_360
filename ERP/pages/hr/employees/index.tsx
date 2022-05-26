import { useState, useEffect } from "react";
import List from "pages/components/employee/List";
import DashboardLayout from "@layouts/hrdashboard";
import { useRouter } from "next/router";

// components
import Page from "@components/Page";
import axios from "@utils/defaultImports";
const data = {
  status: "accepted",
  title: "Employee",
};
export default function Index() {
  return <List data={data} />;
}
// Index.getLayout = (page: String) => <DashboardLayout>{page}</DashboardLayout>;
