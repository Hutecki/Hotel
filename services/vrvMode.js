"use server";

import { cookies } from "next/headers";

// Set vrvMode cookie
export async function setVrvMode(checked) {
  cookies().set({
    name: "vrvMode",
    value: checked ? "true" : "false",
    path: "/",
    maxAge: 31536000, // 1 year
  });
}

// Get vrvMode cookie
export async function getVrvMode() {
  const vrvModeCookie = cookies().get("vrvMode")?.value;
  return vrvModeCookie === "true";
}
