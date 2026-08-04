const badgeStyles: Record<string, string> = {
  active: "bg-[#e8f5ee] text-[#057F44]",
  inactive: "bg-gray-100 text-gray-400",
  paid: "bg-[#e8f5ee] text-[#057F44]",
  pending: "bg-amber-50 text-amber-600",
  failed: "bg-red-50 text-red-500",
  success: "bg-[#e8f5ee] text-[#057F44]",
};

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = badgeStyles[status.toLowerCase()] || badgeStyles.failed;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}
