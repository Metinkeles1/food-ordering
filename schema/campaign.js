import * as Yup from 'yup';

export const campaignSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  discount: Yup.number().required("Discount is required").min(0, "Discount must be at least 0"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date().required("End Date is required").min(Yup.ref('startDate'), "End Date must be after Start Date"),
});
