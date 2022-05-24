import React from "react";
import Leave from "pages/components/letter_generation/Getleaves";
import DashboardLayout from "@layouts/hrdashboard";
const leaves = () => {
  return (
    <div>
      <Leave role="hr" />
    </div>
  );
};

export default leaves;
leaves.getLayout = (page: String) => <DashboardLayout>{page}</DashboardLayout>;
