import { useRouter } from "next/router";

export function logout(router: ReturnType<typeof useRouter>) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
}
