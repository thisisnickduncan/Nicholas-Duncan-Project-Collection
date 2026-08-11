import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export const alt = `${profile.name} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The same three measurements the hero leads with, so the share card and the page
 *  make the same argument. */
const HIGHLIGHTS = [
  { slug: "swingscore-political-analytics", label: "Rows of data processed" },
  { slug: "telegram-news-collector", label: "Corroboration rate" },
  { slug: "telegram-news-collector", label: "Outlets bias-rated" },
];

export default function OpengraphImage() {
  const metrics = HIGHLIGHTS.map(({ slug, label }) =>
    projects.find((p) => p.slug === slug)?.outcomeMetrics?.find((m) => m.label === label)
  ).filter((m): m is { label: string; value: string } => Boolean(m));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#e9e6dd",
          color: "#1c1a16",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              fontWeight: 700,
              maxWidth: 940,
            }}
          >
            {profile.tagline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#665f53",
              letterSpacing: "-0.01em",
            }}
          >
            {`${profile.name} — Management Information Systems & Business Management`}
          </div>
        </div>

        <div style={{ display: "flex", borderTop: "2px solid #b9b2a2", paddingTop: 28 }}>
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                paddingLeft: i === 0 ? 0 : 32,
                borderLeft: i === 0 ? "none" : "1px solid #d2cdc1",
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 600, color: "#0e5a5a" }}>{metric.value}</div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#665f53",
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
