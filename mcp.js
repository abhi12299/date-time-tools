import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from "zod";

import { convertTimezones } from "./actions/convert_timezones.js";
import { mutateDate } from "./actions/mutateDate.js";
import { currentDateTimeAndTz } from "./actions/current_datetime_tz.js";

import { DATE_FORMAT, EXAMPLE_VALID_DATE_TIME } from "./constants.js";

export class DateTimeMCP extends McpAgent {
  server = new McpServer({
    name: "Date-time tools",
    version: "0.1.0",
  });

  async init() {
    this.server.registerTool(
      "convertTimezones",
      {
        description: `Converts a date time string from one timezone to another.
- The date time string must follow luxon date-time format: ${DATE_FORMAT}. Example: ${EXAMPLE_VALID_DATE_TIME}.
- The timezones must be valid IANA timezones. Example: Asia/Calcutta, America/New_York.
- You must first invoke the tool named "currentDateTimeAndTimezone" to get the current date, time and timezone of the user if they don't specify the date or time explicitly or use relative date or time (i.e. in an hour/today/tomorrow/yesterday/next week/next month/next year etc.).
`,
        inputSchema: {
          dateTime: z.string().describe(`The date time string to convert. Must follow luxon date-time format: ${DATE_FORMAT}. Example: ${EXAMPLE_VALID_DATE_TIME}`),
          fromZone: z.string().describe("The IANA timezone of the date time string"),
          toZone: z.string().describe("The IANA timezone to convert the date time string to"),
        },
      },
      async ({ dateTime, fromZone, toZone }) => ({
        content: [{ type: "text", text: convertTimezones(dateTime, fromZone, toZone) }],
      })
    );

    this.server.registerTool(
      "mutateDate",
      {
        description: `Mutates a date time string by adding or subtracting days, hours, minutes, months, or years.
- The date time string must follow luxon date-time format: ${DATE_FORMAT}. Example: ${EXAMPLE_VALID_DATE_TIME}.
- The update object must be a valid update object. Example: { days: -1, hours: 2, minutes: 3, months: 4, years: 5 }.
- You must first invoke the tool named "currentDateTimeAndTimezone" to get the current date, time and timezone of the user if they don't specify an absolute date or time explicitly (today/tomorrow/yesterday/next week/next month/next year etc. is not absolute date or time).
`,
        inputSchema: {
          dateTime: z.string().describe(`The date time string to mutate. Must follow luxon date-time format: ${DATE_FORMAT}. Example: ${EXAMPLE_VALID_DATE_TIME}`),
          update: z.object({
            days: z.number().optional().describe("The number of days to add or subtract"),
            hours: z.number().optional().describe("The number of hours to add or subtract"),
            minutes: z.number().optional().describe("The number of minutes to add or subtract"),
            months: z.number().optional().describe("The number of months to add or subtract"),
            years: z.number().optional().describe("The number of years to add or subtract"),
          }).describe("The update object to apply to the date time string"),
        },
      },
      async ({ dateTime, update }) => ({
        content: [{ type: "text", text: mutateDate(dateTime, update) }],
      })
    );

    this.server.registerTool(
      "currentDateTimeAndTimezone",
      {
        description: `Gets the current date, time and timezone of the user.`,
        inputSchema: {},
      },
      async () => ({
        content: [{ type: "text", text: currentDateTimeAndTz() }],
      })
    );
  }
}

export default {
  fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/mcp") {
      return DateTimeMCP.serve("/mcp").fetch(request, env, ctx);
    }

    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return DateTimeMCP.serveSSE("/sse").fetch(request, env, ctx);
    }

    return new Response("Not found", { status: 404 });
  },
};
