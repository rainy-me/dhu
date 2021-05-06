import { Page } from "playwright-chromium";
import { NAV_ATTENDANCE, NAV_ATTENDANCE_LINK } from "./selectors";
import { waitForClickNavigation, sleep } from "./utils";
export type Attendance = {
  code: string;
  title: string;
  rate: string;
  records: AttendanceRecord[];
};

export const AttendanceStatusMap = {
  〇: "出席",
  "▽": "早退",
  "△": "遅刻",
  "×": "欠席",
  公: "公欠",
  休: "休講",
  "－": "授業対象外",
  外: "試験対象外",
  "": "期試験/追試験/再試験",
} as const;

export type AttendanceRecordMark = keyof typeof AttendanceStatusMap;
export type AttendanceRecord = {
  status: typeof AttendanceStatusMap[AttendanceRecordMark];
  date: string;
};

export async function getAttendance(page: Page, q = 1): Promise<Attendance[]> {
  await page.click(NAV_ATTENDANCE);
  await waitForClickNavigation(page, NAV_ATTENDANCE_LINK);
  if (q != 1) {
    await page.selectOption(
      "#funcForm\\:kaikoNendoGakki_input",
      `${new Date().getFullYear()}|0${q}`
    );
    await page.click("#funcForm\\:btnHyoji");
    await sleep(500);
  }

  // prettier-ignore
  const courseSelector = "div.scroll_div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr > td:nth-child(2)";
  // prettier-ignore
  const attendanceRowSelector = "div.scroll_div:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr";
  const courses = await page.$$eval(courseSelector, (es) => {
    const textContentOf = (e?: Element | null) => e?.textContent?.trim() ?? "";

    return es.map((e) => {
      const codeAndTitle = textContentOf(e);
      const code = codeAndTitle.substring(0, 8);
      const title = codeAndTitle.substring(8);
      return {
        code,
        title,
      };
    });
  });
  const attendanceRows = await page.$$eval(attendanceRowSelector, (es) => {
    return es.map((e) => {
      const textContentOf = (e?: Element | null) =>
        e?.textContent?.trim() ?? "";

      const map = {
        〇: "出席",
        "▽": "早退",
        "△": "遅刻",
        "×": "欠席",
        公: "公欠",
        休: "休講",
        "－": "授業対象外",
        外: "試験対象外",
        "": "期試験/追試験/再試験",
      } as const;

      const tds = Array.from(e.querySelectorAll("td"));
      const records = tds
        .filter((_, i) => i > 2)
        .map((e) => {
          const statusMark = textContentOf(e.querySelector("span"));
          const status = map[statusMark as AttendanceRecordMark];
          const date = textContentOf(e.querySelector("p"));
          return { status, date };
        });
      const rate = textContentOf(tds[2]);
      return { rate, records };
    });
  });

  return courses.map((course, i) => ({ ...course, ...attendanceRows[i] }));
}
