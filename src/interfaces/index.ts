export * from "./base";
export * from "./user";
export * from "./lesson";

export interface SideBarProps {
  id: string;
  title: string;
  path: string;
}

export interface NotificationProps {
  id: string;
  sender: string;
  message: string;
}
