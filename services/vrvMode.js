"use server";

import { cookies } from "next/headers";

export async function setVrvMode(checked) {
  cookies().set({
    name: "vrvMode",
    value: checked ? "true" : "false",
    path: "/",
    maxAge: 31536000,
  });
}

export async function getVrvMode() {
  const vrvModeCookie = cookies().get("vrvMode")?.value;
  return vrvModeCookie === "true";
}
