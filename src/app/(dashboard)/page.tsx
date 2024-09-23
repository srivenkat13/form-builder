import Image from "next/image";
import { GetFormStats } from "../../../actions/forms";
import { ReactNode, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FaRegEye } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { RiPagesLine } from "react-icons/ri";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";

export default function Home() {
  return (
    <>
      <div className="container pt-4 p-2">
        <Suspense fallback={<StatsCards loading={true} />}>
          <CardsStatsWrapper />
        </Suspense>
        <Separator className="my-6 " />
        <div className="text-3xl px-2 font-bold col-span-2">Your Forms</div>
        <Separator className="my-6 " />
        <div className="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreateFormBtn />
        </div>
      </div>
    </>
  );
}

async function CardsStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}
function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Visits"
        icon={<FaRegEye className="text-blue-600 size-8" />}
        helperText="All time Form Visits"
        value={data?.visits.toLocaleString() || " "}
        loading={loading}
        className="shadow-inner shadow-blue-600"
      />
      <StatsCard
        title="Total Submissions"
        icon={<RiPagesLine className="text-yellow-600 size-8" />}
        helperText="All time Form Submissions"
        value={data?.submissions.toLocaleString() || " "}
        loading={loading}
        className="shadow-inner shadow-yellow-600"
      />
      <StatsCard
        title="Submission Rate"
        icon={<HiCursorClick className="text-green-600 size-8" />}
        helperText="Visits that result in Form Submissions"
        value={data?.submissionRate.toLocaleString() + `%` || " "}
        loading={loading}
        className="shadow-inner shadow-green-600"
      />
      <StatsCard
        title="Bounce Rate "
        icon={<TbArrowBounce className="text-fuchsia-600 size-8" />}
        helperText="Visits that leave without interaction"
        value={data?.submissions.toLocaleString() + `%` || " "}
        loading={loading}
        className="shadow-inner shadow-fuchsia-600"
      />
    </div>
  );
}

function StatsCard({
  title,
  icon,
  value,
  loading,
  helperText,
  className,
}: {
  title: string;
  value: string;
  helperText: string;
  className: string;
  loading: boolean;
  icon: ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex  flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}
