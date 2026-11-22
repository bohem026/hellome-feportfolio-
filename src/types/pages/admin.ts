export type InquiryStatus = "NEW" | "SCHEDULED" | "RESPONDED";
export type AdminTab = "overview" | "projects" | "inquiries";

export interface Inquiry {
  id: string;
  sender_name: string;
  sender_email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
