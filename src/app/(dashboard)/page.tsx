import CreateFormBtn from "@/components/CreateFormBtn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { TbArrowBounce } from "react-icons/tb";
import { GetForms, GetFormStats } from "../../../actions/forms";

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
          <Suspense
            fallback={[1, 2, 3, 4].map((el) => (
              <FormCardSkeleton />
            ))}
          >
            <FormCards />
          </Suspense>
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

function FormCardSkeleton() {
  return <Skeleton className=" border-2 border-primary/20 h-[120px] w-full" />;
}
async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex  items-center justify-between gap-2">
          <span className="truncate font-bold">
            {form.name.slice(0, 1).toUpperCase() + form.name.slice(1)}
          </span>
          {form.published && <Badge className="bg-green-500">Published</Badge>}
          {!form.published && <Badge className="bg-red-500">Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-sm">
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          {form.published && (
            <span className="flex items-center gap-2">
              <FaRegEye className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <RiPagesLine className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-mb text-muted-foreground">
        {form.description || "No Description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild variant={"secondary"}  className=" group w-full mt-3  gap-4">
            <Link href={`/forms/${form.id}`}>
              View Submissions{" "}
              <BiRightArrowAlt className=" size-5 group-hover:translate-x-7 transition-transform duration-300" />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button asChild  variant={"secondary"} className=" group w-full mt-3  gap-4">
            <Link href={`/forms/${form.id}`}>
              Edit Form{" "}
              <MdEdit className="size-5 group-hover:rotate-45 transition-transform duration-300 " />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
