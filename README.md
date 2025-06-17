# Date-time Tools MCP

A Model Context Protocol (MCP) server for date-time manipulation and timezone conversion.

## Overview

This MCP server provides a set of tools for working with date-time strings, including timezone conversion, date mutation (arithmetic), and fetching the current date-time and timezone. It is designed to be used as a backend utility for applications or agents that need robust, standardized date-time operations.

## Integration with Cursor and Other MCP Clients

Go to: `Settings -> Cursor Settings -> MCP -> Add new global MCP server`

Pasting the following configuration into your Cursor `~/.cursor/mcp.json` file is the recommended approach. You may also install in a specific project by creating `.cursor/mcp.json` in your project folder. See [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) for more info.

```json
{
  "mcpServers": {
    "date-time-tools": {
      "command": "npx",
      "args": ["-y", "@abhi12299/date-time-tools"]
    }
  }
}
```

---

### Available Tools

This MCP server provides the following tools for LLMs:

- `convertTimezones`: Convert a date-time string from one timezone to another.
- `mutateDate`: Add or subtract days, hours, minutes, months, or years from a date-time string.
- `currentDateTimeAndTimezone`: Get the current date, time, and timezone.

---

### 🧪 Testing with MCP Inspector

You can test this MCP server using the official MCP Inspector:

```bash
npx -y @modelcontextprotocol/inspector node mcp.js
```

---

## Features

- **Timezone Conversion**  
  Convert a date-time string from one IANA timezone to another using Luxon-compatible formats.

- **Date Mutation**  
  Add or subtract days, hours, minutes, months, or years from a date-time string.

- **Current Date-Time & Timezone**  
  Retrieve the current date, time, and timezone of the user/system.
