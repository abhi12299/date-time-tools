# Date-time Tools MCP

A Model Context Protocol (MCP) server for date-time manipulation and timezone conversion.

## Overview

This MCP server provides a set of tools for working with date-time strings, including timezone conversion, date mutation (arithmetic), and fetching the current date-time and timezone. It is designed to be used as a backend utility for applications or agents that need robust, standardized date-time operations.

## Architecture

This server runs on **Cloudflare Workers** and uses the [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http) transport (with a legacy SSE endpoint also exposed). Per-session state is backed by a Durable Object via Cloudflare's [`agents`](https://www.npmjs.com/package/agents) `McpAgent` wrapper.

Endpoints:

- `POST/GET/DELETE /mcp` — Streamable HTTP transport. Sessions tracked via the `mcp-session-id` header.
- `GET /sse`, `POST /sse/message` — Legacy SSE transport for older clients.

## Local development

```bash
npm install
npm run dev   # wrangler dev — serves at http://127.0.0.1:8787/mcp
```

## Deploying to Cloudflare

One-time setup:

```bash
npx wrangler login
```

Deploy:

```bash
npm run deploy
```

Wrangler prints the public URL, e.g. `https://date-time-tools.<your-subdomain>.workers.dev/mcp`. The Workers Free plan covers this server (100k requests/day; Durable Objects free tier covers session storage).

## Integration with MCP Clients

Configure clients that support Streamable HTTP transports to point at the deployed (or local) URL:

```json
{
  "mcpServers": {
    "date-time-tools": {
      "url": "https://date-time-tools.<your-subdomain>.workers.dev/mcp"
    }
  }
}
```

For clients that only speak stdio, bridge with [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

```json
{
  "mcpServers": {
    "date-time-tools": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://date-time-tools.<your-subdomain>.workers.dev/mcp"]
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

Run `npm run dev`, then in another terminal:

```bash
npx -y @modelcontextprotocol/inspector
```

Select the **Streamable HTTP** transport and use `http://127.0.0.1:8787/mcp` as the URL.

---

## Features

- **Timezone Conversion**  
  Convert a date-time string from one IANA timezone to another using Luxon-compatible formats.

- **Date Mutation**  
  Add or subtract days, hours, minutes, months, or years from a date-time string.

- **Current Date-Time & Timezone**  
  Retrieve the current date, time, and timezone of the user/system.
