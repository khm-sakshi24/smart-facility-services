import { MetadataRoute } from "next";
import { businessInfo } from "@/config/businessInfo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = businessInfo.siteUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
