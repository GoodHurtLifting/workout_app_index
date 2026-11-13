import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep one maintained AGENTS.md instead of generating duplicate assistant files.
  agentRules: false,
};

export default nextConfig;
