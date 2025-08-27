import { v4 as uuid } from "uuid";
import type { SideBarProps } from "../interfaces";

export const SIDEBAR: SideBarProps[] = [
  // Manage Students
  {
    id: uuid(),
    title: "Manage Students",
    path: "/manage-students",
  },
  {
    id: uuid(),
    title: "Manage Lessons",
    path: "/manage-lessons",
  },
  {
    id: uuid(),
    title: "Message",
    path: "/message",
  },
];
