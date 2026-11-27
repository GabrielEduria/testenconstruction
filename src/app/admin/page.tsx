import AdminApp from "@/components/admin/AdminApp";
import LoginForm from "@/components/admin/LoginForm";
import { isAuthed } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Decided on the server: without a valid session, only the password form is sent.
  return (await isAuthed()) ? <AdminApp /> : <LoginForm />;
}
