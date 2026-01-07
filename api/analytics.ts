import type { VercelRequest, VercelResponse } from "@vercel/node";

interface AnalyticsResponse {
  activeUsers: number;
  pageViews: number;
  sessions: number;
  events: number;
  error?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse<AnalyticsResponse>
) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({
      activeUsers: 0,
      pageViews: 0,
      sessions: 0,
      events: 0,
      error: "Method not allowed",
    });
  }

  const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID;
  const GA_CLIENT_EMAIL = process.env.GA_CLIENT_EMAIL;
  const GA_PRIVATE_KEY = process.env.GA_PRIVATE_KEY;

  // Validate env vars
  if (!GA_PROPERTY_ID || !GA_CLIENT_EMAIL || !GA_PRIVATE_KEY) {
    return res.status(200).json({
      activeUsers: 0,
      pageViews: 0,
      sessions: 0,
      events: 0,
      error: "Google Analytics not configured. Set GA_PROPERTY_ID, GA_CLIENT_EMAIL, and GA_PRIVATE_KEY in Vercel.",
    });
  }

  try {
    // Dynamic import to avoid bundling in client
    const { BetaAnalyticsDataClient } = await import("@google-analytics/data");

    // Validate private key format
    if (GA_PRIVATE_KEY.includes("private_key") || GA_PRIVATE_KEY.endsWith('",')) {
      return res.status(200).json({
        activeUsers: 0,
        pageViews: 0,
        sessions: 0,
        events: 0,
        error: "Invalid GA_PRIVATE_KEY format. Should be the raw key value, not JSON.",
      });
    }

    // Validate email format
    if (GA_CLIENT_EMAIL.includes("client_email") || GA_CLIENT_EMAIL.includes('"')) {
      return res.status(200).json({
        activeUsers: 0,
        pageViews: 0,
        sessions: 0,
        events: 0,
        error: "Invalid GA_CLIENT_EMAIL format. Should be just the email address.",
      });
    }

    // Create analytics client
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: GA_CLIENT_EMAIL,
        private_key: GA_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
    });

    // Get date range (last 7 days)
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: sevenDaysAgo.toISOString().split("T")[0],
          endDate: today.toISOString().split("T")[0],
        },
      ],
      dimensions: [{ name: "date" }],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "sessions" },
        { name: "eventCount" },
      ],
    });

    // Extract metrics
    let activeUsers = 0;
    let pageViews = 0;
    let sessions = 0;
    let events = 0;

    if (response.rows) {
      response.rows.forEach((row) => {
        if (row.metricValues) {
          activeUsers += parseInt(row.metricValues[0]?.value || "0", 10);
          pageViews += parseInt(row.metricValues[1]?.value || "0", 10);
          sessions += parseInt(row.metricValues[2]?.value || "0", 10);
          events += parseInt(row.metricValues[3]?.value || "0", 10);
        }
      });
    }

    // If no rows, try to get totals from metricHeaders
    if (response.rows?.length === 0 && response.metricHeaders) {
      // Fallback: return 0 if no data
      activeUsers = 0;
      pageViews = 0;
      sessions = 0;
      events = 0;
    }

    return res.status(200).json({
      activeUsers,
      pageViews,
      sessions,
      events,
    });
  } catch (error: any) {
    console.error("GA Analytics API error:", error.message);
    // Return zeros on error, don't crash
    return res.status(200).json({
      activeUsers: 0,
      pageViews: 0,
      sessions: 0,
      events: 0,
      error: error.message || "Failed to fetch analytics data",
    });
  }
}

