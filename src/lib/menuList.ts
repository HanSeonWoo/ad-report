import { Bookmark, LayoutGrid, LucideIcon, SquarePen, Tag } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Detail",
      menus: [
        {
          href: "yearly",
          label: "연도별",
          active: pathname.includes("/yearly"),
          icon: SquarePen,
          submenus: [],
        },
        {
          href: "/monthly",
          label: "월별",
          active: pathname.includes("/monthly"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/top",
          label: "상위 캠페인 성과 분석",
          active: pathname.includes("/top"),
          icon: Tag,
          submenus: [],
        },
        {
          href: "/app",
          label: "앱별 광고 수익",
          active: pathname.includes("/app"),
          icon: Tag,
          submenus: [],
        },
        {
          href: "/install-vs-revenue",
          label: "설치 대비 수익",
          active: pathname.includes("/install-vs-revenue"),
          icon: Tag,
          submenus: [],
        },
      ],
    },
  ];
}
