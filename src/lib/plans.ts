export const PLANS = [
  {
    id: "starter" as const,
    name: "Starter",
    price: 49,
    tagline: "For solo builders getting off the ground.",
    features: ["1 workspace", "Up to 3 team members", "10k API calls / mo", "Community support"],
  },
  {
    id: "growth" as const,
    name: "Growth",
    price: 249,
    tagline: "For teams scaling their product and revenue.",
    features: ["5 workspaces", "Up to 20 team members", "250k API calls / mo", "Priority email support", "Advanced analytics"],
  },
  {
    id: "scale" as const,
    name: "Scale",
    price: 899,
    tagline: "For organizations with serious throughput.",
    features: ["Unlimited workspaces", "Unlimited team members", "Unlimited API calls", "Dedicated Slack channel", "SSO & audit logs"],
  },
];
